import { render } from '../render';
import TripSort from '../view/trip-sort';

export default class SortPresenter {
  tripSort = new TripSort();

  constructor(container) {
    this.container = container;
  }

  init() {
    render(this.tripSort, this.container);
  }
}
