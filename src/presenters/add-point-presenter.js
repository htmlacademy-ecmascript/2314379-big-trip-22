import { render } from '../render';
import AddPointForm from '../view/add-point-form';
import { remove } from '../framework/render';

export default class AddPointPresenter {
  #container = null;
  #destinations = null;
  #offers = null;
  #pointAddComponent = null;
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
    this.#pointAddComponent = new AddPointForm({
      destinations: this.#destinations,
      offers: this.#offers,
      onFormSubmit: this.#onEventCreate,
      onFormCancel: this.#handleFormCancel,
    });

    const position = 'beforebegin';
    render(this.#pointAddComponent, this.#container, position);
  }

  removeComponent = () => {
    remove(this.#pointAddComponent);
  };
}
