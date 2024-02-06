export default class OffersModel {
  #service = null;
  #offers = [];

  constructor(service) {
    this.#service = service;
  }

  getOffers() {
    return this.#offers;
  }

  async init() {
    this.#offers = await this.#service.offers;
    return this.#offers;
  }
}
