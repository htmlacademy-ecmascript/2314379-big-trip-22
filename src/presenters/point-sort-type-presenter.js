import { render } from '../render';
import PointSortType from '../view/point-sort-type';

export default class PointSortTypePresenter {
  #container = null;
  #pointSortTypeComponent = null;
  #onSortTypeChange = null;
  #sortTypeData = null;

  constructor({ container, sortTypeData, onSortTypeChange }) {
    this.#container = container;
    this.#sortTypeData = sortTypeData;
    this.#onSortTypeChange = onSortTypeChange;
  }

  init() {
    this.#pointSortTypeComponent = new PointSortType({
      sortTypeData: this.#sortTypeData,
      onSortTypeClick: this.#sortTypeClickHandler,
    });

    render(this.#pointSortTypeComponent, this.#container);
  }

  #sortTypeClickHandler = () => {
    this.#onSortTypeChange(this.#sortTypeData.type);
  };
}
