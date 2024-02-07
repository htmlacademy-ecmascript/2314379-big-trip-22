const POINT_TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

const DateFormat = {
  FULL_DATE_FORMAT: 'YYYY-MM-DD HH:MM',
  DATEPICKER_DATE_FORMAT: 'd/m/y H:i',
  MONTH_FORMAT: 'MMM',
  MONTH_DAY_FORMAT: 'D',
  HOURS_MINUTES_FORMAT: 'HH:mm',
};

const MAIN_EVENT = {
  LABEL: 'Amsterdam &mdash; Chamonix &mdash; Geneva',
  DATES: '18&nbsp;&mdash;&nbsp;20 Mar',
  PRICE: '1230',
  CURRENCY: 'euro',
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

const SORT_VARIANTS = [
  {
    type: SortType.DAY,
    state: 'checked',
    label: 'Day',
  },
  {
    type: SortType.EVENT,
    state: 'disabled',
    label: 'Event',
  },
  {
    type: SortType.TIME,
    state: null,
    label: 'Time',
  },
  {
    type: SortType.PRICE,
    state: null,
    label: 'Price',
  },
  {
    type: SortType.OFFERS,
    state: 'disabled',
    label: 'Offers',
  },
];

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const FILTER_VARIANTS = [
  {
    type: FilterType.EVERYTHING,
    state: 'checked',
    label: 'Everything',
  },
  {
    type: FilterType.FUTURE,
    state: null,
    label: 'Future',
  },
  {
    type: FilterType.PRESENT,
    state: null,
    label: 'Present',
  },
  {
    type: FilterType.PAST,
    state: null,
    label: 'Past',
  },
];

const EMPTY_LIST_MESSAGE_BY_FILTERS_MAP = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.PAST]: 'There are no past events now',
};

const PointMode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const ActionType = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const SourceUrl = {
  POINTS: 'points',
  OFFERS: 'offers',
  DESTINATIONS: 'destinations',
};

const TimeLimit = {
  LOWER_LIMIT: 300,
  UPPER_LIMIT: 1000,
};

const EditType = {
  EDITING: 'EDITING',
  CREATING: 'CREATING',
};

const AUTHORIZATION = 'Basic fjgndfkkzn54kkl6m6';
const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';

export {
  DateFormat,
  POINT_TYPES,
  MAIN_EVENT,
  SORT_VARIANTS,
  FILTER_VARIANTS,
  EMPTY_LIST_MESSAGE_BY_FILTERS_MAP,
  PointMode,
  FilterType,
  SortType,
  UpdateType,
  ActionType,
  Method,
  SourceUrl,
  TimeLimit,
  AUTHORIZATION,
  END_POINT,
  EditType,
};
