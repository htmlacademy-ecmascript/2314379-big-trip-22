import HeaderPresenter from './presenters/header-presenter';
import FilterPresenter from './presenters/filter-presenter';
import SortPresenter from './presenters/sort-presenter';
import TripEventsListPresenter from './presenters/trip-events-list-presenter';
import MockService from './service/mock-service';
import TripsModel from './model/trips-model';
import OffersModel from './model/offers-model';
import DestinationsModel from './model/destinations-model';

const headerMainBlock = document.querySelector('.trip-main');
const filtersBlock = document.querySelector('.trip-controls__filters');
const tripEventsBlock = document.querySelector('.trip-events');
const mockService = new MockService();

const destinationsModel = new DestinationsModel(mockService);
const offersModel = new OffersModel(mockService);
const tripsModel = new TripsModel(mockService);

const headerPresenter = new HeaderPresenter(headerMainBlock);
const filterPresenter = new FilterPresenter(filtersBlock);
const sortPresenter = new SortPresenter(tripEventsBlock);
const tripEventsListPresenter = new TripEventsListPresenter({ container: tripEventsBlock, destinationsModel, offersModel, tripsModel });

headerPresenter.init();
filterPresenter.init();
if (tripsModel.trips.length > 0) {
  sortPresenter.init();
}
tripEventsListPresenter.init();
