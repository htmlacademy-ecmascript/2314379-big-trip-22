import { getRandomArrayElement } from '../utils';

export default class TripsModel {
  constructor(service) {
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
}
