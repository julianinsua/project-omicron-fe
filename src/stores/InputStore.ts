import { action, makeObservable, observable } from 'mobx'
import AsyncStore from './AsyncStore'

class InputStore extends AsyncStore {
  @observable public error = false

  @observable public value?: string = ''

  @observable public errorMessage: string | null = ''

  public constructor() {
    super()
    makeObservable(this)
  }

  @action
  public setError(errorMessage: string) {
    this.error = true
    this.errorMessage = errorMessage
  }

  @action
  public setValue(value: string | undefined) {
    this.value = value || ''
    this.clearError()
  }

  @action
  public clearError() {
    this.error = false
    this.errorMessage = ''
  }

  @action
  public clearAll() {
    this.error = false
    this.errorMessage = null
    this.value = undefined
  }
}

export default InputStore
