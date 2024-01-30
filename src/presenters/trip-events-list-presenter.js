import { render } from '../render';
import TripEventsList from '../view/trip-events-list';
import EmptyListMessage from '../view/empty-list-message';
import TripSortTypeList from '../view/trip-sort-type-list';
import TripSortTypePresenter from './trip-sort-type-presenter';
import TripEventPresenter from './trip-event-presenter';
import { SORT_VARIANTS } from '../const.js';
import { sortTripsListByType, getCheckedSortVariant, isSortVariantDisabled } from '../utils';

export default class TripEventsListPresenter {
  #tripEventsList = new TripEventsList();
  #tripSortTypeList = new TripSortTypeList();
  #container = null;
  #destinationsModel = null;
  #offersModel = null;
  #tripsModel = null;
  #tripsList = null;
  #tripPresenters = {};
  #currentSortType = getCheckedSortVariant().type;

  constructor({ container, destinationsModel, offersModel, tripsModel }) {
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#tripsModel = tripsModel;
  }

  init() {
    this.#tripsList = sortTripsListByType(this.#tripsModel.trips, this.#currentSortType);

    render(this.#tripEventsList, this.#container);

    if (!this.#tripsList.length) {
      this.#renderEmptyListMessage();
      return;
    }

    render(this.#tripSortTypeList, this.#tripEventsList.element);

    SORT_VARIANTS.forEach((variant) => {
      this.#renderTripSortType(variant);
    })

    this.#renderTripsList();
  }

  #renderEmptyListMessage() {
    const emptyListMessageComponent = new EmptyListMessage();
    render(emptyListMessageComponent, this.#tripEventsList.element);
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
    this.#tripsList.forEach((trip) => {
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
      onDataChange: this.#handleTripDataChange,
      onModeChange: this.#handleTripModeChange,
    });
    tripPresenter.init(trip);
    this.#tripPresenters[trip.id] = tripPresenter;
  }

  #handleTripDataChange = (tripId, updatedTripData) => {
    this.#tripsModel.updateTripById(tripId, updatedTripData);
    this.#tripsList = sortTripsListByType(this.#tripsModel.trips, this.#currentSortType);
    const updatedTrip = this.#tripsModel.getTripById(tripId);
    this.#tripPresenters[tripId].init(updatedTrip);
  };

  #handleTripModeChange = () => {
    const allPresentersArray = Object.values(this.#tripPresenters);
    allPresentersArray.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (type) => {
    if (type === this.#currentSortType || isSortVariantDisabled(type)) {
      return;
    }

    this.#currentSortType = type;
    this.#tripsList = sortTripsListByType(this.#tripsList, type);
    this.#clearTripsList();
    this.#renderTripsList();
  }

  #clearTripsList() {
    const allPresentersArray = Object.values(this.#tripPresenters);
    allPresentersArray.forEach((presenter) => presenter.removeTrip());
  }
}
