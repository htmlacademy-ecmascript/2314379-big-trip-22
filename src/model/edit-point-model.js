import { getRandomTrip } from '../mock/trip-events';
import { mockDestinations } from '../mock/destinations';
import { mockOffers } from '../mock/offers';

export default class EditPointModel {

  // Собираем все необходимые данные для дальнейшей отрисовки
  get trip() {
    const trip = getRandomTrip();
    const destinationById = mockDestinations.find((destination) => destination.id === trip.destination);

    const tripWithAdditionalData = {...trip};
    tripWithAdditionalData.destination = destinationById;

    return tripWithAdditionalData;
  }

  get availableOffersByTripType() {
    return mockOffers.find((offer) => offer.type === this.trip.type).offers;
  }

  getTrip() {
    return this.trip;
  }

  getDestinations() {
    return mockDestinations;
  }

  getOffers() {
    return this.availableOffersByTripType;
  }
}
