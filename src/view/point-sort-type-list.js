import AbstractView from '../framework/view/abstract-view.js';

function createPointSortTypeListTemplate() {
  return '<form class="trip-trip-sort  trip-sort" action="#" method="get"></form>';
}

export default class PointSortTypeList extends AbstractView {
  get template() {
    return createPointSortTypeListTemplate();
  }
}
