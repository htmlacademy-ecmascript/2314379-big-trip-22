export default class OffersModel {
  #service = null;
  #offers = [];

  constructor(service) {
    this.#service = service;
  }

  get() {
    return this.#offers;
  }

  async init() {
    this.#offers = await this.#service.offers;
    return this.#offers;
  }

  getOffersByType(type) {
    return this.#offers.find((offer) => offer.type === type).offers;
  }
}
