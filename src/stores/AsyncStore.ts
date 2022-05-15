import { action, observable } from 'mobx'

class AsyncStore {
  @observable isLoading = true

  @observable private errors: Array<any> = []

  @observable private serverError = false

  // eslint-disable-next-line @typescript-eslint/ban-types
  private tryAgainRequest: Function | null = null

  constructor() {
    this.isLoading = true
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  @action protected preRequest(request: Function | null = null) {
    this.isLoading = true
    this.errors = []
    this.requestProcess(request)
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  private requestProcess(request: Function | null) {
    this.clearError()
    this.tryAgainRequest = request
  }

  public clearError() {
    this.serverError = false
  }

  protected tryAgain() {
    if (this.tryAgainRequest) {
      this.tryAgainRequest()
    }
    return null
  }

  @action
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
