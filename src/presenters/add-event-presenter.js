import { render } from '../render';
import TripEvent from '../view/trip-event';
import EditEventForm from '../view/edit-event-form';
import AddPointForm from '../view/add-event-form';
import { replace, remove } from '../framework/render';
import { TRIP_MODE, ACTION_TYPE, UPDATE_TYPE } from '../const';

export default class AddEventPresenter {
  #container = null;
  #destinations = null;
  #offers = null;
  #tripAddComponent = null;
  #onAddFormOpen = null;
  #onEventCreate = null;
  #handleFormCancel = null;

  constructor({ container, destinations, offers, onAddFormOpen, onEventCreate, handleFormCancel }) {
    this.#container = container;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#onAddFormOpen = onAddFormOpen;
    this.#onEventCreate = onEventCreate;
    this.#handleFormCancel = handleFormCancel;
  }

  init() {
    this.#onAddFormOpen();
    this.#tripAddComponent = new AddPointForm({
      destinations: this.#destinations,
      offers: this.#offers,
      onFormSubmit: this.#onEventCreate,
      onFormCancel: this.#handleFormCancel,
    });

    const position = 'beforebegin';
    render(this.#tripAddComponent, this.#container, position);
  }

  removeComponent = () => {
    remove(this.#tripAddComponent);
  };
}