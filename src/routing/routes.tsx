import { ComponentType, lazy } from 'react'
import * as paths from './paths'
const SignIn = lazy(() => import(/* webpackChunkName: "SignIn" */ 'scenes/SignIn'))
const Dashboard = lazy(() => import(/* webpackChunkName: "Dashboard" */ 'scenes/Dashboard'))

export interface publicRouteInterface {
  path: string
  name: string
  redirectPath?: string
  component: ComponentType<any>
  exact: boolean
}

export interface privateRouteInterface extends publicRouteInterface {
  permission: string
}

const publicRoutes: Array<publicRouteInterface> = [
  {
    path: paths.LOGIN,
    name: 'signIn',
    exact: true,
    component: SignIn,
  },
]

const privateRoutes: Array<privateRouteInterface> = [
  {
    path: paths.DASHBOARD,
    name: 'dashboard',
    exact: true,
    component: Dashboard,
    permission: 'yes',
  },
]

export default { publicRoutes, privateRoutes }
