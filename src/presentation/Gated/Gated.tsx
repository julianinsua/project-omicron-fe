import { FC, ReactElement, useContext } from 'react'
import { NavLink as RouterLink, Route as RouterRoute } from 'react-router-dom'
import { StoreContext } from 'providers/storeContext'

interface RouteProps {
  permission: string
  [rest: string]: any
}

export const GatedRoute: FC<RouteProps> = ({ permission, ...rest }) => {
  const { authStore } = useContext(StoreContext)
  if (!authStore.isAuthenticated || !authStore.can(permission)) {
    return null
  }
  return <RouterRoute {...rest} />
}

interface LinkProps {
  permission: string
  to: string
  children: ReactElement | ReactElement[]
  [rest: string]: any
}
export const GatedNavLink: FC<LinkProps> = ({ permission, to, children, ...rest }) => {
  const { authStore } = useContext(StoreContext)

  if (!authStore.isAuthenticated || !authStore.can(permission)) {
    return null
  }

  return (
    <RouterLink to={to} {...rest}>
      {children}
    </RouterLink>
  )
}

interface GatedProps {
  permission: string
  component?: FC<any>
  children?: ReactElement | ReactElement[] | null
}

export const Gated: FC<GatedProps> = ({ permission, children, component: Component }) => {
  const { authStore } = useContext(StoreContext)

  if (!authStore.isAuthenticated || !authStore.can(permission)) {
    return null
  }

  if (Component) {
    return <Component />
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>
}

Gated.defaultProps = {
  component: undefined,
  children: null,
}

export default Gated
