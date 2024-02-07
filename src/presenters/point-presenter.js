import { render } from '../render';
import Point from '../view/point';
import EditPointForm from '../view/edit-point-form';
import { replace, remove } from '../framework/render';
import { PointMode, ActionType, UpdateType, EditType } from '../const';

export default class PointPresenter {
  #container = null;
  #destinations = null;
  #offers = null;
  #mode = PointMode.DEFAULT;
  #onEditorOpen = null;
  #onModeChange = null;
  #onDataChange = null;
  #pointComponent = null;
  #pointEditorComponent = null;
  #point = null;

  constructor({ container, destinations, offers, onEditorOpen, onDataChange, onModeChange }) {
    this.#container = container;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#onEditorOpen = onEditorOpen;
    this.#onDataChange = onDataChange;
    this.#onModeChange = onModeChange;
  }

  init(point) {
    this.#point = point;
    const prevComponent = this.#pointComponent;
    const prevEditorComponent = this.#pointEditorComponent;

    this.#pointComponent = new Point({
      point,
      destinations: this.#destinations,
      offers: this.#offers,
      onEditClick: this.#pointEditHandler,
      onFavoriteClick: () => this.#pointFavoriteClickHandler(point),
    });

    this.#pointEditorComponent = new EditPointForm({
      editingPoint: point,
      destinations: this.#destinations,
      offers: this.#offers,
      editorMode: EditType.EDITING,
      onCloseClick: this.#pointEditorCloseHandler,
      onFormSubmit: this.#formSubmitHandler,
      onPointDelete: () => this.#pointDeleteHandler(point),
    });

    if (!prevComponent || !prevEditorComponent) {
      render(this.#pointComponent, this.#container);
      return;
    }

    if (this.#mode === PointMode.DEFAULT) {
      replace(this.#pointComponent, prevComponent);
      return;
    }

    if (this.#mode === PointMode.EDITING) {
      replace(this.#pointEditorComponent, prevEditorComponent);
    }
  }

  #pointEditHandler = () => {
    this.#replacePointToEditorHandler();
    this.#onEditorOpen();
    document.addEventListener('keydown', this.#escKeydownHandler);
  };

  #formSubmitHandler = async (point) => {
    this.#onDataChange(ActionType.UPDATE_POINT, UpdateType.MINOR, point);
  };

  #pointDeleteHandler = (point) => {
    this.#onDataChange(ActionType.DELETE_POINT, UpdateType.MINOR, point);
  };

  #replacePointToEditorHandler = () => {
    replace(this.#pointEditorComponent, this.#pointComponent);
    this.#onModeChange();
    this.#mode = PointMode.EDITING;
  };

  #replaceEditorToPointHandler = () => {
    replace(this.#pointComponent, this.#pointEditorComponent);
    this.#mode = PointMode.DEFAULT;
    document.removeEventListener('keydown', this.#escKeydownHandler);
  };

  #pointEditorCloseHandler = () => {
    this.#replaceEditorToPointHandler();
  };

  #escKeydownHandler = (event) => {
    if (event.key !== 'Escape') {
      return;
    }
    this.#replaceEditorToPointHandler();
  };

  #pointFavoriteClickHandler(point) {
    this.#onDataChange(ActionType.UPDATE_POINT, UpdateType.MINOR, {
      ...point,
      isFavorite: !point.isFavorite,
    });
  }

  resetView() {
    if (this.#mode === PointMode.DEFAULT) {
      return;
    }
    this.#pointEditorComponent.reset(this.#point);
    this.#replaceEditorToPointHandler();
  }

  removePoint() {
    remove(this.#pointComponent);
    remove(this.#pointEditorComponent);
  }

  setSaving = () => {
    if (this.#mode === PointMode.EDITING) {
      this.#pointEditorComponent.updateElement({
        isDisabled: true,
        isSaving: true
      });
    }
  };

  setAborting = () => {
    if (this.#mode === PointMode.DEFAULT) {
      this.#pointComponent.shake();
    }

    if (this.#mode === PointMode.EDITING) {
      const resetFormState = () => {
        this.#pointEditorComponent.updateElement({
          isDisabled: false,
          isSaving: false,
          isDeleting: false,
        });
      };

      this.#pointEditorComponent.shake(resetFormState);
    }
  };

  setRemove = () => {
    this.#pointEditorComponent.updateElement({
      isDisabled: true,
      isDeleting: true,
    });
  };
}
