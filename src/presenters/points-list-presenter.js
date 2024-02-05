import { render } from '../render';
import { remove } from '../framework/render.js';
import PointsList from '../view/points-list';
import EmptyListMessage from '../view/empty-list-message';
import PointSortTypeList from '../view/point-sort-type-list';
import PointSortTypePresenter from './point-sort-type-presenter';
import AddPointPresenter from './add-point-presenter';
import Loader from '../view/loader';
import PointPresenter from './point-presenter';
import { ACTION_TYPE, UPDATE_TYPE, TIME_LIMIT, FILTERS_TYPES, SORT_TYPES } from '../const.js';
import { sortPointsListByType, getCheckedSortVariant, isSortVariantDisabled, filterPoints } from '../utils.js';
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
  #uiBlocker = new UiBlocker({lowerLimit: TIME_LIMIT.LOWER_LIMIT, upperLimit: TIME_LIMIT.UPPER_LIMIT});

  constructor({ container, destinationsModel, offersModel, pointsModel, sortsModel, filtersModel, addButtonPresenter }) {
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;
    this.#sortsModel = sortsModel;
    this.#filtersModel = filtersModel;
    this.#addButtonPresenter = addButtonPresenter;
    this.#currentSortType = this.#sortsModel.selectedSort.type;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);
    this.#sortsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#currentFilterType = this.#filtersModel.selectedFilter.type;
    const points = this.#pointsModel?.get();
    const filteredTasks = filterPoints(points, this.#currentFilterType);
    const sortedPoints = sortPointsListByType(filteredTasks, this.#currentSortType);
    return sortedPoints;
  }

  get sorts() {
    return this.#sortsModel.sorts;
  }

  init() {
    this.#renderPointsList();
  }

  #renderEmptyListMessage() {
    this.#emptyListMessage = new EmptyListMessage();
    render(this.#emptyListMessage, this.#pointsList.element);
  }

  #renderPointSortType(sortTypeData) {
    const sortTypePresenter = new PointSortTypePresenter({
      container: this.#pointSortTypeList.element,
      sortTypeData,
      onSortTypeChange: this.#handleSortTypeChange,
    });
    sortTypePresenter.init();
  }

  #renderPointsList() {
    if (this.#isLoading) {
      this.#addButtonPresenter.disableButton();
      this.#renderLoading();
      return;
    }

    this.#addButtonPresenter.enableButton();
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
    const destinations = this.#destinationsModel.get();
    const offers = this.#offersModel.getOffersByType(point.type);

    const pointPresenter = new PointPresenter({
      container: this.#pointsList.element,
      destinations,
      offers,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handlePointModeChange,
    });
    pointPresenter.init(point);
    this.#pointPresenters[point.id] = pointPresenter;
  }
  
  #renderLoading() {
    render(this.#loadingComponent, this.#container);
  }

  #handleViewAction = async (actionType, updateType, updatedPointData) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case ACTION_TYPE.UPDATE_POINT:
        this.#pointPresenters[updatedPointData.id].setSaving();
        try {
          await this.#pointsModel.update(updateType, update);
        } catch (error) {
          this.#pointPresenters[updatedPointData.id].setAborting();
        }
        break;
      case ACTION_TYPE.ADD_POINT:
        this.#addPointPresenter.setSaving();
        try {
          await this.#pointsModel.add(updateType, update);

          this.#addPointPresenter.destroy({isCanceled: false});
        } catch (error) {
          this.#addPointPresenter.setAborting();
        }
        break;
      case ACTION_TYPE.DELETE_POINT:
        this.#pointPresenters[updatedPointData.id].setRemove();
        try {
          await this.#pointsModel.delete(updateType, update);
        } catch (error) {
          this.#pointPresenters[updatedPointData.id].setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, updatedPointData) => {
    switch (updateType) {
      case UPDATE_TYPE.PATCH:
        this.#pointPresenters[updatedPointData.id].init(updatedPointData);
        break;
      case UPDATE_TYPE.MINOR:
        this.#clearPointsList();
        this.#renderPointsList();
        break;
      case UPDATE_TYPE.MAJOR:
        this.#clearPointsList(true);
        this.#renderPointsList();
        break;
      case UPDATE_TYPE.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderPointsList();
        break;
    }
  };

  #handlePointModeChange = () => {
    const allPresentersArray = Object.values(this.#pointPresenters);
    allPresentersArray.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (selectedType) => {
    if (selectedType === this.#currentSortType || isSortVariantDisabled(selectedType)) {
      return;
    }

    this.#sortsModel.selectSort(UPDATE_TYPE.MINOR, selectedType);
    this.#currentSortType = this.#sortsModel.selectedSort.type;
  };

  #clearPointsList(resetSort = false) {
    const allPresentersArray = Object.values(this.#pointPresenters);
    allPresentersArray.forEach((presenter) => presenter.removePoint());
    this.#pointPresenters = {};

    remove(this.#pointSortTypeList);
    remove(this.#emptyListMessage);

    if (resetSort) {
      this.#currentSortType = getCheckedSortVariant().type;
      this.#currentFilterType = null;
    }
  }

  handleAddEventButtonClick = () => {
    if (this.#addPointPresenter) {
      return;
    }

    this.#addPointPresenter = new AddPointPresenter({
      container: this.#pointsList.element,
      destinations: this.#destinationsModel.get(),
      offers: this.#offersModel.get(),
      onAddFormOpen: this.#handleAddFormOpen,
      onEventCreate: this.#handleEventAdd,
      handleFormCancel: this.#handleAddFormCancel,
    });

    this.#addPointPresenter.init();
  };

  #handleAddFormCancel = () => {
    this.#addButtonPresenter.enableButton();
    this.#addPointPresenter.removeComponent();
    this.#addPointPresenter = null;
  };

  #handleEventAdd = (data) => {
    const newPointData = { ...data, id: String(this.points.length + 1) };
    this.#handleViewAction(ACTION_TYPE.ADD_POINT, UPDATE_TYPE.MAJOR, newPointData);
    this.#addPointPresenter.removeComponent();
    this.#addPointPresenter = null;
  };

  #handleAddFormOpen = () => {
    this.#addButtonPresenter.disableButton();
    if (this.#currentFilterType !== FILTERS_TYPES.EVERYTHING) {
      this.#filtersModel.selectFilter(UPDATE_TYPE.MINOR, FILTERS_TYPES.EVERYTHING);
    }
    this.#handleSortTypeChange(SORT_TYPES.DAY);
    document.addEventListener('keydown', this.#escKeydownHandler);
    const allPresentersArray = Object.values(this.#pointPresenters);
    allPresentersArray.forEach((presenter) => presenter.resetView());
  };

  #escKeydownHandler = (event) => {
    if (event.key !== 'Escape') {
      return;
    }
    this.#handleAddFormCancel();
    document.removeEventListener('keydown', this.#escKeydownHandler);
  };
}
