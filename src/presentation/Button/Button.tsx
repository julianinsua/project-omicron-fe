import React, { FC, ReactElement, useCallback, useContext, useEffect, useState } from 'react'
import c from 'classnames'
import { StoreContext } from 'providers/storeContext'
import LoadingCircle from 'presentation/LoadingCircle'
import styles from './button.module.scss'
import { onClickEventHandler } from '../../Entities/interfaces/Common'

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
  as?: FC<any> | string
  className?: string
  disabled?: boolean
  error?: boolean
  permission?: string
  material?: boolean
  onClick?: onClickEventHandler<HTMLButtonElement>
  [props: string]: any
}

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
  material,
  onClick,
  ...props
}) => {
  const { authStore } = useContext(StoreContext)
  const [coords, setCoords] = useState({ x: -1, y: -1 })
  const [isRippling, setIsRippling] = useState(false)

  const handleButtonClick = useCallback(
    (e) => {
      if (material) {
        const rect = e.target.getBoundingClientRect()
        setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top })
      }

      // eslint-disable-next-line no-unused-expressions
      onClick && onClick(e)
    },
    [material, onClick]
  )

  useEffect(() => {
    if (material) {
      if (coords.x !== -1 && coords.y !== -1) {
        setIsRippling(true)
        setTimeout(() => setIsRippling(false), 300)
      } else {
        setIsRippling(false)
      }
    }
  }, [coords])

  useEffect(() => {
    if (material && !isRippling) {
      setCoords({ x: -1, y: -1 })
    }
  }, [isRippling])

  if (permission && !authStore.can(permission)) {
    return null
  }

  return (
    <Component
      type={type}
      disabled={isLoading || disabled}
      className={c(
        styles.button,
        big && styles.big,
        small && styles.small,
        smallest && styles.smallest,
        secondary && styles.secondary,
        cancel && styles.cancel,
        outline && styles.outline,
        fullWidth && styles.fullWidth,
        isLoading && styles.isLoading,
        hidden && styles.hidden,
        circle && styles.circle,
        iconPositionLeft && styles.iconLeft,
        error && styles.error,
        className && className
      )}
      onClick={handleButtonClick}
      {...props}
    >
      {material && isRippling && (
        <span className={styles.ripple} style={{ left: coords.x, top: coords.y }} />
      )}
      {label}
      {icon && <span className={styles.icon}>{icon}</span>}
      {isLoading && <LoadingCircle secondary={secondary} cancel={cancel} outline={outline} />}
    </Component>
  )
}

Button.defaultProps = {
  icon: undefined,
  secondary: false,
  cancel: false,
  outline: false,
  big: false,
  small: false,
  smallest: false,
  type: 'button',
  fullWidth: false,
  isLoading: false,
  hidden: false,
  circle: false,
  iconPositionLeft: false,
  as: 'button',
  className: undefined,
  disabled: false,
  error: false,
  permission: '',
  material: false,
  onClick: () => {},
}

export default Button
