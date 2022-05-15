import { action, makeObservable, observable } from 'mobx'

interface JSONPaginatorInterface {
  count: number
  total: number
  perPage: number
  currentPage: number
  totalPages: number
}

class PaginatorStore {
  count = 0

  total = 0

  perPage = 10

  currentPage = 1

  totalPages = 1

  constructor(
    count: number,
    total: number,
    perPage: number,
    currentPage: number,
    totalPages: number
  ) {
    this.count = count
    this.total = total
    this.perPage = perPage
    this.currentPage = currentPage
    this.totalPages = totalPages

    makeObservable<PaginatorStore, any>(this, {
      // observables
      count: observable,
      total: observable,
      perPage: observable,
      currentPage: observable,
      totalPages: observable,
      // actions
      setCurrentPage: action,
    })
  }

  public setCurrentPage(currentPage: number) {
    this.currentPage = currentPage
  }

  public static fromJson({
    count,
    total,
    perPage,
    currentPage,
    totalPages,
  }: JSONPaginatorInterface) {
    return new PaginatorStore(count, total, perPage, currentPage, totalPages)
  }
}

export default PaginatorStore
