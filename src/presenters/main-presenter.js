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
import { END_POINT, AUTHORIZATION } from '../const';

const headerMainBlock = document.querySelector('.trip-main');
const filtersBlock = document.querySelector('.trip-controls__filters');
const pointsBlock = document.querySelector('.trip-events');

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
const addButtonPresenter = new AddPointButtonPresenter(headerMainBlock);
const pointsListPresenter = new PointsListPresenter({ container: pointsBlock, destinationsModel, offersModel, pointsModel, sortsModel, filtersModel, addButtonPresenter });
const filterPresenter = new FilterPresenter({ container: filtersBlock, filtersModel, onFilterChange: pointsListPresenter.resetSort });

export default class MainPresenter {
  init() {
    headerPresenter.init();
    addButtonPresenter.init({ onButtonClick: pointsListPresenter.addEventButtonClickHandler });
    filterPresenter.init();
    pointsListPresenter.init();
    pointsModel.init();
  }
}
