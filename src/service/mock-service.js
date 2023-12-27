import { mockDestinations } from '../mock/destinations';
import { mockOffers } from '../mock/offers';
import { getRandomTrip } from '../mock/trips';
import { TRIP_COUNT } from '../const';

export default class MockService {
  destinations = [];
  offers = [];
  trips = [];

  constructor() {
    this.destinations = mockDestinations;
    this.offers = mockOffers;
    this.trips = this.getRandomTrips();
  }

  getRandomTrips() {
    const trips = Array.from({ length: TRIP_COUNT }, getRandomTrip);
    const destinationsByIdMap = this.destinations.reduce((acc, destination) => {
      acc[destination.id] = destination;
      return acc;
    }, {});

    const offersByTypeMap = this.offers.reduce((acc, offer) => {
      acc[offer.type] = [...offer.offers];
      return acc;
    }, {});

    const tripsWithAdditionalData = trips.reduce((acc, trip) => {
      const tripWithAdditionalData = {...trip};
      const destinationId = trip.destination;

      tripWithAdditionalData.destination = destinationsByIdMap[destinationId];
      tripWithAdditionalData.offers = offersByTypeMap[trip.type].filter((offer) => trip.offers.includes(offer.id));

      acc.push(tripWithAdditionalData);
      return acc;
    }, []);

    return tripsWithAdditionalData;
  }
}
