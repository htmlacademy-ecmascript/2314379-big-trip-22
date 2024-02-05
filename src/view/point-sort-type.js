import AbstractView from '../framework/view/abstract-view.js';

function createEventSortTypeTemplate(sortTypeData) {
  const sortItem = `
    <div class="trip-sort__item  trip-sort__item--${sortTypeData.type}">
      <input id="sort-${sortTypeData.type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${sortTypeData.type}" ${sortTypeData.state}>
      <label class="trip-sort__btn" for="sort-${sortTypeData.type}">${sortTypeData.label}</label>
    </div>
  `;

  return sortItem;
}

export default class PointSortType extends AbstractView {
  #sortTypeData = null;

  constructor({ sortTypeData, onSortTypeClick }) {
    super();
    this.#sortTypeData = sortTypeData;
    this.element.addEventListener('click', onSortTypeClick);
  }

  get template() {
    return createEventSortTypeTemplate(this.#sortTypeData);
  }
}
