import { render } from '../render';
import { remove } from '../framework/render.js';
import TripEventsList from '../view/trip-events-list';
import EmptyListMessage from '../view/empty-list-message';
import TripSortTypeList from '../view/trip-sort-type-list';
import TripSortTypePresenter from './trip-sort-type-presenter';
import AddEventPresenter from './add-event-presenter';
import TripEventPresenter from './trip-event-presenter';
import { ACTION_TYPE, UPDATE_TYPE, FILTERS_TYPES, SORT_TYPES } from '../const.js';
import { sortTripsListByType, getCheckedSortVariant, isSortVariantDisabled, filterTrips } from '../utils.js';

export default class TripEventsListPresenter {
  #tripEventsList = new TripEventsList();
  #tripSortTypeList = new TripSortTypeList();
  #emptyListMessage = null;
  #container = null;
  #destinationsModel = null;
  #offersModel = null;
  #tripsModel = null;
  #sortsModel = null;
  #filtersModel = null;
  #tripPresenters = {};
  #currentFilterType = null;
  #currentSortType = null;
  #addButtonPresenter = null;
  #addEventPresenter = null;

  constructor({ container, destinationsModel, offersModel, tripsModel, sortsModel, filtersModel, addButtonPresenter }) {
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#tripsModel = tripsModel;
    this.#sortsModel = sortsModel;
    this.#filtersModel = filtersModel;
    this.#addButtonPresenter = addButtonPresenter;
    this.#currentSortType = this.#sortsModel.selectedSort.type;

    this.#tripsModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);
    this.#sortsModel.addObserver(this.#handleModelEvent);
  }

  get trips() {
    this.#currentFilterType = this.#filtersModel.selectedFilter.type;
    const trips = this.#tripsModel.trips;
    const filteredTasks = filterTrips(trips, this.#currentFilterType);
    const sortedTrips = sortTripsListByType(filteredTasks, this.#currentSortType);
    return sortedTrips;
  }

  get sorts() {
    return this.#sortsModel.sorts;
  }

  init() {
    this.#renderTripsList();
  }

  #renderEmptyListMessage() {
    this.#emptyListMessage = new EmptyListMessage();
    render(this.#emptyListMessage, this.#tripEventsList.element);
  }

  #renderTripSortType(sortTypeData) {
    const sortTypePresenter = new TripSortTypePresenter({
      container: this.#tripSortTypeList.element,
      sortTypeData,
      onSortTypeChange: this.#handleSortTypeChange,
    });
    sortTypePresenter.init();
  }

  #renderTripsList() {
    render(this.#tripEventsList, this.#container);

    if (!this.trips.length) {
      this.#renderEmptyListMessage();
      return;
    }

    const sortPosition = 'beforebegin';
    render(this.#tripSortTypeList, this.#tripEventsList.element, sortPosition);

    this.sorts.forEach((sortTypeData) => {
      this.#renderTripSortType(sortTypeData);
    });

    this.trips.forEach((trip) => {
      this.#renderTrip(trip);
    });
  }

  #renderTrip(trip) {
    const editingTrip = this.#tripsModel.getRandomTrip();
    const destinations = this.#destinationsModel.destinations;
    const offers = this.#offersModel.getOffersByType(editingTrip.type);

    const tripPresenter = new TripEventPresenter({
      container: this.#tripEventsList.element,
      destinations,
      offers,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleTripModeChange,
    });
    tripPresenter.init(trip);
    this.#tripPresenters[trip.id] = tripPresenter;
  }

  #handleViewAction = (actionType, updateType, updatedTripData) => {
    switch (actionType) {
      case ACTION_TYPE.UPDATE_TRIP:
        this.#tripsModel.updateTrip(updateType, updatedTripData);
        break;
      case ACTION_TYPE.ADD_TRIP:
        this.#tripsModel.addTrip(updateType, updatedTripData);
        break;
      case ACTION_TYPE.DELETE_TRIP:
        this.#tripsModel.deleteTrip(updateType, updatedTripData);
        break;
    }
  }

  #handleModelEvent = (updateType, updatedTripData) => {
    switch (updateType) {
      case UPDATE_TYPE.PATCH:
        this.#tripPresenters[updatedTripData.id].init(updatedTripData);
        break;
      case UPDATE_TYPE.MINOR:
        this.#clearTripsList();
        this.#renderTripsList();
        break;
      case UPDATE_TYPE.MAJOR:
        this.#clearTripsList(true);
        this.#renderTripsList();
        break;
    }
  }

  #handleTripModeChange = () => {
    const allPresentersArray = Object.values(this.#tripPresenters);
    allPresentersArray.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (selectedType) => {
    if (selectedType === this.#currentSortType || isSortVariantDisabled(selectedType)) {
      return;
    }

    this.#sortsModel.selectSort(UPDATE_TYPE.MINOR, selectedType);
    this.#currentSortType = this.#sortsModel.selectedSort.type;
  };

  #clearTripsList(resetSort = false) {
    const allPresentersArray = Object.values(this.#tripPresenters);
    allPresentersArray.forEach((presenter) => presenter.removeTrip());
    this.#tripPresenters = {};

    remove(this.#tripSortTypeList);
    remove(this.#emptyListMessage);

    if (resetSort) {
      this.#currentSortType = getCheckedSortVariant().type;
      this.#currentFilterType = null;
    }
  }

  handleAddEventButtonClick = () => {
    if (this.#addEventPresenter) {
      return;
    }

    this.#addEventPresenter = new AddEventPresenter({
      container: this.#tripEventsList.element,
      destinations: this.#destinationsModel.destinations,
      offers: this.#offersModel.offers,
      onAddFormOpen: this.#handleAddFormOpen,
      onEventCreate: this.#handleEventAdd,
      handleFormCancel: this.#handleAddFormCancel,
    });

    this.#addEventPresenter.init();
  };

  #handleAddFormCancel = () => {
    this.#addButtonPresenter.enableButton();
    this.#addEventPresenter.removeComponent();
    this.#addEventPresenter = null;
  }

  #handleEventAdd = (data) => {
    const newTripData = { ...data, id: String(this.#tripsModel.trips.length + 1) };
    this.#handleViewAction(ACTION_TYPE.ADD_TRIP, UPDATE_TYPE.MAJOR, newTripData);
    this.#addEventPresenter.removeComponent();
    this.#addEventPresenter = null;
  }

  #handleAddFormOpen = () => {
    this.#addButtonPresenter.disableButton();
    if (this.#currentFilterType !== FILTERS_TYPES.Everything) {
      this.#filtersModel.selectFilter(UPDATE_TYPE.MINOR, FILTERS_TYPES.Everything);
    }
    this.#handleSortTypeChange(SORT_TYPES.Day);
    document.addEventListener('keydown', this.#escKeydownHandler);
    const allPresentersArray = Object.values(this.#tripPresenters);
    allPresentersArray.forEach((presenter) => presenter.resetView());
  }

  #escKeydownHandler = (event) => {
    if (event.key !== 'Escape') {
      return;
    }
    this.#handleAddFormCancel();
    document.removeEventListener('keydown', this.#escKeydownHandler);
  }
}
