import { Route } from 'react-router-dom'
import { publicRouteInterface } from './routes'
import { FC } from 'react'

const PublicRouter: FC<PropTypes> = ({ publicRoutes }) => {
  return (
    <>
      {publicRoutes.map((route: publicRouteInterface) => (
        <Route key={route.path} path={route.path} exact={route.exact} component={route.component} />
      ))}
    </>
  )
}

interface PropTypes {
  publicRoutes: Array<publicRouteInterface>
}

export default PublicRouter
