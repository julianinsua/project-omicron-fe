import { FC } from 'react'
import { MdOutlineHome } from 'react-icons/md'
import NavBarButton from 'presentation/NavBarButton'
import styles from './authorizedNavbar.module.scss'

const AuthorizedNavbar: FC<any> = () => {
  return (
    <div className={styles.container}>
      <NavBarButton label="Dashboard" to="/auth/dashboard" icon={<MdOutlineHome size={24} />} />
      <NavBarButton label="Pepito" to="/auth/pepito" icon={<MdOutlineHome size={24} />} />
    </div>
  )
}

export default AuthorizedNavbar
