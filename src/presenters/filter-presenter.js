import { render, RenderPosition } from '../render';
import { remove } from '../framework/render.js';
import TripFilters from '../view/trip-filters';
import { UPDATE_TYPE } from '../const.js';

export default class FilterPresenter {
  #filterModel = null;
  #tripFilters = null;
  #renderPosition = RenderPosition.AFTERBEGIN;
  #container = null;

  constructor(container, filtersModel) {
    this.#container = container;
    this.#filterModel = filtersModel;

    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#tripFilters = new TripFilters({
      filterModel: this.#filterModel,
      handleFilterChange: this.#handleFilterChange,
    });
    render(this.#tripFilters, this.#container, this.#renderPosition);
  }

  #handleFilterChange = (selectedType) => {
    this.#filterModel.selectFilter(UPDATE_TYPE.MINOR, selectedType);
  };

  #handleModelEvent = () => {
    this.#removeTripFilters();
    this.init();
  };

  #removeTripFilters = () => {
    remove(this.#tripFilters);
  };
}
