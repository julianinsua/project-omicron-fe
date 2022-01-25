import { action, makeObservable, observable } from 'mobx'

class AsyncStore {
  isLoading = true
  private errors: Array<any> = []
  private serverError = false
  private tryAgainRequest: Function | null = null

  constructor() {
    this.isLoading = true
    makeObservable<AsyncStore, any>(this, {
      // Observables
      isLoading: observable,
      errors: observable,
      serverError: observable,
      // Actions
      preRequest: action,
      onSuccessRequest: action,

      // Computed
    })
  }

  protected preRequest(request: Function | null = null) {
    this.isLoading = true
    this.errors = []
    this.requestProcess(request)
  }

  private requestProcess(request: Function | null) {
    this.clearError()
    this.tryAgainRequest = request
  }

  private clearError() {
    this.serverError = false
  }

  protected tryAgain() {
    if (this.tryAgainRequest) {
      this.tryAgainRequest()
    }
    return null
  }

  protected onSuccessRequest() {
    this.isLoading = false
  }

  protected setServerError() {
    this.serverError = true
  }

  protected finishRequest() {
    this.isLoading = false
  }

  protected onErrorRequest(error: any) {
    this.finishRequest()
    this.errors.push(error)

    if (AsyncStore.isServerError(error)) {
      this.setServerError()
    }
  }

  get hasErrors() {
    return this.errors.length > 0
  }

  public static isServerError(error: any) {
    return error?.response?.status === 500
  }
}

export default AsyncStore
