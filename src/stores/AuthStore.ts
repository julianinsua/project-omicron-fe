import { observable, action, makeObservable } from 'mobx'
import moment from 'moment'
import AuthService from 'services/AuthService'
import AuthUser, { authUserInterface } from 'Entities/models/AuthUser'
import { Permissions } from 'Entities/Permissions'
import AsyncStore from './AsyncStore'

class AuthStore extends AsyncStore {
  @observable public authUser?: authUserInterface | AuthUser

  private authService: AuthService

  private logoutTimeout?: NodeJS.Timeout

  constructor(authService = new AuthService()) {
    super()
    this.authService = authService
    this.isLoading = false

    this.loadAuthFromBrowser()
    makeObservable(this)
  }

  // eslint-disable-next-line consistent-return
  private loadAuthFromBrowser() {
    this.preRequest()

    const authUser: AuthUser | null = this.authService.loadAuthUserFromBrowser()

    if (authUser?.token && this.validToken(authUser.token)) {
      return this.authenticate(authUser).then(() => {
        this.onSuccessRequest()
        AuthStore.keepAlive()
      })
    }

    this.logout()
    this.onSuccessRequest()
  }

  public async basicLogin(username: string, password: string) {
    const authUser = await this.authService.authenticate(username, password)
    await this.authenticate(authUser)

    return authUser.token
  }

  private validToken(token: string | undefined): boolean {
    return this.getExpirationTime(token) > 0
  }

  private getExpirationTime(token: string | undefined): number {
    if (token) {
      const expDate = this.getJWTExpDate(token)
      return moment.utc(moment(expDate).diff(moment())).valueOf()
    }
    return -1
  }

  private authenticate(authUser: AuthUser) {
    this.updateAuthUser(authUser)
    if (authUser.token) this.setLogoutTimer(authUser.token)

    return Promise.resolve()
  }

  @action
  logout() {
    this.authService.logout()
    this.authUser = undefined
  }

  private static keepAlive() {
    console.log('keep alive')
  }

  @action
  private updateAuthUser(authUser: AuthUser) {
    this.authUser = authUser
  }

  @action
  public updateToken(token: string) {
    if (this.authUser instanceof AuthUser) {
      this.authUser.updateToken(token)
    }
  }

  public get isAuthenticated() {
    return this.validToken(this.authUser?.token)
  }

  private setLogoutTimer(token: string) {
    if (this.logoutTimeout) {
      clearTimeout(this.logoutTimeout)
    }

    this.logoutTimeout = setTimeout(() => {
      if (!this.validToken(token)) {
        this.logout()
      }
    }, this.getExpirationTime(token))
  }

  get dashboardRoute() {
    return '/'
  }

  getJWTExpDate = (token: string) => moment(JSON.parse(atob(token.split('.')[1])).exp * 1000)

  can = (permission: Permissions) => {
    return permission === Permissions.YES || this.authUser?.permissions?.includes(permission)
  }
}

export default AuthStore
