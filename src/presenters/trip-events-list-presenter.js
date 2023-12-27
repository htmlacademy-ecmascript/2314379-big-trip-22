import { render } from '../render';
import TripEvent from '../view/trip-event';
import TripEventsList from '../view/trip-events-list';
import AddPointForm from '../view/add-point-form';
import EditPointForm from '../view/edit-point-form';

export default class TripEventsListPresenter {
  tripEventsList = new TripEventsList();
  addPointForm = new AddPointForm();

  constructor({ container, destinationsModel, offersModel, tripsModel }) {
    this.container = container;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
    this.tripsModel = tripsModel;
  }

  init() {
    const tripsList = this.tripsModel.trips;
    const editingTrip = this.tripsModel.getRandomTrip();
    const destinations = this.destinationsModel.destinations;
    const offers = this.offersModel.getOffersByType(editingTrip.type);

    render(this.tripEventsList, this.container);
    render(new EditPointForm({ editingTrip, destinations, offers }), this.tripEventsList.getElement());

    for (let i = 0; i < tripsList.length; i++) {
      const trip = tripsList[i];
      render(new TripEvent({ trip }), this.tripEventsList.getElement());
    }
  }
}
