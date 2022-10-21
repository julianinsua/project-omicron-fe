import { lazy, ReactElement } from 'react'
import { Permissions } from 'Entities/Permissions'
import Layout from 'presentation/Layout'
import { Gated } from 'presentation/Gated/Gated'
import * as paths from './paths'

const MainPageRedirector = lazy(
  () => import(/* webpackChunkName: "MainPageRedirectorComponent" */ 'scenes/MainPageRedirector')
)
const SignIn = lazy(() => import(/* webpackChunkName: "SignIn" */ 'scenes/SignIn'))
const SignUp = lazy(() => import(/* webpackChunkName: "SignUp" */ 'scenes/SignUp'))
const ForgotPassword = lazy(
  () => import(/* webpackChunkName: "ForgotPassword" */ 'scenes/ForgotPassword')
)
const ResetPassword = lazy(
  () => import(/* webpackChunkName: "ResetPassword" */ 'scenes/ResetPassword')
)
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
  { path: paths.SIGNUP, element: <SignUp /> },
  { path: paths.FORGOT_PASSWORD, element: <ForgotPassword /> },
  { path: paths.RESET_PASSWORD, element: <ResetPassword /> },
  {
    path: 'auth',
    element: <Layout />,
    children: [
      {
        path: paths.DASHBOARD,
        element: <Gated permission={Permissions.DASHBOARD_VIEW} component={Dashboard} />,
      },
    ],
  },
]

export default routeScheme
