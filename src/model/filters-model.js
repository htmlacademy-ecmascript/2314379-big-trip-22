import Observable from '../framework/observable';
import { FILTER_VARIANTS } from '../const.js';

export default class FiltersModel extends Observable {
  filters = null;

  constructor() {
    super();
    this.filters = FILTER_VARIANTS;
  }

  get selectedFilter() {
    return this.filters.find((filter) => filter.state === 'checked');
  }

  selectFilter(updateType, selectedFilterType) {
    const prevSelectedFilter = this.selectedFilter;
    const currentSelectedFilter = this.filters.find((filter) => filter.type === selectedFilterType);

    if (!prevSelectedFilter || !currentSelectedFilter) {
      throw new Error('Cant update unexisting filter');
    }

    this.filters = this.filters.reduce((acc, filter) => {
      if (filter.type === prevSelectedFilter.type) {
        const updatedFilter = {...filter, state: null};
        acc.push(updatedFilter);
        return acc;
      }

      if (filter.type === currentSelectedFilter.type) {
        const updatedFilter = {...filter, state: 'checked'};
        acc.push(updatedFilter);
        return acc;
      }

      acc.push(filter);
      return acc;
    }, []);

    this._notify(updateType, selectedFilterType);
  }
}
