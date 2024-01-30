import { render } from '../render';
import TripSortType from '../view/trip-sort-type';

export default class TripSortTypePresenter {
  #container = null;
  #tripSortTypeComponent = null;
  #sortTypeData = null;
  #onSortTypeChange = null;

  constructor({ container, sortTypeData, onSortTypeChange }) {
    this.#container = container;
    this.#sortTypeData = sortTypeData;
    this.#onSortTypeChange = onSortTypeChange;
  }

  init() {
    this.#tripSortTypeComponent = new TripSortType({
      container: this.#container,
      sortTypeData: this.#sortTypeData,
      onSortTypeClick: this.#handleSortTypeClick,
    });
    render(this.#tripSortTypeComponent, this.#container);
  }

  #handleSortTypeClick = () => {
    this.#onSortTypeChange(this.#sortTypeData.type)
  }
}
