import AbstractView from '../framework/view/abstract-view.js';

function createTripSortTypeTemplate(sortTypeData) {
  const sortType = `
    <div class="trip-sort__item  trip-sort__item--${sortTypeData.type}">
      <input id="sort-${sortTypeData.type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sortTypeData.type}" ${sortTypeData.state}>
      <label class="trip-sort__btn" for="sort-${sortTypeData.type}">${sortTypeData.label}</label>
    </div>
  `;

  return sortType;
}

export default class TripSortType extends AbstractView {
  #sortTypeData = null;
  #onSortTypeClick = null;

  constructor({ sortTypeData, onSortTypeClick }) {
    super();
    this.#sortTypeData = sortTypeData;
    this.#onSortTypeClick = onSortTypeClick;
    this.element.querySelector('.trip-sort__btn').addEventListener('click', this.#onSortTypeClick);
  }

  get template() {
    return createTripSortTypeTemplate(this.#sortTypeData);
  }
}
