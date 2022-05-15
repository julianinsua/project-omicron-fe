import InputStore from 'stores/InputStore'
import { action, makeObservable, observable } from 'mobx'
import asyncStore from 'stores/AsyncStore'

class SignInStore extends asyncStore {
  @observable public username: InputStore = new InputStore()

  @observable public password: InputStore = new InputStore()

  public constructor() {
    super()
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
}

export default SignInStore
