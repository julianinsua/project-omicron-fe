import InputStore from 'stores/InputStore'
import { action, computed, makeObservable, observable } from 'mobx'
import AsyncStore from 'stores/AsyncStore'
import AuthStore from 'stores/AuthStore'
import isValidEmail from '../../util/validators'

class SignInStore extends AsyncStore {
  @observable public username: InputStore = new InputStore()

  @observable public password: InputStore = new InputStore()

  private authStore: AuthStore

  public constructor(authStore: AuthStore) {
    super()
    this.authStore = authStore
    makeObservable(this)
  }

  @action
  public setUserName(value: string) {
    this.username.setValue(value)
  }

  @action
  public setPassword(value: string) {
    this.password.setValue(value)
  }

  @action
  public validate() {
    if (!this.password?.value || this.password?.value?.trim().length < 1) {
      this.password.setError('requiredField')
    }

    if (!this.username?.value || !isValidEmail(this.username?.value)) {
      this.username.setError('invalidEmail')
    }
  }

  @computed
  public get hasErrors() {
    return this.username.error || this.password.error
  }

  public async signIn() {
    this.validate()
    if (this.hasErrors) {
      return
    }

    try {
      this.preRequest()
      await this.authStore.basicLogin(this.username.value as string, this.password.value as string)
      this.onSuccessRequest()
    } catch (e: any) {
      if (e?.response?.data.data.name) {
        this.password.setError(e.response.data.data.name)
      }
      this.onErrorRequest('authenticationError')
    }
  }
}

export default SignInStore
