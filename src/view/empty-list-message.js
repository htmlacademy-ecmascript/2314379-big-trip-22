import AbstractView from '../framework/view/abstract-view.js';
import { EMPTY_LIST_MESSAGE_BY_FILTERS_MAP, FAILED_TO_LOAD_MESSAGE } from '../const.js';

function createEmptyListMessageTemplate(message) {
  return `<p class="trip-events__msg">${message}</p>`;
}

export default class EmptyListMessage extends AbstractView {
  #isLoadFailed = false;
  #selectedFilter = null;

  constructor({ isLoadFailed, selectedFilter }) {
    super();
    this.#isLoadFailed = isLoadFailed;
    this.#selectedFilter = selectedFilter;
  }

  get template() {
    const message = this.#isLoadFailed ? FAILED_TO_LOAD_MESSAGE : EMPTY_LIST_MESSAGE_BY_FILTERS_MAP[this.#selectedFilter];
    return createEmptyListMessageTemplate(message);
  }
}
