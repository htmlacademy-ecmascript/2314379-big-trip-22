import AbstractView from '../framework/view/abstract-view.js';
import { MAIN_EVENT } from '../const.js';

function createTripInfoTemplate() {
  return (`
    <section class="trip-main__trip-info  trip-info">
        <div class="trip-info__main">
        <h1 class="trip-info__title">${MAIN_EVENT.LABEL}</h1>

        <p class="trip-info__dates">${MAIN_EVENT.DATES}</p>
        </div>

        <p class="trip-info__cost">
        Total: &${MAIN_EVENT.CURRENCY};&nbsp;<span class="trip-info__cost-value">${MAIN_EVENT.PRICE}</span>
        </p>
    </section>
  `);
}

export default class TripInfo extends AbstractView {
  get template() {
    return createTripInfoTemplate();
  }
}
