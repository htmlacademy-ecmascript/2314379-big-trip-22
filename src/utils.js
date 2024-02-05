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

export function sortByDate(points) {
  const sortedPoints = points?.sort((PointA, PointB) => getDateDiff(PointA.dateFrom, PointB.dateFrom));
  return sortedPoints;
}

export function sortByPrice(points) {
  const sortedPoints = points?.sort((PointA, PointB) => Number(PointA.basePrice) - Number(PointB.basePrice));
  return sortedPoints;
}

export function sortByTime(points) {
  const sortedPoints = points?.sort((PointA, PointB) => getDateDiff(PointB.dateFrom, PointB.dateTo) - getDateDiff(PointA.dateFrom, PointA.dateTo));
  return sortedPoints;
}

export function sortPointsListByType(points, sortType) {
  const sortsMap = {
    [SORT_TYPES.DAY]: () => sortByDate(points),
    [SORT_TYPES.EVENT]: () => points,
    [SORT_TYPES.OFFERS]: () => points,
    [SORT_TYPES.PRICE]: () => sortByPrice(points),
    [SORT_TYPES.TIME]: () => sortByTime(points),
  };

  return sortsMap[sortType]();
}

export function getFuturePoints(points) {
  const futurePoints = points.filter((point) => dayjs().isBefore(point.dateFrom, 'day'));
  return futurePoints;
}

export function getPastPoints(points) {
  const futurePoints = points.filter((point) => dayjs().isAfter(point.dateTo, 'day'));
  return futurePoints;
}

export function getPresentPoints(points) {
  const futurePoints = points.filter((point) => dayjs().isAfter(point.dateFrom, 'day') && dayjs().isBefore(point.dateTo, 'day'));
  return futurePoints;
}

export function filterPoints(points, filterType) {
  const filterMap = {
    [FILTERS_TYPES.EVERYTHING]: () => points,
    [FILTERS_TYPES.FUTURE]: () => getFuturePoints(points),
    [FILTERS_TYPES.PAST]: () => getPastPoints(points),
    [FILTERS_TYPES.PRESENT]: () => getPresentPoints(points),
  };

  return filterMap[filterType]();
}

export function adaptToClient(point) {
  const adaptedPoint = {
    ...point,
    dateFrom: point['date_from'],
    dateTo: point['date_to'],
    basePrice: point['base_price'],
    isFavorite: point['is_favorite'],
  };

  delete adaptedPoint['date_from'];
  delete adaptedPoint['date_to'];
  delete adaptedPoint['base_price'];
  delete adaptedPoint['is_favorite'];

  return adaptedPoint;
}

export function adaptToServer(point) {
  const adaptedPoint = {
    ...point,
    ['date_from']: new Date(point.dateFrom).toISOString(),
    ['date_to']: new Date(point.dateTo).toISOString(),
    ['base_price']: parseInt(point.basePrice, 10),
    ['is_favorite']: point.isFavorite,
  };

  delete adaptedPoint.dateFrom;
  delete adaptedPoint.dateTo;
  delete adaptedPoint.basePrice;
  delete adaptedPoint.isFavorite;

  return adaptedPoint;
}

export function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}
