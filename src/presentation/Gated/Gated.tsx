import { FC, ReactElement, useCallback, useContext } from 'react'
import { NavLink as RouterLink, Route as RouterRoute, Navigate } from 'react-router-dom'
import c from 'classnames'
import { StoreContext } from 'providers/storeContext'
import { LOGIN } from 'routing/paths'
import { Permissions } from 'Entities/Permissions'

interface RouteProps {
  permission: Permissions
  [rest: string]: any
}

export const GatedRoute: FC<RouteProps> = ({ permission, ...rest }) => {
  const { authStore } = useContext(StoreContext)

  if (!authStore.isAuthenticated || !authStore.can(permission)) {
    return <Navigate to={LOGIN} />
  }

  return <RouterRoute {...rest} />
}

interface LinkProps {
  permission: Permissions
  to: string
  children: ReactElement | ReactElement[]
  className?: string
  activeClassName?: string
  pendingClassName?: string
  [rest: string]: any
}
export const GatedNavLink: FC<LinkProps> = ({
  permission,
  to,
  children,
  className,
  pendingClassName,
  activeClassName,
  ...rest
}) => {
  const { authStore } = useContext(StoreContext)

  const handleClassName = useCallback(({ isActive, isPending }) => {
    return c(
      className && className,
      pendingClassName && isPending && pendingClassName,
      activeClassName && isActive && activeClassName
    )
  }, [])

  if (!authStore.isAuthenticated || !authStore.can(permission)) {
    return null
  }

  return (
    <RouterLink to={to} className={handleClassName} {...rest}>
      {children}
    </RouterLink>
  )
}

GatedNavLink.defaultProps = {
  className: '',
  pendingClassName: '',
  activeClassName: '',
}

interface GatedProps {
  permission: Permissions
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
