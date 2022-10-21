import { makeObservable, action, computed } from 'mobx'
import InputStore from 'stores/InputStore'
import AuthService from 'services/AuthService'
import AsyncStore from 'stores/AsyncStore'

class SignUpStore extends AsyncStore {
  public email: InputStore

  public password: InputStore

  public repeatPassword: InputStore

  private authService: AuthService

  constructor() {
    super()
    this.email = new InputStore()
    this.password = new InputStore()
    this.repeatPassword = new InputStore()

    this.authService = new AuthService()

    makeObservable(this)
  }

  @action
  public setEmail(value: string) {
    this.email.setValue(value)
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
  private assignErrors(validationErrors: Record<string, any>) {
    const keys = Object.keys(validationErrors)
    keys.forEach((key) => {
      switch (key) {
        case 'email':
          this.email.setError(validationErrors[key])
          break
        case 'password':
          this.password.setError(validationErrors[key])
          break
        default:
          break
      }
    })
  }

  @action
  private validate() {
    if (this.getPassword !== this.getRepeatPassword) {
      this.repeatPassword.setError('passwordMismatch')
    }
  }

  @computed
  public get hasErrors() {
    return this.email.error || this.password.error || this.repeatPassword.error
  }

  public async signUp() {
    this.validate()
    if (this.hasErrors) {
      return
    }
    try {
      this.preRequest()
      await this.authService.signUp(this.getEmail, this.getPassword, this.getRepeatPassword)
      this.onSuccessRequest()
    } catch (e: any) {
      const { validationErrors } = e.response.data.data.error
      this.assignErrors(validationErrors)
      this.onErrorRequest('badSignupData')
    }
  }

  @computed
  public get getEmail() {
    return this.email.value || ''
  }

  @computed
  public get getPassword() {
    return this.password?.value?.trim() || ''
  }

  @computed
  public get getRepeatPassword() {
    return this.repeatPassword?.value?.trim() || ''
  }
}

export default SignUpStore
