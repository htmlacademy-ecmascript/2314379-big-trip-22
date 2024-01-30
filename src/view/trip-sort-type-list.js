import AbstractView from '../framework/view/abstract-view.js';

function createTripSortTypeListTemplate() {
  return '<form class="trip-events__trip-sort  trip-sort" action="#" method="get"></form>';
}

export default class TripSortTypeList extends AbstractView {
  get template() {
    return createTripSortTypeListTemplate();
  }
}
