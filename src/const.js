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

const FULL_DATE_FORMAT = 'YYYY-MM-DD HH:MM';
const DATEPICKER_DATE_FORMAT = 'd/m/y H:i';
const MONTH_FORMAT = 'MMM';
const MONTH_DAY_FORMAT = 'D';
const HOURS_MINUTES_FORMAT = 'HH:mm';
const MINUTES_FORMAT = 'm';
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;

const MAIN_EVENT = {
  LABEL: 'Amsterdam &mdash; Chamonix &mdash; Geneva',
  DATES: '18&nbsp;&mdash;&nbsp;20 Mar',
  PRICE: '1230',
  CURRENCY: 'euro',
};

const SORT_TYPES = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

const SORT_VARIANTS = [
  {
    type: SORT_TYPES.DAY,
    state: 'checked',
    label: 'Day',
  },
  {
    type: SORT_TYPES.EVENT,
    state: 'disabled',
    label: 'Event',
  },
  {
    type: SORT_TYPES.TIME,
    state: null,
    label: 'Time',
  },
  {
    type: SORT_TYPES.PRICE,
    state: null,
    label: 'Price',
  },
  {
    type: SORT_TYPES.OFFERS,
    state: 'disabled',
    label: 'Offers',
  },
];

const FILTERS_TYPES = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const FILTER_VARIANTS = [
  {
    type: FILTERS_TYPES.EVERYTHING,
    state: 'checked',
    label: 'Everything',
  },
  {
    type: FILTERS_TYPES.FUTURE,
    state: null,
    label: 'Future',
  },
  {
    type: FILTERS_TYPES.PRESENT,
    state: null,
    label: 'Present',
  },
  {
    type: FILTERS_TYPES.PAST,
    state: null,
    label: 'Past',
  },
];

const OFFER_VARIANTS = [
  {
    type: 'luggage',
    price: '30',
    label: 'Add luggage',
    state: 'checked',
  },
  {
    type: 'comfort',
    price: '100',
    label: 'Switch to comfort class',
    state: 'checked',
  },
  {
    type: 'meal',
    price: '15',
    label: 'Add meal',
    state: null,
  },
  {
    type: 'seats',
    price: '5',
    label: 'Choose seats',
    state: null,
  },
  {
    type: 'train',
    price: '40',
    label: 'Travel by train',
    state: null,
  },
];

const EMPTY_LIST_MESSAGE_BY_FILTERS_MAP = {
  [FILTERS_TYPES.EVERYTHING]: 'Click New Event to create your first point',
  [FILTERS_TYPES.FUTURE]: 'There are no future events now',
  [FILTERS_TYPES.PRESENT]: 'There are no present events now',
  [FILTERS_TYPES.PAST]: 'There are no past events now',
};

const POINT_MODE = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const UPDATE_TYPE = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const ACTION_TYPE = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const METHOD = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const SOURCE_URL = {
  POINTS: 'points',
  OFFERS: 'offers',
  DESTINATIONS: 'destinations',
};

const TIME_LIMIT = {
  LOWER_LIMIT: 300,
  UPPER_LIMIT: 1000,
};

const AUTHORIZATION = 'Basic fjgndfkkzn54kkl6m6';
const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';

export {
  POINT_TYPES,
  FULL_DATE_FORMAT,
  DATEPICKER_DATE_FORMAT,
  HOURS_MINUTES_FORMAT,
  MINUTES_FORMAT,
  MINUTES_IN_HOUR,
  MONTH_DAY_FORMAT,
  MONTH_FORMAT,
  MAIN_EVENT,
  SORT_VARIANTS,
  FILTER_VARIANTS,
  OFFER_VARIANTS,
  EMPTY_LIST_MESSAGE_BY_FILTERS_MAP,
  POINT_MODE,
  FILTERS_TYPES,
  SORT_TYPES,
  UPDATE_TYPE,
  ACTION_TYPE,
  METHOD,
  SOURCE_URL,
  TIME_LIMIT,
  AUTHORIZATION,
  END_POINT,
  HOURS_IN_DAY,
};
