import AbstractView from '../framework/view/abstract-view.js';
import { FILTER_VARIANTS, EMPTY_LIST_MESSAGE_BY_FILTERS_MAP } from '../const.js';

function createEmptyListMessageTemplate(message) {
  return `<p class="trip-events__msg">${message}</p>`;
}

export default class EmptyListMessage extends AbstractView {
  get template() {
    const checkedFilter = FILTER_VARIANTS.find(filter => filter.state === 'checked');
    const message = EMPTY_LIST_MESSAGE_BY_FILTERS_MAP[checkedFilter.type];
    return createEmptyListMessageTemplate(message);
  }
}
