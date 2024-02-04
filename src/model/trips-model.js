import { getRandomArrayElement } from '../utils';
import Observable from '../framework/observable';

export default class TripsModel extends Observable {
  trips = null;

  constructor(service) {
    super();
    this.trips = service.trips;
  }

  getRandomTrip() {
    return getRandomArrayElement(this.trips);
  }

  updateTripById(id, updatedTrip) {
    this.trips = this.trips.map((trip) => trip.id === id ? updatedTrip : trip);
  }

  getTripById(id) {
    return this.trips.find((trip) => trip.id === id);
  }

  updateTrip(updateType, updatedTrip) {
    const tripIndex = this.trips.findIndex((trip) => trip.id === updatedTrip.id);

    if (tripIndex === -1) {
      throw new Error('Cant update unexisting trip');
    }

    this.trips = [
      ...this.trips.slice(0, tripIndex),
      updatedTrip,
      ...this.trips.slice(tripIndex + 1),
    ];

    this._notify(updateType, updatedTrip);
  }

  addTrip(updateType, newTrip) {
    this.trips = [
      newTrip,
      ...this.trips,
    ];

    this._notify(updateType, newTrip);
  }

  deleteTrip(updateType, deletedTrip) {
    const tripIndex = this.trips.findIndex((trip) => trip.id === deletedTrip.id);

    if (tripIndex === -1) {
      throw new Error('Cant delete unexisting trip');
    }

    this.trips = [
      ...this.trips.slice(0, tripIndex),
      ...this.trips.slice(tripIndex + 1),
    ];

    this._notify(updateType);
  }
}
