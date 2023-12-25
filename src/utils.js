import dayjs from 'dayjs';
import { MINUTES_IN_HOUR, MINUTES_FORMAT } from './const';

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
