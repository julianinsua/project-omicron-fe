import AuthUser, { authUserInterface } from '../Entities/interfaces/AuthUser'
import Cookies from 'js-cookie'

class AuthService {
  getUserFromJson = (authUser: authUserInterface) => AuthUser.fromJson(authUser)

  getUserFromCookie = (authUser: authUserInterface) => AuthUser.fromCookie(authUser)

  persistLoginData = (authUser: authUserInterface) => {
    Cookies.set('authUser', JSON.stringify(authUser))
  }

  getPersistedLoginData = () => Cookies.get('authUser')

  removePersistedLoginData = () => {
    Cookies.remove('authUser')
  }

  loadAuthUserFromBrowser = () => {
    return { id: 'id', email: 'pepito@pepito.com', token: 'aaa.validToken', permissions: ['yes'] }
  }

  logout = () => {}
}

export default AuthService
