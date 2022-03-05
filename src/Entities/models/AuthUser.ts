export interface authUserInterface {
  id: string
  email: string
  token?: string
  permissions?: Array<string>
}

class AuthUser {
  public userId: string
  public email: string
  public readonly permissions: Array<string> = []
  public token?: string

  constructor(id: string, email: string, token?: string) {
    this.userId = id
    this.email = email
    this.token = token
  }

  public addPermission(permission: string) {
    this.permissions.push(permission)
  }

  public updateToken(token: string) {
    this.token = token
  }

  public static fromJson({ id, email, token }: authUserInterface) {
    return new AuthUser(id, email, token)
  }

  public static fromCookie({ id, email, token }: authUserInterface) {
    return new AuthUser(id, email, token)
  }

  public get humbleAuthUser(): authUserInterface {
    return { id: this.userId, email: this.email, token: this.token, permissions: this.permissions }
  }
}

export default AuthUser
