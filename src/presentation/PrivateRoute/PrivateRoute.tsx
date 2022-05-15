import { FC } from 'react'
import { Navigate, Route } from 'react-router-dom'

interface PropTypes {
  component: FC<any>
  isAuthenticated: boolean
  redirectPath: string
  [rest: string]: any
}

const PrivateRoute: FC<PropTypes> = ({
  component: Component,
  isAuthenticated,
  redirectPath,
  ...rest
}) => {
  if (isAuthenticated) {
    return <Route {...rest} element={Component} />
  }

  return <Navigate to={{ pathname: redirectPath }} />
}

export default PrivateRoute
