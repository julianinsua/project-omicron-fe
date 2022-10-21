import { makeObservable, observable, action } from 'mobx'
import AuthService from 'services/AuthService'
import AsyncStore from 'stores/AsyncStore'
import InputStore from 'stores/InputStore'

class ResetPasswordStore extends AsyncStore {
  @observable public password: InputStore

  @observable public repeatPassword: InputStore

  public authService: AuthService

  constructor() {
    super()
    this.password = new InputStore()
    this.repeatPassword = new InputStore()

    this.authService = new AuthService()

    makeObservable(this)
  }

  @action
  public setPassword(value: string) {
    this.password.setValue(value)
  }

  @action
  public setRepeatPassword(value: string) {
    this.repeatPassword.setValue(value)
  }

  @action
  public checkToken(token: string) {
    this.authService.checkPasswordResetToken(token)
  }
}

export default ResetPasswordStore
