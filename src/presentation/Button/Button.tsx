import React, { FC, ReactElement, useContext } from 'react'
import c from 'classnames'
import { StoreContext } from 'providers/storeContext'
import LoadingCircle from 'presentation/LoadingCircle'
import styles from './button.module.scss'

const Button: FC<PropTypes> = ({
  label,
  icon,
  secondary,
  cancel,
  outline,
  big,
  small,
  smallest,
  type,
  fullWidth,
  isLoading,
  hidden,
  circle,
  iconPositionLeft,
  as: Component = 'button',
  className,
  disabled,
  error,
  permission,
  ...props
}) => {
  const { authStore } = useContext(StoreContext)

  if (permission && !authStore.can(permission)) {
    return null
  }

  return (
    <Component type={type} disabled={isLoading || disabled} className={c(styles.button)} {...props}>
      {label}
      {icon && <span className={styles.icon}>{icon}</span>}
      {isLoading && <LoadingCircle secondary={secondary} cancel={cancel} outline={outline} />}
    </Component>
  )
}

interface PropTypes {
  label: string
  icon?: ReactElement
  secondary?: boolean
  cancel?: boolean
  outline?: boolean
  big?: boolean
  small?: boolean
  smallest?: boolean
  type?: string
  fullWidth?: boolean
  isLoading?: boolean
  hidden?: boolean
  circle?: boolean
  iconPositionLeft?: boolean
  as?: FC<any>
  className?: string
  disabled?: boolean
  error?: boolean
  permission?: string
  [props: string]: any
}

export default Button
