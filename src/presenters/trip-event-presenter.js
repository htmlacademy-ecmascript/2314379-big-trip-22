import { render } from '../render';
import TripEvent from '../view/trip-event';
import EditEventForm from '../view/edit-event-form';
import { replace, remove } from '../framework/render';
import { TRIP_MODE, ACTION_TYPE, UPDATE_TYPE } from '../const';

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
      onEditClick: this.#handleTripEdit,
      onFavoriteClick: () => this.#handleTripFavoriteClick(trip),
    });

    this.#tripEditorComponent = new EditEventForm({
      editingTrip: trip,
      destinations: this.#destinations,
      offers: this.#offers,
      onCloseClick: this.#tripEditorCloseHandler,
      onFormSubmit: this.#formSubmitHandler,
      onTripDelete: () => this.#tripDeleteHandler(trip),
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
    }
  }

  #handleTripEdit = () => {
    this.#replacePointToEditor();
    document.addEventListener('keydown', this.#escKeydownHandler);
  };

  #formSubmitHandler = (trip) => {
    this.#onDataChange(ACTION_TYPE.UPDATE_TRIP, UPDATE_TYPE.MINOR, trip);
    this.#replaceEditorToPoint();
  };

  #tripDeleteHandler = (trip) => {
    this.#onDataChange(ACTION_TYPE.DELETE_TRIP, UPDATE_TYPE.MINOR, trip);
  }

  #replacePointToEditor = () => {
    replace(this.#tripEditorComponent, this.#tripComponent);
    this.#onModeChange();
    this.#mode = TRIP_MODE.EDITING;
  };

  #replaceEditorToPoint = () => {
    replace(this.#tripComponent, this.#tripEditorComponent);
    this.#mode = TRIP_MODE.DEFAULT;
    document.removeEventListener('keydown', this.#escKeydownHandler);
  };

  #tripEditorCloseHandler = () => {
    this.#replaceEditorToPoint();
  };

  #escKeydownHandler = (event) => {
    if (event.key !== 'Escape') {
      return;
    }
    this.#replaceEditorToPoint();
  };

  #handleTripFavoriteClick(trip) {
    this.#onDataChange(ACTION_TYPE.UPDATE_TRIP, UPDATE_TYPE.MINOR, {
      ...trip,
      isFavorite: !trip.isFavorite,
    });
  }

  resetView() {
    if (this.#mode === TRIP_MODE.DEFAULT) {
      return;
    }
    this.#replaceEditorToPoint();
  }

  removeTrip() {
    remove(this.#tripComponent);
    remove(this.#tripEditorComponent);
  }
}
