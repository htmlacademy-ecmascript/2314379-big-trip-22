import AbstractView from '../framework/view/abstract-view.js';
import { FILTER_VARIANTS } from '../const.js';

function createTripsFiltersTemplate() {
  const filterItems = FILTER_VARIANTS.map((variant) => (`
    <div class="trip-filters__filter">
      <input id="filter-${variant.type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${variant.type}" ${variant.state}>
      <label class="trip-filters__filter-label" for="filter-${variant.type}">${variant.label}</label>
    </div>
  `)).join('');

  const filterForm = `
    <form class="trip-filters" action="#" method="get">
      ${filterItems}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `;

  return filterForm;
}

export default class TripFilters extends AbstractView {
  get template() {
    return createTripsFiltersTemplate();
  }
}
