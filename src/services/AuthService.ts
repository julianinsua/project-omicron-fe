// eslint-disable class-methods-use-this
import Cookies from 'js-cookie'
import axios from 'axios'
import AuthUser, { authUserInterface } from '../Entities/models/AuthUser'
import AuthServiceBase from '../Entities/interfaces/AuthServiceBase'

class AuthService extends AuthServiceBase {
  getAuthenticationUri = () => '/api/login'

  getLogoutUri = () => '/api/logout'

  getAuthUserFromJson = (authUser: authUserInterface) => AuthUser.fromJson(authUser)

  getAuthUserFromCookie = (authUser: authUserInterface) => AuthUser.fromCookie(authUser)

  persistLoginData = (authUser: authUserInterface | AuthUser) => {
    Cookies.set('authUser', JSON.stringify(authUser))
  }

  getPersistedLoginData = () => Cookies.get('authUser')

  removePersistedLoginData = () => {
    Cookies.remove('authUser')
  }

  loadAuthUserFromBrowser = () => {
    const authUser = JSON.parse(this.getPersistedLoginData() || '{}')

    if (authUser) return this.getAuthUserFromCookie(authUser)

    return null
  }

  authenticate = (email: string, password: string) => {
    axios.post(this.getAuthenticationUri(), { email, password }).then(({ data }) => {
      const authUser = this.getAuthUserFromJson(data)
      this.persistLoginData(authUser)

      return authUser
    })
  }

  logout = () => {
    // axios.get(this.getLogoutUri()).then((response) => response.data)

    this.removePersistedLoginData()
    return true
  }
}

export default AuthService
