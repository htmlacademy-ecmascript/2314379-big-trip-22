import AbstractView from '../framework/view/abstract-view.js';

function createPointsFiltersTemplate(filters) {
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

export default class PointFilters extends AbstractView {
  #filterModel = null;
  #onFilterChange = null;

  constructor({ filterModel, onFilterChange }) {
    super();
    this.#filterModel = filterModel;
    this.#onFilterChange = onFilterChange;
    this.element.addEventListener('change', this.#filterChangeHandler);
  }

  get filters() {
    return this.#filterModel.filters;
  }

  get template() {
    return createPointsFiltersTemplate(this.filters);
  }

  #filterChangeHandler = () => {
    const selectedFilterType = this.element.querySelector('.trip-filters__filter-input:checked').value;
    this.#onFilterChange(selectedFilterType);
  };
}
