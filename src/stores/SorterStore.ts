import { action, computed, makeObservable, observable } from 'mobx'

enum SORT {
  ASC = 'ASC',
  DESC = 'DESC',
}

interface SorterInterface {
  sortField: string
  sortSense: SORT | ''
}

class SorterStore {
  public sortField: string = ''
  public sortSense: SORT | '' = SORT.ASC

  constructor(sortField: string, sortSense: SORT | '') {
    makeObservable<SorterStore, any>(this, {
      // observables
      sortField: observable,
      sortSense: observable,
      // actions
      setSort: action,
      changeSortSense: action,
      // computeds
      isASC: computed,
    })

    this.sortField = sortField
    this.sortSense = sortSense
  }

  public setSort(sortField: string, sortSense: SORT) {
    this.sortField = sortField
    this.sortSense = sortSense
  }

  public changeSortSense(sortField: string) {
    let sortSense = SORT.ASC

    if (sortField === this.sortField && this.sortSense === SORT.ASC) {
      sortSense = SORT.DESC
    }

    this.setSort(sortField, sortSense)
  }

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
