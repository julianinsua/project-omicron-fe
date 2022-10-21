import Permissions from 'Entities/Permissions'

export interface authUserInterface {
  id: string
  email: string
  token?: string
  permissions: Array<string>
}

class AuthUser {
  public userId: string

  public email: string

  public readonly permissions: Array<Permissions> = []

  public token?: string

  constructor(id: string, email: string, permissions: Array<string>, token?: string) {
    this.userId = id
    this.email = email
    this.token = token
    this.permissions = permissions as Array<Permissions>
  }

  public addPermission(permission: Permissions) {
    this.permissions.push(permission)
  }

  public updateToken(token: string) {
    this.token = token
  }

  public static fromJson({ id, email, permissions, token }: authUserInterface) {
    return new AuthUser(id, email, permissions, token)
  }

  public static fromCookie({ id, email, permissions, token }: authUserInterface) {
    return new AuthUser(id, email, permissions, token)
  }

  public get humbleAuthUser(): authUserInterface {
    return { id: this.userId, email: this.email, token: this.token, permissions: this.permissions }
  }
}

export default AuthUser
