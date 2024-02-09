import { POINT_TYPES, DateFormat, EditType } from '../const';
import { capitalizeFirstLetter, humanizeDate } from '../utils';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

function createPointTypesListTemplate() {
  const pointTypeItems = POINT_TYPES.map((pointType) => (`
    <div class="event__type-item">
      <input id="event-type-${pointType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value=${pointType}>
      <label class="event__type-label  event__type-label--${pointType}" for="event-type-${pointType}-1">${capitalizeFirstLetter(pointType)}</label>
    </div>
  `)).join('');

  return `
    <div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Event type</legend>
        ${pointTypeItems}
      </fieldset>
    </div>
  `;
}

function createDestinationsTemplate({ eventName, destination, availableDestinations }) {
  const destinationItems = availableDestinations?.map((availableDestination) => (`
    <option value="${availableDestination.name}"></option>
  `)).join('');

  return `
    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-${destination?.id ?? ''}">
        ${eventName}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-${destination?.id ?? ''}" type="text" name="event-destination" value="${destination?.name ?? ''}" list="destination-list-${destination?.id ?? ''}">
      <datalist id="destination-list-${destination?.id ?? ''}">
        ${destinationItems}
      </datalist>
    </div>
  `;
}

function createOffersTemplate({ selectedOffers, availableOffers }) {
  const offerItems = availableOffers.map((offerByType) => {
    const offerTitle = offerByType.title.toLowerCase();
    const isChecked = selectedOffers.find((pointOffer) => pointOffer === offerByType.id) ? 'checked' : '';

    return (`
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerByType.type}-${offerByType.id}" type="checkbox" name="event-offer-${offerByType.type}" data-id="${offerByType.id}" ${isChecked}>
        <label class="event__offer-label" for="event-offer-${offerByType.type}-${offerByType.id}">
          <span class="event__offer-title">${offerTitle}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offerByType.price}</span>
        </label>
      </div>
    `);
  }).join('');

  return `
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${offerItems}
      </div>
    </section>
  `;
}

function createDestinationInfoTemplate({ destinationDescription, photos }) {
  const photoItems = photos?.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('');

  return `
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      ${destinationDescription ? `<p class="event__destination-description">${destinationDescription}</p>` : ''}
      ${photos.length > 0 ? `
        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${photoItems}
          </div>
        </div>
      ` : ''}
    </section>
  `;
}

function createButtonTemplate({ isCreating, isSaving, isDeleting, isDisabled }) {
  const deleteOrCancelButton = isCreating
    ? '<button class="event__reset-btn" type="reset">Cancel</button>'
    : `<button class="event__reset-btn" type="reset">${isDeleting ? 'Deleting' : 'Delete'}</button>`;

  const rollupButton = !isCreating
    ? `<button class="event__rollup-btn" type="button" ${isDisabled ? 'disabled' : ''}>
        <span class="visually-hidden">Open event</span>
      </button>`
    : '';

  return `
    <button class="event__save-btn  btn  btn--blue" type="submit">${isSaving ? 'Saving' : 'Save'}</button>
    ${deleteOrCancelButton}
    ${rollupButton}
  `;
}

function createEditPointFormTemplate({ state, availableDestinations, availableOffers, editorMode }) {
  const { type, dateFrom, dateTo, offers, basePrice, destination, isSaving, isDeleting, isDisabled } = state;
  const isCreating = editorMode === EditType.CREATING;
  const eventName = capitalizeFirstLetter(type);
  const selectedDestination = availableDestinations?.find((availableDestination) => availableDestination.id === destination);

  const humanizeDateFrom = dateFrom ? humanizeDate(dateFrom, DateFormat.FULL_DATE_FORMAT) : '';
  const humanizeDateTo = dateTo ? humanizeDate(dateTo, DateFormat.FULL_DATE_FORMAT) : '';

  const offersByType = availableOffers?.find((offer) => offer.type === type)?.offers;

  const photos = selectedDestination?.pictures;
  const isDestinationInfoAvailable = selectedDestination?.description || photos?.length > 0;

  return (`
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          ${createPointTypesListTemplate()}
        </div>

        ${createDestinationsTemplate({ eventName, destination: selectedDestination, availableDestinations })}
        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value=${humanizeDateFrom}>
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value=${humanizeDateTo}>
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value=${basePrice}>
        </div>

        ${createButtonTemplate({ isCreating, isSaving, isDeleting, isDisabled })}
      </header>
      <section class="event__details">
        ${offersByType?.length > 0 ? createOffersTemplate({ selectedOffers: offers, availableOffers: offersByType }) : ''}
        ${isDestinationInfoAvailable ? createDestinationInfoTemplate({ destinationDescription: selectedDestination?.description, photos }) : ''}
      </section>
    </form>
  `);
}

