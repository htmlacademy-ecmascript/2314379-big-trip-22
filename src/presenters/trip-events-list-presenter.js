import { render } from '../render';
import TripEvent from '../view/trip-event';
import TripEventsList from '../view/trip-events-list';
import AddPointForm from '../view/add-point-form';
import EditPointForm from '../view/edit-point-form';

const EVENTS_COUNT = 3;

export default class TripEventsListPresenter {
  tripEventsList = new TripEventsList();
  addPointForm = new AddPointForm();
  editPointForm = new EditPointForm();

  constructor(container) {
    this.container = container;
  }

  init() {
    render(this.tripEventsList, this.container);
    render(this.editPointForm, this.tripEventsList.getElement());

    for (let i = 0; i < EVENTS_COUNT; i++) {
      render(new TripEvent(), this.tripEventsList.getElement());
    }
  }
}
