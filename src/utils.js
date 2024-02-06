import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { SortType, SORT_VARIANTS, FilterType } from './const';

dayjs.extend(duration);

const getRandomArrayElement = (items) => {
  return items[Math.floor(Math.random() * items.length)];
};

const capitalizeFirstLetter = (word) => {
  const capitalizedLetter = word[0].toUpperCase();

  return capitalizedLetter + word.slice(1);
};

const humanizeDate = (date, format) => {
  return dayjs(date).format(format);
};

const getTimeRange = (dateFrom, dateTo) => {
  const diff = dayjs(dateTo).diff(dayjs(dateFrom));
  const eventTimeRange = dayjs.duration(diff);

  if (eventTimeRange.days()) {
    return eventTimeRange.format('DD[D] HH[H] mm[m]');
  }

  if (eventTimeRange.hours()) {
    return eventTimeRange.format('HH[H] mm[m]');
  }

  return eventTimeRange.format('mm[m]');
};

const getDefaultSortVariant = () => {
  return SORT_VARIANTS.find((variant) => variant.type === SortType.DAY);
};

const getIsSortVariantDisabled = (variantType) => {
  return SORT_VARIANTS.find((variant) => variant.type === variantType).state === 'disabled';
};

const getDateDiff = (firstDate, secondDate) => {
  return dayjs(firstDate).diff(dayjs(secondDate));
};

const sortByDate = (points) => {
  const sortedPoints = points?.sort((pointA, pointB) => getDateDiff(pointA.dateFrom, pointB.dateFrom));
  return sortedPoints;
};

const getFullPrice = (offers, basePrice) => {
  const fullPrice = offers.reduce((sum, offer) => {
    sum += Number(offer.price);

    return sum;
  }, Number(basePrice));

  return fullPrice;
};

const sortByPrice = (points, offers) => {
  const sortedPoints = points?.sort((pointA, pointB) => {
    const pointAOffers = offers.find((offer) => offer.type === pointA.type).offers;
    const pointASelectedOffers = pointAOffers.filter((offer) => pointA.offers.includes(offer.id));
    const pointAFullPrice = getFullPrice(pointASelectedOffers, pointA.basePrice);

    const pointBOffers = offers.find((offer) => offer.type === pointB.type).offers;
    const pointBSelectedOffers = pointBOffers.filter((offer) => pointB.offers.includes(offer.id));
    const pointBFullPrice = getFullPrice(pointBSelectedOffers, pointB.basePrice);

    return pointBFullPrice - pointAFullPrice;
  });

  return sortedPoints;
};

const sortByTime = (points) => {
  const sortedPoints = points?.sort((pointA, pointB) => getDateDiff(pointA.dateFrom, pointA.dateTo) - getDateDiff(pointB.dateFrom, pointB.dateTo));
  return sortedPoints;
};

const sortPointsListByType = (points, sortType, offers) => {
  const sortsMap = {
    [SortType.DAY]: () => sortByDate(points),
    [SortType.EVENT]: () => points,
    [SortType.OFFERS]: () => points,
    [SortType.PRICE]: () => sortByPrice(points, offers),
    [SortType.TIME]: () => sortByTime(points),
  };

  return sortsMap[sortType]();
};

const getFuturePoints = (points) => {
  const futurePoints = points.filter((point) => dayjs().isBefore(point.dateFrom, 'day'));
  return futurePoints;
};

const getPastPoints = (points) => {
  const futurePoints = points.filter((point) => dayjs().isAfter(point.dateTo, 'day'));
  return futurePoints;
};

const getPresentPoints = (points) => {
  const futurePoints = points.filter((point) => dayjs().isAfter(point.dateFrom, 'day') && dayjs().isBefore(point.dateTo, 'day'));
  return futurePoints;
};

const filterPoints = (points, filterType) => {
  const filterMap = {
    [FilterType.EVERYTHING]: () => points,
    [FilterType.FUTURE]: () => getFuturePoints(points),
    [FilterType.PAST]: () => getPastPoints(points),
    [FilterType.PRESENT]: () => getPresentPoints(points),
  };

  return filterMap[filterType]();
};

const adaptToClient = (point) => {
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
};

const adaptToServer = (point) => {
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
};

const updateItem = (items, update) => {
  return items.map((item) => item.id === update.id ? update : item);
};

export {
  getRandomArrayElement,
  capitalizeFirstLetter,
  humanizeDate,
  getTimeRange,
  getDefaultSortVariant,
  getIsSortVariantDisabled,
  sortPointsListByType,
  filterPoints,
  adaptToClient,
  adaptToServer,
  updateItem,
};
