import { action, makeObservable, observable } from 'mobx'

interface JSONPaginatorInterface {
  count: number
  total: number
  perPage: number
  currentPage: number
  totalPages: number
}

class PaginatorStore {
  @observable public count = 0

  @observable public total = 0

  @observable public perPage = 10

  @observable public currentPage = 1

  @observable public totalPages = 1

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

    makeObservable(this)
  }

  @action
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
