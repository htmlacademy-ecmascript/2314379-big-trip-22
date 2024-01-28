import { render } from '../render';
import TripEvent from '../view/trip-event';
import EditPointForm from '../view/edit-point-form';
import { replace } from '../framework/render';
import { TRIP_MODE } from '../const';

export default class TripEventPresenter {
  #container = null;
  #destinations = null;
  #offers = null;
  #mode = TRIP_MODE.DEFAULT;
  #onModeChange = null;
  #onDataChange = null;
  #tripComponent = null;
  #tripEditorComponent = null;

  constructor({ container, destinations, offers, onDataChange, onModeChange }) {
    this.#container = container;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#onDataChange = onDataChange;
    this.#onModeChange = onModeChange;
  }

  init(trip) {
    const prevComponent = this.#tripComponent;
    const prevEditorComponent = this.#tripEditorComponent;

    this.#tripComponent = new TripEvent({
      trip,
      onEditClick: this.#tripEditHandler,
      onFavoriteClick: () => this.#onTripFavoriteClick(trip),
    });

    this.#tripEditorComponent = new EditPointForm({
      editingTrip: trip,
      destinations: this.#destinations,
      offers: this.#offers,
      onCloseClick: this.#tripEditorCloseHandler,
      onFormSubmit: this.#formSubmitHandler,
    });

    if (!prevComponent || !prevEditorComponent) {
      render(this.#tripComponent, this.#container);
      return;
    }

    if (this.#mode === TRIP_MODE.DEFAULT) {
      replace(this.#tripComponent, prevComponent);
      return;
    }

    if (this.#mode === TRIP_MODE.EDITING) {
      replace(this.#tripEditorComponent, prevEditorComponent);
      return;
    }

  }

  resetView() {
    if (this.#mode === TRIP_MODE.DEFAULT) {
      return;
    }
    this.#replaceEditorToPoint();
  }

  #tripEditHandler = () => {
    this.#replacePointToEditor();
    document.addEventListener('keydown', this.#escKeydownHandler);
  }

  #formSubmitHandler = () => {
    this.#replaceEditorToPoint();
    document.removeEventListener('keydown', this.#escKeydownHandler);
  }

  #replacePointToEditor = () => {
    replace(this.#tripEditorComponent, this.#tripComponent);
    this.#onModeChange();
    this.#mode = TRIP_MODE.EDITING;
  }

  #replaceEditorToPoint = () => {
    replace(this.#tripComponent, this.#tripEditorComponent);
    this.#mode = TRIP_MODE.DEFAULT;
  }

  #tripEditorCloseHandler = () => {
    this.#replaceEditorToPoint();
  }

  #escKeydownHandler = (event) => {
    if (event.key !== 'Escape') {
      return;
    }
    this.#replaceEditorToPoint();
  }

  #onTripFavoriteClick(trip) {
    this.#onDataChange(trip.id, {
      ...trip,
      isFavorite: !trip.isFavorite,
    });
  }
}
