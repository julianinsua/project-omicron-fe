import { FC } from 'react'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute: FC<PropTypes> = ({
  component: Component,
  isAuthenticated,
  redirectPath,
  ...rest
}) => {
  if (isAuthenticated) {
    return <Route {...rest} render={(props) => <Component {...props} />} />
  }

  return <Redirect to={{ pathname: redirectPath }} />
}

interface PropTypes {
  component: FC<any>
  isAuthenticated: boolean
  redirectPath: string
  [rest: string]: any
}

export default PrivateRoute
