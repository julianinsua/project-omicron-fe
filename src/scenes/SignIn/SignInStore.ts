import InputStore from 'stores/InputStore'
import { action, observable } from 'mobx'
import asyncStore from 'stores/AsyncStore'

class SignInStore extends asyncStore {
  @observable public username: InputStore = new InputStore()

  @observable public password: InputStore = new InputStore()

  @action
  public setUserName(value: string) {
    this.username.setValue(value)
  }

  @action
  public setPassword(value: string) {
    this.password.setValue(value)
  }
}

export default SignInStore
