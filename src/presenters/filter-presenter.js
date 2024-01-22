import { render, RenderPosition } from '../render';
import TripFilters from '../view/trip-filters';

export default class FilterPresenter {
  #tripFilters = new TripFilters();
  #renderPosition = RenderPosition.AFTERBEGIN;
  #container = null;

  constructor(container) {
    this.#container = container;
  }

  init() {
    render(this.#tripFilters, this.#container, this.#renderPosition);
  }
}
