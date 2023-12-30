import { getRandomArrayElement } from '../utils';

export default class TripsModel {
  constructor(service) {
    this.trips = service.trips;
  }

  getRandomTrip() {
    return getRandomArrayElement(this.trips);
  }
}
