import dayjs from 'dayjs';
import { MINUTES_IN_HOUR, MINUTES_FORMAT, SORT_TYPES, SORT_VARIANTS, FILTERS_TYPES } from './const';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function capitalizeFirstLetter(word) {
  const capitalizedLetter = word[0].toUpperCase();

  return capitalizedLetter + word.slice(1);
}

function humanizeDate(date, format) {
  return dayjs(date).format(format);
}

function getTimeRange(dateFrom, dateTo) {
  const rangeInMinutes = dayjs(dateTo).diff(dateFrom, MINUTES_FORMAT);

  if (rangeInMinutes < MINUTES_IN_HOUR) {
    return `${rangeInMinutes}M`;
  }

  const hoursInRange = Math.floor(rangeInMinutes / MINUTES_IN_HOUR);
  const remainingMinutes = rangeInMinutes - hoursInRange * MINUTES_IN_HOUR;

  if (!remainingMinutes) {
    return `${hoursInRange}H`;
  }

  return `${hoursInRange}H ${remainingMinutes}M`;
}

export { getRandomArrayElement, capitalizeFirstLetter, humanizeDate, getTimeRange };

export function getCheckedSortVariant() {
  return SORT_VARIANTS.find((variant) => variant.state === 'checked');
}

export function isSortVariantDisabled(variantType) {
  return SORT_VARIANTS.find((variant) => variant.type === variantType).state === 'disabled';
}

function getDateDiff(firstDate, secondDate) {
  return dayjs(firstDate).diff(dayjs(secondDate));
}

export function sortByDate(trips) {
  const sortedTrips = trips.sort((TripA, TripB) => getDateDiff(TripA.dateFrom, TripB.dateFrom));
  return sortedTrips;
}

export function sortByPrice(trips) {
  const sortedTrips = trips.sort((TripA, TripB) => Number(TripA.basePrice) - Number(TripB.basePrice));
  return sortedTrips;
}

export function sortByTime(trips) {
  const sortedTrips = trips.sort((TripA, TripB) => getDateDiff(TripB.dateFrom, TripB.dateTo) - getDateDiff(TripA.dateFrom, TripA.dateTo));
  return sortedTrips;
}

export function sortTripsListByType(trips, sortType) {
  const sortsMap = {
    [SORT_TYPES.Day]: () => sortByDate(trips),
    [SORT_TYPES.Event]: () => trips,
    [SORT_TYPES.Offers]: () => trips,
    [SORT_TYPES.Price]: () => sortByPrice(trips),
    [SORT_TYPES.Time]: () => sortByTime(trips),
  };

  return sortsMap[sortType]();
}

export function getFutureTrips(trips) {
  const futureTrips = trips.filter((trip) => dayjs().isBefore(trip.dateFrom, 'day'));
  return futureTrips;
}

export function getPastTrips(trips) {
  const futureTrips = trips.filter((trip) => dayjs().isAfter(trip.dateTo, 'day'));
  return futureTrips;
}

export function getPresentTrips(trips) {
  const futureTrips = trips.filter((trip) => dayjs().isAfter(trip.dateFrom, 'day') && dayjs().isBefore(trip.dateTo, 'day'));
  return futureTrips;
}

export function filterTrips(trips, filterType) {
  const filterMap = {
    [FILTERS_TYPES.Everything]: () => trips,
    [FILTERS_TYPES.Future]: () => getFutureTrips(trips),
    [FILTERS_TYPES.Past]: () => getPastTrips(trips),
    [FILTERS_TYPES.Present]: () => getPresentTrips(trips),
  };

  return filterMap[filterType]();
}
