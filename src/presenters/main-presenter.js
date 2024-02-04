import HeaderPresenter from './header-presenter';
import FilterPresenter from './filter-presenter';
import TripEventsListPresenter from './trip-events-list-presenter';
import AddEventButtonPresenter from './add-event-button-presenter';
import MockService from '../service/mock-service';
import TripsModel from '../model/trips-model';
import FiltersModel from '../model/filters-model';
import SortsModel from '../model/sort-model';
import OffersModel from '../model/offers-model';
import DestinationsModel from '../model/destinations-model';

const headerMainBlock = document.querySelector('.trip-main');
const filtersBlock = document.querySelector('.trip-controls__filters');
const tripEventsBlock = document.querySelector('.trip-events');
const mockService = new MockService();

const destinationsModel = new DestinationsModel(mockService);
const offersModel = new OffersModel(mockService);
const tripsModel = new TripsModel(mockService);
const filtersModel = new FiltersModel();
const sortsModel = new SortsModel();

const headerPresenter = new HeaderPresenter(headerMainBlock);
const filterPresenter = new FilterPresenter(filtersBlock, filtersModel);
const addButtonPresenter = new AddEventButtonPresenter(headerMainBlock);
const tripEventsListPresenter = new TripEventsListPresenter({ container: tripEventsBlock, destinationsModel, offersModel, tripsModel, sortsModel, filtersModel, addButtonPresenter });


export default class MainPresenter {
  init() {
    headerPresenter.init();
    addButtonPresenter.init({ onButtonClick: tripEventsListPresenter.handleAddEventButtonClick });
    filterPresenter.init();
    tripEventsListPresenter.init();
  }
}
