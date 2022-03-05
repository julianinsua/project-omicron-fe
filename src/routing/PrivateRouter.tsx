import { FC, lazy } from 'react'
import { Route, Redirect, Switch } from 'react-router'
import { privateRouteInterface } from './routes'
import Gated from 'presentation/Gated'
import Layout from 'presentation/Layout'
import AuthorizedNavbar from 'presentation/AuthorizedNavbar'
import AuthorizedHeader from 'presentation/AuthorizedHeader'
import AuthorizedContentWrapper from 'presentation/AuthorizedContentWrapper'
const NotFound = lazy(() => import(/* webpackChunkName: "NotFoundComponent" */ 'scenes/NotFound'))
const MainPageRedirector = lazy(
  () => import(/* webpackChunkName: "MainPageRedirectorComponent" */ 'scenes/MainPageRedirector')
)

const PrivateRouter: FC<PropTypes> = ({
  isAuthenticated,
  privateRoutes,
  redirectPath,
  ...rest
}) => {
  if (isAuthenticated) {
    return (
      <Layout
        sidebar={AuthorizedNavbar}
        header={AuthorizedHeader}
        mainContent={AuthorizedContentWrapper}
      >
        <Switch>
          <Route exact path="/" component={MainPageRedirector} />
          {privateRoutes.map((route) => (
            <Gated.Route
              {...rest}
              key={route.path}
              path={route.path}
              exact={route.exact}
              component={route.component}
              permission={route.permission}
            />
          ))}
          <Route component={NotFound} />
        </Switch>
      </Layout>
    )
  }
  return <Redirect to={redirectPath} />
}

interface PropTypes {
  isAuthenticated: boolean
  privateRoutes: Array<privateRouteInterface>
  redirectPath: string
  [rest: string]: any
}

export default PrivateRouter
