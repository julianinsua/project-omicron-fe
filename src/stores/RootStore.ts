import AuthStore from './AuthStore'

class RootStore {
  authStore: AuthStore

  constructor(authStore: AuthStore) {
    this.authStore = authStore
  }
}

export default RootStore
