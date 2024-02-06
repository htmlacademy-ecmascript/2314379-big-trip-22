import { render, RenderPosition } from '../render';
import { remove } from '../framework/render.js';
import PointFilters from '../view/point-filters';
import { UpdateType } from '../const.js';

export default class FilterPresenter {
  #filterModel = null;
  #pointFilters = null;
  #renderPosition = RenderPosition.AFTERBEGIN;
  #container = null;
  #onFilterChange = null;

  constructor({ container, filtersModel, onFilterChange }) {
    this.#container = container;
    this.#filterModel = filtersModel;
    this.#onFilterChange = onFilterChange;

    this.#filterModel.addObserver(this.#modelEventHandler);
  }

  init() {
    this.#pointFilters = new PointFilters({
      filterModel: this.#filterModel,
      onFilterChange: this.#filterChangeHandler,
    });
    render(this.#pointFilters, this.#container, this.#renderPosition);
  }

  #filterChangeHandler = (selectedType) => {
    this.#filterModel.selectFilter(UpdateType.MINOR, selectedType);
    this.#onFilterChange();
  };

  #modelEventHandler = () => {
    this.#removePointFilters();
    this.init();
  };

  #removePointFilters = () => {
    remove(this.#pointFilters);
  };
}
