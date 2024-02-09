import { render } from '../render';
import { remove } from '../framework/render.js';
import PointsList from '../view/points-list';
import EmptyListMessage from '../view/empty-list-message';
import PointSortTypeList from '../view/point-sort-type-list';
import PointSortTypePresenter from './point-sort-type-presenter';
import AddPointPresenter from './add-point-presenter';
import Loader from '../view/loader';
import PointPresenter from './point-presenter';
import { ActionType, UpdateType, TimeLimit, FilterType, SortType } from '../const.js';
import { sortPointsListByType, getDefaultSortVariant, getIsSortVariantDisabled, filterPoints } from '../utils.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

export default class PointsListPresenter {
  #pointsList = new PointsList();
  #pointSortTypeList = new PointSortTypeList();
  #loadingComponent = new Loader();
  #isLoading = true;
  #emptyListMessage = null;
  #container = null;
  #destinationsModel = null;
  #offersModel = null;
  #pointsModel = null;
  #sortsModel = null;
  #filtersModel = null;
  #pointPresenters = {};
  #currentFilterType = null;
  #currentSortType = null;
  #addButtonPresenter = null;
  #addPointPresenter = null;
  #isDataLoadingFailed = false;
  #uiBlocker = new UiBlocker({lowerLimit: TimeLimit.LOWER_LIMIT, upperLimit: TimeLimit.UPPER_LIMIT});

  constructor({ container, destinationsModel, offersModel, pointsModel, sortsModel, filtersModel, addButtonPresenter }) {
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;
    this.#sortsModel = sortsModel;
    this.#filtersModel = filtersModel;
    this.#addButtonPresenter = addButtonPresenter;

    this.#pointsModel.addObserver(this.#modelEventHandler);
    this.#filtersModel.addObserver(this.#modelEventHandler);
    this.#sortsModel.addObserver(this.#modelEventHandler);
  }

  get points() {
    const points = this.#pointsModel?.getPoints();
    const filteredPoints = filterPoints(points, this.#currentFilterType);
    const sortedPoints = sortPointsListByType(filteredPoints, this.#currentSortType, this.offers);
    return sortedPoints;
  }

  get sorts() {
    return this.#sortsModel.sorts;
  }

  get destinations() {
    return this.#destinationsModel.getDestinations();
  }

  get offers() {
    return this.#offersModel.getOffers();
  }

  init() {
    this.#renderPointsList();
  }

  #renderEmptyListMessage() {
    this.#emptyListMessage = new EmptyListMessage({
      isLoadFailed: this.#isDataLoadingFailed,
      selectedFilter: this.#currentFilterType,
    });
    render(this.#emptyListMessage, this.#pointsList.element);
  }

