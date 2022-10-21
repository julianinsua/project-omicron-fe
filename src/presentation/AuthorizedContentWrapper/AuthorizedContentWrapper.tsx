import { FC } from 'react'

const AuthorizedContentWrapper: FC<any> = ({ children }) => {
  return (
    <div>
      <div>{children}</div>
    </div>
  )
}

export default AuthorizedContentWrapper
