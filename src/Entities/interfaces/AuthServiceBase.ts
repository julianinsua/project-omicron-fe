import AuthUser from './AuthUser'

abstract class AuthServiceBase {
  abstract loadAuthUserFromBrowser(): AuthUser | null

  abstract logout(): void

  abstract authenticate(email: string, password: string): void
}

export default AuthServiceBase
