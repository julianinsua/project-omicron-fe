import { FC, ReactNode } from 'react'
import c from 'classnames'
import { onClickEventHandler } from 'Entities/interfaces/Common'
import { Permissions } from 'Entities/Permissions'
import { GatedNavLink } from 'presentation/Gated/Gated'
import styles from './navBarButton.module.scss'

interface Props {
  label: string
  to: string
  icon: ReactNode
  onClick?: onClickEventHandler<HTMLButtonElement>
  permission?: Permissions
  buttonActiveClass?: string
  className?: string
}

const NavBarButton: FC<Props> = ({
  label,
  to,
  icon,
  permission = Permissions.YES,
  onClick,
  buttonActiveClass,
  className,
}) => {
  return (
    <GatedNavLink
      to={to}
      permission={permission}
      onClick={onClick}
      activeClassName={c(buttonActiveClass || styles.navBarButtonActive)}
      className={c(className || styles.navBarButton)}
    >
      <div className={styles.overlay} />
      <span className={styles.icon}>{icon}</span>
      <span className={styles.label}>{label}</span>
    </GatedNavLink>
  )
}

NavBarButton.defaultProps = {
  permission: Permissions.YES,
  buttonActiveClass: '',
  onClick: () => {},
  className: '',
}

export default NavBarButton
