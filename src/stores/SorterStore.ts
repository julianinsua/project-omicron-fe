import { action, computed, makeObservable, observable } from 'mobx'

// eslint-disable-next-line no-shadow
enum SORT {
  ASC = 'ASC',
  DESC = 'DESC',
}

interface SorterInterface {
  sortField: string
  sortSense: SORT | ''
}

class SorterStore {
  @observable public sortField = ''

  @observable public sortSense: SORT | '' = SORT.ASC

  constructor(sortField: string, sortSense: SORT | '') {
    this.sortField = sortField
    this.sortSense = sortSense

    makeObservable(this)
  }

  @action
  public setSort(sortField: string, sortSense: SORT) {
    this.sortField = sortField
    this.sortSense = sortSense
  }

  @action
  public changeSortSense(sortField: string) {
    let sortSense = SORT.ASC

    if (sortField === this.sortField && this.sortSense === SORT.ASC) {
      sortSense = SORT.DESC
    }

    this.setSort(sortField, sortSense)
  }

  @computed
  public get isASC() {
    return this.sortSense === SORT.ASC
  }

  public static fromJson({ sortField, sortSense }: SorterInterface) {
    return new SorterStore(sortField, sortSense)
  }

  public static empty() {
    return new SorterStore('', '')
  }
}

export default SorterStore
