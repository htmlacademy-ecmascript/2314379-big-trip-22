import { render } from '../render';
import TripEventsList from '../view/trip-events-list';
import EmptyListMessage from '../view/empty-list-message';
import TripEventPresenter from './trip-event-presenter';

export default class TripEventsListPresenter {
  #tripEventsList = new TripEventsList();
  #container = null;
  #destinationsModel = null;
  #offersModel = null;
  #tripsModel = null;
  #tripPresenters = {};

  constructor({ container, destinationsModel, offersModel, tripsModel }) {
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#tripsModel = tripsModel;
  }

  init() {
    const tripsList = this.#tripsModel.trips;

    render(this.#tripEventsList, this.#container);

    if (!tripsList.length) {
      this.#renderEmptyListMessage();
      return;
    }

    tripsList.forEach((trip) => {
      this.#renderTrip(trip);
    });
  }

  #renderEmptyListMessage() {
    const emptyListMessageComponent = new EmptyListMessage();
    render(emptyListMessageComponent, this.#tripEventsList.element);
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
    const updatedTrip = this.#tripsModel.getTripById(tripId);
    this.#tripPresenters[tripId].init(updatedTrip);
  };

  #handleTripModeChange = () => {
    const allPresentersArray = Object.values(this.#tripPresenters);
    allPresentersArray.forEach((presenter) => presenter.resetView());
  };
}
