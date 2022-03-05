import { PureComponent, ReactElement } from 'react'
import { NavLink as RouterLink, Route as RouterRoute } from 'react-router-dom'
import { StoreContext } from 'providers/storeContext'

class Route extends RouterRoute<{ permission: string }> {
  static contextType = StoreContext

  render() {
    const { permission } = this.props
    const { authStore } = this.context

    if (!authStore.can(permission)) {
      return null
    }

    return super.render()
  }
}

class NavLink extends PureComponent<{
  permision: string
  to: string
  children: ReactElement | ReactElement[]
  [params: string]: any
}> {
  static contextType = StoreContext
  render() {
    const { permission, to, children, ...params } = this.props
    const { authStore } = this.context

    if (!authStore.can(permission)) {
      return null
    }
    return (
      <RouterLink to={to} {...params}>
        {children}
      </RouterLink>
    )
  }
}

class Gated extends PureComponent<{ permission: string; children: ReactElement | ReactElement[] }> {
  static contextType = StoreContext
  static NavLink = NavLink
  static Route = Route

  render() {
    const { authStore } = this.context
    const { permission, children } = this.props

    if (!authStore.can(permission)) {
      return null
    }
    return children
  }
}

export default Gated