export default class EditPointForm extends AbstractStatefulView {
  #editingPoint = null;
  #destinations = null;
  #offers = null;
  #onCloseClick = null;
  #onFormSubmit = null;
  #deleteButtonClickHandler = null;
  #datepickerFrom = null;
  #datepickerTo = null;
  #editorMode = null;

  constructor({ editingPoint, destinations, offers, onCloseClick, onFormSubmit, onPointDelete, editorMode = EditType.EDITING }) {
    super();
    this.#editingPoint = editingPoint;
    this.#editorMode = editorMode;
    this.setDefaultState();
    this.#destinations = destinations;
    this.#offers = offers;
    this.#onCloseClick = onCloseClick;
    this.#onFormSubmit = onFormSubmit;
    this.#deleteButtonClickHandler = onPointDelete;
    this._restoreHandlers();
  }

  _restoreHandlers() {
    if (this.#editorMode === EditType.EDITING) {
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeButtonClickHandler);
      this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteButtonClickHandler);
    }

    if (this.#editorMode === EditType.CREATING) {
      this.element.querySelector('.event__reset-btn').addEventListener('click', this.#onCloseClick);
    }

    this.element.querySelector('.event__save-btn').addEventListener('click', this.#saveButtonClickHandler);
    this.element.querySelector('.event__type-list').addEventListener('change', this.#pointTypeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#basePriceChangeHandler);
    this.element.querySelector('.event__available-offers')?.addEventListener('change', this.#offerChangeHandler);
    this.#setDatepicker();
  }

  get template() {
    return createEditPointFormTemplate({
      state: this._state,
      availableDestinations: this.#destinations,
      availableOffers: this.#offers,
      editorMode: this.#editorMode,
    });
  }

  setDefaultState() {
    if (this.#editorMode === EditType.EDITING) {
      this._setState(EditPointForm.parsePointToState(this.#editingPoint));
      return;
    }

    if (this.#editorMode === EditType.CREATING) {
      const state = {
        basePrice: '0',
        dateFrom: '',
        dateTo: '',
        destination: null,
        offers: [],
        type: 'flight',
        isFavorite: false,
      };

      this._setState(EditPointForm.parsePointToState(state));
    }
  }

  static parsePointToState(editingPoint) {
    const point = {...editingPoint};
    return point;
  }

  static parseStateToPoint(state) {
    const point = {...state};
    return point;
  }

  #closeButtonClickHandler = () => {
    this.updateElement(EditPointForm.parsePointToState(this.#editingPoint));
    this.#onCloseClick();
  };

  #saveButtonClickHandler = (event) => {
    event.preventDefault();
    const updatedPoint = EditPointForm.parseStateToPoint(this._state);
    this.#onFormSubmit(updatedPoint);
  };

  #setDatepicker() {
    const dateFrom = this.element.querySelector('.event__input--time[name="event-start-time"]');
    const dateTo = this.element.querySelector('.event__input--time[name="event-end-time"]');
    const config = {
      dateFormat: DateFormat.DATEPICKER_DATE_FORMAT,
      enableTime: true,
      locale: {
        firstDayOfWeek: 1,
      },
      'time_24hr': true,
    };

    this.#datepickerFrom = flatpickr(
      dateFrom,
      {
        ...config,
        defaultDate: this._state.dateFrom,
        onChange: this.#handleChangeDateFrom,
        maxDate: this._state.dateTo,
      },
    );

    this.#datepickerTo = flatpickr(
      dateTo,
      {
        ...config,
        defaultDate: this._state.dateTo,
        onChange: this.#handleChangeDateTo,
        minDate: this._state.dateFrom,
      },
    );
  }

  #pointTypeChangeHandler = (event) => {
    event.preventDefault();
    this.updateElement({
      type: event.target.value,
      offers: [],
    });
  };

  #destinationChangeHandler = (event) => {
    event.preventDefault();
    const selectedDestination = this.#destinations.find((destination) => destination.name === event.target.value);
    if (!selectedDestination) {
      return;
    }
    this.updateElement({
      destination: selectedDestination.id,
    });
  };

  #handleChangeDateFrom = ([dateFrom]) => {
    this.updateElement({
      dateFrom,
    });
  };

  #handleChangeDateTo = ([dateTo]) => {
    this.updateElement({
      dateTo,
    });
  };

  #basePriceChangeHandler = (event) => {
    event.preventDefault();
    this.updateElement({
      basePrice: event.target.value,
    });
  };

  #offerChangeHandler = (event) => {
    event.preventDefault();
    const checkedOffersCollection = this.element.querySelectorAll('.event__offer-checkbox:checked');
    const checkedOffersIdsArray = [...checkedOffersCollection].map((offer) => offer.dataset.id);
    this.updateElement({
      offers: checkedOffersIdsArray,
    });
  };

  removeElement() {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  reset(point) {
    this.updateElement(
      EditPointForm.parsePointToState(point),
    );
  }
}
