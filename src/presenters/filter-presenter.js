import { render, RenderPosition } from '../render';
import { remove } from '../framework/render.js';
import PointFilters from '../view/point-filters';
import { UPDATE_TYPE } from '../const.js';

export default class FilterPresenter {
  #filterModel = null;
  #pointFilters = null;
  #renderPosition = RenderPosition.AFTERBEGIN;
  #container = null;

  constructor(container, filtersModel) {
    this.#container = container;
    this.#filterModel = filtersModel;

    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#pointFilters = new PointFilters({
      filterModel: this.#filterModel,
      onFilterChange: this.#filterChangeHandler,
    });
    render(this.#pointFilters, this.#container, this.#renderPosition);
  }

  #filterChangeHandler = (selectedType) => {
    this.#filterModel.selectFilter(UPDATE_TYPE.MINOR, selectedType);
  };

  #handleModelEvent = () => {
    this.#removePointFilters();
    this.init();
  };

  #removePointFilters = () => {
    remove(this.#pointFilters);
  };
}
