import AbstractView from '../framework/view/abstract-view.js';
import { SORT_VARIANTS } from '../const.js';

function createTripSortTemplate() {
  const sortItems = SORT_VARIANTS.map((variant) => (`
    <div class="trip-sort__item  trip-sort__item--${variant.type}">
      <input id="sort-${variant.type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${variant.type}" ${variant.state}>
      <label class="trip-sort__btn" for="sort-${variant.type}">${variant.label}</label>
    </div>
  `)).join('');

  const sortForm = `
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortItems}
    </form>
  `;

  return sortForm;
}

export default class TripSort extends AbstractView {
  get template() {
    return createTripSortTemplate();
  }
}
