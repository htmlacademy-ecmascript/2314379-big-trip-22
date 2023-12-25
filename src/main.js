import HeaderPresenter from './presenters/header-presenter';
import FilterPresenter from './presenters/filter-presenter';
import SortPresenter from './presenters/sort-presenter';
import TripEventsListPresenter from './presenters/trip-events-list-presenter';
import TripModel from './model/trip-model';
import EditPointModel from './model/edit-point-model';

const headerMainBlock = document.querySelector('.trip-main');
const filtersBlock = document.querySelector('.trip-controls__filters');
const tripEventsBlock = document.querySelector('.trip-events');

const tripModel = new TripModel();
const editPointModel = new EditPointModel();
const headerPresenter = new HeaderPresenter(headerMainBlock);
const filterPresenter = new FilterPresenter(filtersBlock);
const sortPresenter = new SortPresenter(tripEventsBlock);
const tripEventsListPresenter = new TripEventsListPresenter({ container: tripEventsBlock, tripModel, editPointModel });

headerPresenter.init();
filterPresenter.init();
sortPresenter.init();
tripEventsListPresenter.init();
