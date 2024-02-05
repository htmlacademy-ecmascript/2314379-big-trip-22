import HeaderPresenter from './header-presenter';
import FilterPresenter from './filter-presenter';
import PointsListPresenter from './points-list-presenter';
import AddPointButtonPresenter from './add-point-button-presenter';
import PointsApiService from '../service/point-api-service';
import PointsModel from '../model/points-model';
import FiltersModel from '../model/filters-model';
import SortsModel from '../model/sort-model';
import OffersModel from '../model/offers-model';
import DestinationsModel from '../model/destinations-model';

const headerMainBlock = document.querySelector('.trip-main');
const filtersBlock = document.querySelector('.trip-controls__filters');
const pointsBlock = document.querySelector('.trip-events');

const AUTHORIZATION = 'Basic fjgndfkkzn54kkl6m6';
const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';
const pointApiService = new PointsApiService(END_POINT, AUTHORIZATION);

const destinationsModel = new DestinationsModel(pointApiService);
const offersModel = new OffersModel(pointApiService);
const pointsModel = new PointsModel({
  service: pointApiService,
  destinationsModel,
  offersModel,
});
const filtersModel = new FiltersModel();
const sortsModel = new SortsModel();

const headerPresenter = new HeaderPresenter(headerMainBlock);
const filterPresenter = new FilterPresenter(filtersBlock, filtersModel);
const addButtonPresenter = new AddPointButtonPresenter(headerMainBlock);
const pointsListPresenter = new PointsListPresenter({ container: pointsBlock, destinationsModel, offersModel, pointsModel, sortsModel, filtersModel, addButtonPresenter });


export default class MainPresenter {
  init() {
    headerPresenter.init();
    addButtonPresenter.init({ onButtonClick: pointsListPresenter.handleAddEventButtonClick });
    filterPresenter.init();
    pointsListPresenter.init();
    pointsModel.init();
  }
}
