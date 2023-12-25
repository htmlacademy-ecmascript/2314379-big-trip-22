import { getRandomTrip } from '../mock/trip-events';
import { mockDestinations } from '../mock/destinations';
import { mockOffers } from '../mock/offers';

const TRIP_COUNT = 4;

export default class TripModel {

  // Собираем все необходимые данные для дальнейшей отрисовки
  get trips() {
    const trips = Array.from({ length: TRIP_COUNT }, getRandomTrip);
    const destinationsByIdMap = mockDestinations.reduce((acc, destination) => {
      acc[destination.id] = destination;
      return acc;
    }, {});

    const offersByTypeMap = mockOffers.reduce((acc, offer) => {
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

  getTrips() {
    return this.trips;
  }
}
