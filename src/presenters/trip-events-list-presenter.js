import { render } from '../render';
import TripEvent from '../view/trip-event';
import TripEventsList from '../view/trip-events-list';
import AddPointForm from '../view/add-point-form';
import EditPointForm from '../view/edit-point-form';
import { replace } from '../framework/render';

export default class TripEventsListPresenter {
  #tripEventsList = new TripEventsList();
  #addPointForm = new AddPointForm();
  #container = null;
  #destinationsModel = null;
  #offersModel = null;
  #tripsModel = null;

  constructor({ container, destinationsModel, offersModel, tripsModel }) {
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#tripsModel = tripsModel;
  }

  init() {
    const tripsList = this.#tripsModel.trips;

    render(this.#tripEventsList, this.#container);

    tripsList.forEach((trip) => {
      this.#renderTrip(trip);
    });
  }

  #renderTrip(trip) {
    const editingTrip = this.#tripsModel.getRandomTrip();
    const destinations = this.#destinationsModel.destinations;
    const offers = this.#offersModel.getOffersByType(editingTrip.type);

    const tripComponent = new TripEvent({
      trip,
      onEditClick: () => {
        tripEditHandler();
        document.addEventListener('keydown', escKeydownHandler);
      }
    });

    const tripEditorComponent = new EditPointForm({
      editingTrip,
      destinations,
      offers,
      onCloseClick: tripEditorCloseHandler,
      onFormSubmit: () => {
        tripEditorSubmitHandler();
        document.removeEventListener('keydown', escKeydownHandler);
      }
    });

    function replacePointToEditor() {
      replace(tripEditorComponent, tripComponent);
    }

    function replaceEditorToPoint() {
      replace(tripComponent, tripEditorComponent);
    }

    function tripEditHandler() {
      replacePointToEditor();
    }

    function tripEditorCloseHandler() {
      replaceEditorToPoint();
    }

    function tripEditorSubmitHandler() {
      replaceEditorToPoint();
    }

    function escKeydownHandler() {
      replaceEditorToPoint();
    }

    render(tripComponent, this.#tripEventsList.element);
  }
}
