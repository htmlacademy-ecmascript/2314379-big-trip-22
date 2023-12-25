import { render } from '../render';
import TripEvent from '../view/trip-event';
import TripEventsList from '../view/trip-events-list';
import AddPointForm from '../view/add-point-form';
import EditPointForm from '../view/edit-point-form';

export default class TripEventsListPresenter {
  tripEventsList = new TripEventsList();
  addPointForm = new AddPointForm();

  constructor({ container, tripModel, editPointModel }) {
    this.container = container;
    this.tripModel = tripModel;
    this.editPointModel = editPointModel;
  }

  init() {
    const tripsList = [...this.tripModel.getTrips()];
    const editingTrip = {...this.editPointModel.getTrip()};
    const destinations = [...this.editPointModel.getDestinations()];
    const offers = [...this.editPointModel.getOffers()];

    render(this.tripEventsList, this.container);
    render(new EditPointForm({ editingTrip, destinations, offers }), this.tripEventsList.getElement());

    for (let i = 0; i < tripsList.length; i++) {
      const trip = tripsList[i];
      render(new TripEvent({ trip }), this.tripEventsList.getElement());
    }
  }
}
