import { createElement } from '../render';
import { EVENT_TYPES, FULL_DATE_FORMAT } from '../const';
import { capitalizeFirstLetter, humanizeDate } from '../utils';

function createEditPointFormTemplate(editingTrip, destinations, offers) {
  const eventTypeItems = EVENT_TYPES.map((eventType) => (`
    <div class="event__type-item">
      <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value=${eventType}>
      <label class="event__type-label  event__type-label--${eventType}" for="event-type-${eventType}-1">${capitalizeFirstLetter(eventType)}</label>
    </div>
  `)).join('');

  const eventName = capitalizeFirstLetter(editingTrip.type);

  const destinationItems = destinations.map((destination) => (`
    <option value=${destination.name}></option>
  `)).join('');

  const dateFrom = humanizeDate(editingTrip.dateFrom, FULL_DATE_FORMAT);
  const dateTo = humanizeDate(editingTrip.dateTo, FULL_DATE_FORMAT);

  const offerItems = offers.map((offer) => {
    const offerTitle = offer.title.toLowerCase();
    const isChecked = editingTrip.offers.find((tripOffer) => tripOffer.id === offer.id) ? 'checked' : '';

    return (`
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-${offerTitle}" ${isChecked}>
        <label class="event__offer-label" for="event-offer-${offerTitle}-1">
          <span class="event__offer-title">${offerTitle}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>
    `);
  }).join('');

  return (`
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${editingTrip.type}.png" alt="Event type icon">
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
          <label class="event__label  event__type-output" for="event-destination-1">
            ${eventName}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value=${editingTrip.destination.name} list="destination-list-1">
          <datalist id="destination-list-1">
            ${destinationItems}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value=${dateFrom}>
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value=${dateTo}>
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value=${editingTrip.basePrice}>
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
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
          <p class="event__destination-description">${editingTrip.destination.description}</p>
        </section>
      </section>
    </form>
  `);
}

export default class EditPointForm {
  constructor({ editingTrip, destinations, offers }) {
    this.editingTrip = editingTrip;
    this.destinations = destinations;
    this.offers = offers;
  }

  getTemplate() {
    return createEditPointFormTemplate(this.editingTrip, this.destinations, this.offers);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
