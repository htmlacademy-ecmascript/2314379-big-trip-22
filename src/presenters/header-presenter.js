import { render, RenderPosition } from '../render';
import TripInfo from '../view/trip-info';

export default class HeaderPresenter {
  tripInfo = new TripInfo();
  renderPosition = RenderPosition.AFTERBEGIN;

  constructor(container) {
    this.container = container;
  }

  init() {
    render(this.tripInfo, this.container, this.renderPosition);
  }
}
