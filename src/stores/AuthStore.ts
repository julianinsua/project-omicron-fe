import { observable, action, computed, makeObservable } from 'mobx'
import moment from 'moment'
import AsyncStore from './AsyncStore'
import AuthService from 'services/AuthService'
import AuthUser, { authUserInterface } from 'Entities/models/AuthUser'

class AuthStore extends AsyncStore {
  authUser?: authUserInterface | AuthUser
  private authService: AuthService
  private logoutTimeout?: NodeJS.Timeout

  constructor(authService = new AuthService()) {
    super()
    this.authService = authService
    this.isLoading = false

    this.loadAuthFromBrowser()

    makeObservable<AuthStore, any>(this, {
      // Observables
      authUser: observable,
      // Actions
      updateToken: action,
      updateAuthUser: action,
      logout: action,
      // Computed
      isAuthenticated: computed,
    })
  }

  private loadAuthFromBrowser() {
    this.preRequest()

    const authUser: AuthUser | null = this.authService.loadAuthUserFromBrowser()

    if (authUser?.token && this.validToken(authUser.token)) {
      return this.authenticate(authUser.humbleAuthUser).then(() => {
        this.onSuccessRequest()
        this.keepAlive()
      })
    }

    this.logout()
    this.onSuccessRequest()
  }

  private validToken(token: string): boolean {
    return this.getExpirationTime(token) < 0
  }

  private getExpirationTime(token: string): number {
    if (token) {
      const expDate = this.getJWTExpDate(token)
      return moment.utc(moment(expDate).diff(moment())).valueOf()
    }
    return -1
  }

  private authenticate(authUser: authUserInterface) {
    this.updateAuthUser(authUser)
    if (authUser.token) this.setLogoutTimer(authUser.token)

    return Promise.resolve()
  }

  logout() {
    this.authService.logout()
    this.authUser = undefined
  }

  private keepAlive() {}

  private updateAuthUser(authUser: authUserInterface) {
    this.authUser = authUser
  }

  public updateToken(token: string) {
    if (this.authUser instanceof AuthUser) {
      this.authUser.updateToken(token)
    }
  }

  public get isAuthenticated() {
    return this.validToken(this.authUser?.token || '')
  }

  private setLogoutTimer(token: string) {
    if (this.logoutTimeout) {
      clearTimeout(this.logoutTimeout)
    }

    this.logoutTimeout = setTimeout(() => {}, this.getExpirationTime(token))
  }

  get dashboardRoute() {
    return '/'
  }

  getJWTExpDate = (token: string) => moment(JSON.parse(atob(token.split('.')[1])).exp * 1000)

  can = (permission: string) =>
    permission === 'yes' || this.authUser?.permissions?.includes(permission)
}

export default AuthStore
