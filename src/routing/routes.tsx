import { lazy, ReactElement } from 'react'
import Layout from 'presentation/Layout'
import { Gated } from 'presentation/Gated/Gated'
import * as paths from './paths'

const MainPageRedirector = lazy(
  () => import(/* webpackChunkName: "MainPageRedirectorComponent" */ 'scenes/MainPageRedirector')
)
const SignIn = lazy(() => import(/* webpackChunkName: "SignIn" */ 'scenes/SignIn'))
const Dashboard = lazy(() => import(/* webpackChunkName: "Dashboard" */ 'scenes/Dashboard'))

export interface publicRouteInterface {
  path: string
  redirectPath?: string
  element: ReactElement
}

export interface privateRouteInterface extends publicRouteInterface {
  permission: string
}

const routeScheme = [
  { path: paths.ROOT, element: <MainPageRedirector /> },
  { path: paths.LOGIN, element: <SignIn /> },
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Gated permission="yes" component={MainPageRedirector} /> },
      { path: 'dashboard', element: <Gated permission="yes" component={Dashboard} /> },
    ],
  },
]

export default routeScheme
