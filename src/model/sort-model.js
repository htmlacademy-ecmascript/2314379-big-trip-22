import Observable from '../framework/observable';
import { SORT_VARIANTS } from '../const.js';

export default class SortsModel extends Observable {
  sorts = null;

  constructor() {
    super();
    this.sorts = SORT_VARIANTS;
  }

  get selectedSort() {
    return this.sorts.find((sort) => sort.state === 'checked');
  }

  selectSort(updateType, selectedSortType) {
    const prevSelectedSort = this.selectedSort;
    const currentSelectedSort = this.sorts.find((sort) => sort.type === selectedSortType);

    if (!prevSelectedSort || !currentSelectedSort) {
      throw new Error('Cant update unexisting sort');
    }

    this.sorts = this.sorts.reduce((acc, sort) => {
      if (sort.type === prevSelectedSort.type) {
        const updatedSort = {...sort, state: null};
        acc.push(updatedSort);
        return acc;
      }

      if (sort.type === currentSelectedSort.type) {
        const updatedSort = {...sort, state: 'checked'};
        acc.push(updatedSort);
        return acc;
      }

      acc.push(sort);
      return acc;
    }, []);

    this._notify(updateType, selectedSortType);
  }
}
