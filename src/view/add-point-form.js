import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { EVENT_TYPES, FULL_DATE_FORMAT, DATEPICKER_DATE_FORMAT } from '../const.js';
import { capitalizeFirstLetter, humanizeDate, checkPriceIsNumber } from '../utils.js';
import flatpickr from 'flatpickr';

function createAddEventFormTemplate({ state, availableDestinations, availableOffers }) {
  const { basePrice, dateFrom, dateTo, destination, offers, type } = state;

  const eventTypeItems = EVENT_TYPES.map((eventType) => (`
    <div class="event__type-item">
      <input id="event-type-${eventType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eventType}">
      <label class="event__type-label  event__type-label--${eventType}" for="event-type-${eventType}-1">${capitalizeFirstLetter(eventType)}</label>
    </div>
  `)).join('');

  const eventName = capitalizeFirstLetter(type);
  const destinationItems = availableDestinations.map((availableDestination) => (`
    <option value="${availableDestination.name}">${availableDestination.name}</option>
  `)).join('');

  const humanizeDateFrom = humanizeDate(dateFrom, FULL_DATE_FORMAT);
  const humanizeDateTo = humanizeDate(dateTo, FULL_DATE_FORMAT);

  const offersByType = availableOffers.find((availableOffer) => availableOffer.type === type).offers;
  const offerItems = offersByType.map((offer) => {
    const offerTitle = offer.title.toLowerCase();
    const isChecked = offers.find((pointOfferId) => pointOfferId === offer.id) ? 'checked' : '';

    return (`
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.type}-${offer.id}" type="checkbox" name="event-offer-${offer.type}" data-id="${offer.id}" ${isChecked}>
        <label class="event__offer-label" for="event-offer-${offer.type}-${offer.id}">
          <span class="event__offer-title">${offerTitle}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>
    `);
  }).join('');

  const photoItems = destination?.pictures?.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`);

  return (`
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${eventTypeItems}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-${destination?.id ?? '0'}">
            ${eventName}
          </label>
          <select class="event__input  event__input--destination" id="event-destination-${destination?.id ?? '0'}" name="event-destination" value="${destination?.name ?? ''}">
            ${destinationItems}
          </select>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value=${dateFrom ? humanizeDateFrom : ''}>
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value=${dateTo ? humanizeDateTo : ''}>
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value=${basePrice}>
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${offerItems}
          </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${destination?.description ?? ''}</p>

          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${photoItems ?? ''}
            </div>
          </div>
        </section>
      </section>
    </form>
  `);
}

export default class AddPointForm extends AbstractStatefulView {
  #destinations = null;
  #offers = null;
  #onFormSubmit = null;
  #onFormCancel = null;
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor({ destinations, offers, onFormSubmit, onFormCancel }) {
    super();
    this._setState(AddPointForm.setDefaultState());
    this.#destinations = destinations;
    this.#offers = offers;
    this.#onFormSubmit = onFormSubmit;
    this.#onFormCancel = onFormCancel;
    this._restoreHandlers();
  }

  get template() {
    return createAddEventFormTemplate({
      state: this._state,
      availableDestinations: this.#destinations,
      availableOffers: this.#offers,
    });
  }

  static setDefaultState() {
    const state = {
      basePrice: '0',
      dateFrom: '',
      dateTo: '',
      destination: null,
      offers: [],
      type: 'flight',
      isFavorite: false,
    };

    return state;
  }

  static parseStateToPoint(state) {
    const point = {...state};
    return point;
  }

  #formSubmitHandler = (event) => {
    event.preventDefault();
    const state = this._state;
    const isFormValid = Boolean(state.basePrice && state.dateFrom && state.dateTo && state.destination);
    if (!isFormValid) {
      return;
    }

    const createdPoint = AddPointForm.parseStateToPoint(this._state);
    this.#onFormSubmit(createdPoint);
  };

  #pointTypeChangeHandler = (event) => {
    event.preventDefault();
    this.updateElement({
      type: event.target.value,
    });
  };

  #destinationChangeHandler = (event) => {
    event.preventDefault();
    const selectedDestination = this.#destinations.find((destination) => destination.name === event.target.value);
    if (!selectedDestination) {
      return;
    }
    this.updateElement({
      destination: selectedDestination,
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

  #setDatepicker() {
    const dateFrom = this.element.querySelector('.event__input--time[name="event-start-time"]');
    const dateTo = this.element.querySelector('.event__input--time[name="event-end-time"]');
    const config = {
      dateFormat: DATEPICKER_DATE_FORMAT,
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

  #basePriceChangeHandler = (event) => {
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

  _restoreHandlers() {
    this.element.querySelector('.event__save-btn').addEventListener('click', this.#formSubmitHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#onFormCancel);
    this.element.querySelector('.event__type-list').addEventListener('change', this.#pointTypeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#basePriceChangeHandler);
    this.element.querySelector('.event__available-offers')?.addEventListener('change', this.#offerChangeHandler);
    this.#setDatepicker();
  }

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
}
