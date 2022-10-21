import { action, observable, makeObservable } from 'mobx'
import AuthService from 'services/AuthService'
import AsyncStore from 'stores/AsyncStore'
import InputStore from 'stores/InputStore'

class ForgotPasswordStore extends AsyncStore {
  @observable public email: InputStore

  private authService: AuthService

  constructor() {
    super()
    this.email = new InputStore()
    this.authService = new AuthService()

    makeObservable(this)
  }

  @action
  public setEmail(value: string) {
    this.email.setValue(value)
  }

  public requestPaswordReset() {}
}

export default ForgotPasswordStore
