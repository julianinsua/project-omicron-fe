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
  public readonly token?: string

  constructor(id: string, email: string, token?: string) {
    this.userId = id
    this.email = email
    this.token = token
  }

  public addPermission(permission: string) {
    this.permissions.push(permission)
  }

  public static fromJson({ id, email, token }: authUserInterface) {
    return new AuthUser(id, email, token)
  }

  public static fromCookie({ id, email, token }: authUserInterface) {
    return new AuthUser(id, email, token)
  }
}

export default AuthUser
