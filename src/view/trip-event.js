import { createElement } from '../render';
import { capitalizeFirstLetter, humanizeDate, getTimeRange } from '../utils';
import { MONTH_FORMAT, MONTH_DAY_FORMAT, HOURS_MINUTES_FORMAT } from '../const';

function createTripEventTemplate(trip) {
  const { type, destination, dateFrom, dateTo, basePrice, offers } = trip;

  const tripDate = `${humanizeDate(dateFrom, MONTH_FORMAT).toUpperCase()} ${humanizeDate(dateFrom, MONTH_DAY_FORMAT)}`;
  const tripTitle = `${capitalizeFirstLetter(type)} ${destination.name}`;
  const timeFrom = humanizeDate(dateFrom, HOURS_MINUTES_FORMAT);
  const timeTo = humanizeDate(dateTo, HOURS_MINUTES_FORMAT);
  const offersList = offers.map((offer) => (`
    <li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </li>`
  )).join('');

  return (`
    <li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="2019-03-18">${tripDate}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${tripTitle}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime=${dateFrom}>${timeFrom}</time>
            &mdash;
            <time class="event__end-time" datetime=${dateTo}>${timeTo}</time>
          </p>
          <p class="event__duration">${getTimeRange(dateFrom, dateTo)}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offersList}
        </ul>
        <button class="event__favorite-btn event__favorite-btn--active" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
  `);
}

export default class TripEvent {
  constructor({ trip }) {
    this.trip = trip;
  }

  getTemplate() {
    return createTripEventTemplate(this.trip);
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
