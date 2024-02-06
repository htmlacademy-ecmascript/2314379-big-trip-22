import { render } from '../render';
import Point from '../view/point';
import EditPointForm from '../view/edit-point-form';
import { replace, remove } from '../framework/render';
import { POINT_MODE, ACTION_TYPE, UPDATE_TYPE } from '../const';

export default class PointPresenter {
  #container = null;
  #destinations = null;
  #offers = null;
  #mode = POINT_MODE.DEFAULT;
  #onModeChange = null;
  #onDataChange = null;
  #pointComponent = null;
  #pointEditorComponent = null;
  #point = null;

  constructor({ container, destinations, offers, onDataChange, onModeChange }) {
    this.#container = container;
    this.#destinations = destinations;
    this.#offers = offers;
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
      onEditClick: this.#handlePointEdit,
      onFavoriteClick: () => this.#handlePointFavoriteClick(point),
    });

    this.#pointEditorComponent = new EditPointForm({
      editingPoint: point,
      destinations: this.#destinations,
      offers: this.#offers,
      onCloseClick: this.#pointEditorCloseHandler,
      onFormSubmit: this.#formSubmitHandler,
      onPointDelete: () => this.#pointDeleteHandler(point),
    });

    if (!prevComponent || !prevEditorComponent) {
      render(this.#pointComponent, this.#container);
      return;
    }

    if (this.#mode === POINT_MODE.DEFAULT) {
      replace(this.#pointComponent, prevComponent);
      return;
    }

    if (this.#mode === POINT_MODE.EDITING) {
      replace(this.#pointEditorComponent, prevEditorComponent);
    }
  }

  #handlePointEdit = () => {
    this.#replacePointToEditor();
    document.addEventListener('keydown', this.#escKeydownHandler);
  };

  #formSubmitHandler = async (point) => {
    this.#onDataChange(ACTION_TYPE.UPDATE_POINT, UPDATE_TYPE.MINOR, point);
  };

  #pointDeleteHandler = (point) => {
    this.#onDataChange(ACTION_TYPE.DELETE_POINT, UPDATE_TYPE.MINOR, point);
  };

  #replacePointToEditor = () => {
    replace(this.#pointEditorComponent, this.#pointComponent);
    this.#onModeChange();
    this.#mode = POINT_MODE.EDITING;
  };

  #replaceEditorToPoint = () => {
    replace(this.#pointComponent, this.#pointEditorComponent);
    this.#mode = POINT_MODE.DEFAULT;
    document.removeEventListener('keydown', this.#escKeydownHandler);
  };

  #pointEditorCloseHandler = () => {
    this.#replaceEditorToPoint();
  };

  #escKeydownHandler = (event) => {
    if (event.key !== 'Escape') {
      return;
    }
    this.#replaceEditorToPoint();
  };

  #handlePointFavoriteClick(point) {
    this.#onDataChange(ACTION_TYPE.UPDATE_POINT, UPDATE_TYPE.MINOR, {
      ...point,
      isFavorite: !point.isFavorite,
    });
  }

  resetView() {
    if (this.#mode === POINT_MODE.DEFAULT) {
      return;
    }
    this.#pointEditorComponent.reset(this.#point);
    this.#replaceEditorToPoint();
  }

  removePoint() {
    remove(this.#pointComponent);
    remove(this.#pointEditorComponent);
  }

  setSaving = () => {
    if (this.#mode === POINT_MODE.EDITING) {
      this.#pointEditorComponent.updateElement({
        isDisabled: true,
        isSaving: true
      });
    }
  };

  setAborting = () => {
    if (this.#mode === POINT_MODE.DEFAULT) {
      this.#pointComponent.shake();
    }

    if (this.#mode === POINT_MODE.EDITING) {
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