  #renderPointSortType(sortTypeData) {
    const sortTypePresenter = new PointSortTypePresenter({
      container: this.#pointSortTypeList.element,
      sortTypeData,
      onSortTypeChange: this.#sortTypeChangeHandler,
    });
    sortTypePresenter.init();
  }

  #renderPointsList() {
    this.#currentFilterType = this.#filtersModel.selectedFilter.type;
    this.#currentSortType = this.#sortsModel.selectedSort.type;

    if (this.#isLoading) {
      this.#addButtonPresenter.disableButton();
      this.#renderLoading();
      return;
    }

    if (this.destinations.length || this.offers.length) {
      this.#addButtonPresenter.enableButton();
    }
    render(this.#pointsList, this.#container);

    if (!this.points?.length) {
      this.#renderEmptyListMessage();
      return;
    }

    const sortPosition = 'beforebegin';
    render(this.#pointSortTypeList, this.#pointsList.element, sortPosition);

    this.sorts.forEach((sortTypeData) => {
      this.#renderPointSortType(sortTypeData);
    });

    this.points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      container: this.#pointsList.element,
      destinations: this.destinations,
      offers: this.offers,
      onEditorOpen: this.#editorOpenHandler,
      onDataChange: this.#viewActionHandler,
      onModeChange: this.#pointModeChangeHandler,
    });
    pointPresenter.init(point);
    this.#pointPresenters[point.id] = pointPresenter;
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#container);
  }

  #editorOpenHandler = () => {
    if (this.#addPointPresenter) {
      this.#addFormCancelHandler();
    }
  };

  #viewActionHandler = async (actionType, updateType, updatedPointData) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case ActionType.UPDATE_POINT:
        this.#pointPresenters[updatedPointData.id].setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, updatedPointData);
        } catch (error) {
          this.#pointPresenters[updatedPointData.id].setAborting();
        }
        break;
      case ActionType.ADD_POINT:
        this.#addPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, updatedPointData);

          this.#addPointPresenter.destroy({isCanceled: false});
        } catch (error) {
          this.#addPointPresenter.setAborting();
          this.#addButtonPresenter.enableButton();
        }
        break;
      case ActionType.DELETE_POINT:
        this.#pointPresenters[updatedPointData.id].setRemove();
        try {
          await this.#pointsModel.deletePoint(updateType, updatedPointData);
        } catch (error) {
          this.#pointPresenters[updatedPointData.id].setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #modelEventHandler = (updateType, updatedPointData) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters[updatedPointData.id].init(updatedPointData);
        break;
      case UpdateType.MINOR:
        this.#clearPointsList();
        this.#renderPointsList();
        break;
      case UpdateType.MAJOR:
        this.#clearPointsList(true);
        this.#renderPointsList();
        break;
      case UpdateType.INIT:
        this.#isDataLoadingFailed = updatedPointData.isError;
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderPointsList();
        break;
    }
  };

  #pointModeChangeHandler = () => {
    const allPresentersArray = Object.values(this.#pointPresenters);
    allPresentersArray.forEach((presenter) => presenter.resetView());
  };

  #sortTypeChangeHandler = (selectedType) => {
    if (selectedType === this.#currentSortType || getIsSortVariantDisabled(selectedType)) {
      return;
    }

    this.#sortsModel.selectSort(UpdateType.MINOR, selectedType);
    this.#currentSortType = this.#sortsModel.selectedSort.type;
  };

  #clearPointsList(resetSort = false) {
    const allPresentersArray = Object.values(this.#pointPresenters);
    allPresentersArray.forEach((presenter) => presenter.removePoint());
    this.#pointPresenters = {};

    remove(this.#pointSortTypeList);
    remove(this.#emptyListMessage);

    if (resetSort) {
      this.resetSort();
      this.#currentFilterType = null;
    }
  }

  resetSort = () => {
    const defaultSort = getDefaultSortVariant().type;
    if (defaultSort === this.#currentSortType) {
      return;
    }

    this.#sortsModel.selectSort(UpdateType.MINOR, defaultSort);
  };

  addEventButtonClickHandler = () => {
    if (this.#addPointPresenter) {
      return;
    }

    this.#addPointPresenter = new AddPointPresenter({
      container: this.#pointsList.element,
      destinations: this.destinations,
      offers: this.offers,
      onAddFormOpen: this.#addFormOpenHandler,
      onEventCreate: this.#eventAddHandler,
      onFormCancel: this.#addFormCancelHandler,
      onDestroy: this.#addPointDestroyHandler,
    });

    this.#addPointPresenter.init();
  };

  #addFormCancelHandler = () => {
    this.#addButtonPresenter?.enableButton();
    this.#addPointPresenter?.removeComponent();
    this.#addPointPresenter = null;
  };

  #eventAddHandler = (data) => {
    const newPointData = { ...data };
    this.#viewActionHandler(ActionType.ADD_POINT, UpdateType.MINOR, newPointData);
  };

  #addFormOpenHandler = () => {
    this.#addButtonPresenter.disableButton();
    if (this.#currentFilterType !== FilterType.EVERYTHING) {
      this.#filtersModel.selectFilter(UpdateType.MINOR, FilterType.EVERYTHING);
    }
    this.#sortTypeChangeHandler(SortType.DAY);
    document.addEventListener('keydown', this.#escKeydownHandler);
    const allPresentersArray = Object.values(this.#pointPresenters);
    allPresentersArray.forEach((presenter) => presenter.resetView());
  };

  #escKeydownHandler = (event) => {
    if (event.key !== 'Escape') {
      return;
    }
    this.#addFormCancelHandler();
    document.removeEventListener('keydown', this.#escKeydownHandler);
  };

  #addPointDestroyHandler = (isCanceled) => {
    if (!this.points.length && isCanceled) {
      this.#clearPointsList();
      this.#renderPointsList();
    }

    this.#addPointPresenter = null;
  };
}
