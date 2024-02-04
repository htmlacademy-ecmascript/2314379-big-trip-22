import AbstractView from '../framework/view/abstract-view.js';

function createTripsFiltersTemplate(filters) {
  const filterItems = filters.map((filter) => (`
    <div class="trip-filters__filter">
      <input id="filter-${filter.type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.type}" ${filter.state}>
      <label class="trip-filters__filter-label" for="filter-${filter.type}">${filter.label}</label>
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
  #filterModel = null;
  #handleFilterChange = null;

  constructor({ filterModel, handleFilterChange }) {
    super();
    this.#filterModel = filterModel;
    this.#handleFilterChange = handleFilterChange;
    this.element.addEventListener('change', this.#onFilterChange);
  }

  get filters() {
    return this.#filterModel.filters;
  }

  get template() {
    return createTripsFiltersTemplate(this.filters);
  }

  #onFilterChange = () => {
    const selectedFilterType = this.element.querySelector('.trip-filters__filter-input:checked').value;
    this.#handleFilterChange(selectedFilterType);
  };
}
