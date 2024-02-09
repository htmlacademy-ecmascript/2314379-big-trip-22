import AbstractView from '../framework/view/abstract-view.js';
import { FILTER_VARIANTS, EMPTY_LIST_MESSAGE_BY_FILTERS_MAP, FAILED_TO_LOAD_MESSAGE } from '../const.js';

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
    const checkedFilter = FILTER_VARIANTS.find((filter) => filter.state === 'checked');
    const message = this.#isLoadFailed ? FAILED_TO_LOAD_MESSAGE : EMPTY_LIST_MESSAGE_BY_FILTERS_MAP[checkedFilter.type];
    return createEmptyListMessageTemplate(message);
  }
}
