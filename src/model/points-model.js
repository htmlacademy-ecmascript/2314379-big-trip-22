import { adaptToClient, updateItem, adaptToServer } from '../utils';
import Observable from '../framework/observable';
import { UPDATE_TYPE } from '../const';

export default class PointsModel extends Observable {
  #service = null;
  #points = [];
  #destinationsModel = null;
  #offersModel = null;

  constructor({ service, destinationsModel, offersModel }) {
    super();
    this.#service = service;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }
  
  async init() {
    try {
      await Promise.all([this.#destinationsModel.init(), this.#offersModel.init()]);
      const points = await this.#service.points;
      this.#points = points.map(adaptToClient);
      this._notify(UPDATE_TYPE.INIT, {isError: false});
    } catch (error) {
      this.#points = [];
      this._notify(UPDATE_TYPE.INIT, {isError: true});
    }
  }

  get() {
    return this.#points;
  }

  getPointById(id) {
    return this.points.find((point) => point.id === id);
  }

  async updatePoint(updateType, point) {
    try {
      const updatedPoint = await this.#service.updatePoint(adaptToServer(point));
      const adaptedPoint = adaptToClient(updatedPoint);
      this.#points = updateItem(this.#points, adaptedPoint);
      this._notify(updateType, adaptedPoint);
    } catch (error) {
      console.log(error)
      throw new Error('Update point failure');
    }
  }

  async addPoint(updateType, newPoint) {
    try {
      const addedPoint = await this.#service.addPoint(adaptToServer(newPoint));
      const adaptedPoint = adaptToClient(addedPoint);
      this.#points.push(adaptedPoint);
      this._notify(updateType, adaptedPoint);
    } catch (error) {
      throw new Error('Add point failure');
    }
  }

  async deletePoint(updateType, deletedPoint) {
    try {
      await this.#service.deletePoint(deletedPoint);
      this.#points = this.#points.filter((item) => item.id !== point.id);
      this._notify(updateType, deletedPoint);
    } catch (error) {
      throw new Error('Delete point failure');
    }
  }
}
