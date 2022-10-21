// eslint-disable class-methods-use-this
import Cookies from 'js-cookie'
import axios from 'axios'
import AuthUser, { authUserInterface } from 'Entities/models/AuthUser'
import AuthServiceBase from 'Entities/interfaces/AuthServiceBase'
import API_URL from 'services/config'

class AuthService extends AuthServiceBase {
  getAuthenticationUri = () => `${API_URL}/login`

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

    if (Object.keys(authUser).length > 0) return this.getAuthUserFromCookie(authUser)

    return null
  }

  authenticate = (email: string, password: string) => {
    return axios.post(this.getAuthenticationUri(), { email, password }).then(({ data }) => {
      const authUser = this.getAuthUserFromJson(data.data)
      this.persistLoginData(authUser)

      return authUser
    })
  }

  logout = () => {
    // axios.get(this.getLogoutUri()).then((response) => response.data)

    this.removePersistedLoginData()
    return true
  }

  signUp = (email: string, password: string, repeatPassword: string) =>
    axios.post(`${API_URL}/signup`, { email, password, repeatPassword })

  checkPasswordResetToken = (token: string) => {
    const params = { token }
    return axios.get(`${API_URL}/resetToken`, { params })
  }
}

export default AuthService
