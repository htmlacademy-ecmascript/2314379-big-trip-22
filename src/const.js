const EVENT_TYPES = [
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
const MONTH_FORMAT = 'MMM';
const MONTH_DAY_FORMAT = 'D';
const HOURS_MINUTES_FORMAT = 'HH:mm';
const MINUTES_FORMAT = 'm';
const MINUTES_IN_HOUR = 60;

const MAIN_EVENT = {
  label: 'Amsterdam &mdash; Chamonix &mdash; Geneva',
  dates: '18&nbsp;&mdash;&nbsp;20 Mar',
  price: '1230',
  currency: 'euro',
};

const SORT_TYPES = {
  Day: 'day',
  Event: 'event',
  Time: 'time',
  Price: 'price',
  Offers: 'offers',
};

const SORT_VARIANTS = [
  {
    type: SORT_TYPES.Day,
    state: 'checked',
    label: 'Day',
  },
  {
    type: SORT_TYPES.Event,
    state: 'disabled',
    label: 'Event',
  },
  {
    type: SORT_TYPES.Time,
    state: null,
    label: 'Time',
  },
  {
    type: SORT_TYPES.Price,
    state: null,
    label: 'Price',
  },
  {
    type: SORT_TYPES.Offers,
    state: 'disabled',
    label: 'Offers',
  },
];

const FILTERS = {
  Everything: 'everything',
  Future: 'future',
  Present: 'present',
  Past: 'past',
};

const FILTER_VARIANTS = [
  {
    type: FILTERS.Everything,
    state: 'checked',
    label: 'Everything',
  },
  {
    type: FILTERS.Future,
    state: null,
    label: 'Future',
  },
  {
    type: FILTERS.Present,
    state: null,
    label: 'Present',
  },
  {
    type: FILTERS.Past,
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
  [FILTERS.Everything]: 'Click New Event to create your first point',
  [FILTERS.Future]: 'There are no future events now',
  [FILTERS.Present]: 'There are no present events now',
  [FILTERS.Past]: 'There are no past events now',
};

const TRIP_MODE = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export {
  EVENT_TYPES,
  FULL_DATE_FORMAT,
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
  TRIP_MODE,
  SORT_TYPES,
};
