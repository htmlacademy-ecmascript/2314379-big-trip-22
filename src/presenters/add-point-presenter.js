import { render } from '../render';
import EditPointForm from '../view/edit-point-form';
import { remove } from '../framework/render';
import { EditType } from '../const';

export default class AddPointPresenter {
  #container = null;
  #destinations = null;
  #offers = null;
  #pointAddComponent = null;
  #onAddFormOpen = null;
  #onEventCreate = null;
  #onFormCancel = null;
  #onDestroy = null;

  constructor({ container, destinations, offers, onAddFormOpen, onEventCreate, onFormCancel, onDestroy }) {
    this.#container = container;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#onAddFormOpen = onAddFormOpen;
    this.#onEventCreate = onEventCreate;
    this.#onFormCancel = onFormCancel;
    this.#onDestroy = onDestroy;
  }

  init() {
    this.#onAddFormOpen();
    this.#pointAddComponent = new EditPointForm({
      destinations: this.#destinations,
      offers: this.#offers,
      editorMode: EditType.CREATING,
      onCloseClick: this.#onFormCancel,
      onFormSubmit: this.#onEventCreate,
    });

    const position = 'beforebegin';
    render(this.#pointAddComponent, this.#container, position);
  }

  destroy({isCanceled = true} = {}) {
    if (!this.#pointAddComponent) {
      return;
    }

    remove(this.#pointAddComponent);
    this.#pointAddComponent = null;
    this.#onDestroy(isCanceled);
  }

  setSaving = () => {
    this.#pointAddComponent.updateElement({
      isDisabled: true,
      isSaving: true
    });
  };

  setAborting = () => {
    const resetFormState = () => {
      this.#pointAddComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };
    this.#pointAddComponent.shake(resetFormState);
  };

  removeComponent = () => {
    remove(this.#pointAddComponent);
  };
}
