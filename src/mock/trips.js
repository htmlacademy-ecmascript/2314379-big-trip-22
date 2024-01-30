import { getRandomArrayElement } from '../utils.js';
import { EVENT_TYPES } from '../const.js';

const mockTripEvents = [
  {
    id: '1',
    type: getRandomArrayElement(EVENT_TYPES),
    destination: '3',
    dateFrom: '2023-04-04T20:00:00.845Z',
    dateTo: '2023-04-04T23:30:00.845Z',
    basePrice: '1000',
    isFavorite: true,
    offers: ['1'],
  },
  {
    id: '2',
    type: getRandomArrayElement(EVENT_TYPES),
    destination: '3',
    dateFrom: '2023-04-05T03:00:00.845Z',
    dateTo: '2023-04-05T03:30:00.845Z',
    basePrice: '700',
    isFavorite: true,
    offers: ['1', '2'],
  },
  {
    id: '3',
    type: getRandomArrayElement(EVENT_TYPES),
    destination: '3',
    dateFrom: '2023-04-10T13:00:00.845Z',
    dateTo: '2023-04-10T13:30:00.845Z',
    basePrice: '200',
    isFavorite: false,
    offers: ['2'],
  },
  {
    id: '4',
    type: getRandomArrayElement(EVENT_TYPES),
    destination: '3',
    dateFrom: '2023-04-20T20:00:00.845Z',
    dateTo: '2023-04-20T22:00:00.845Z',
    basePrice: '300',
    isFavorite: true,
    offers: ['1', '3'],
  },
];

export { mockTripEvents };
