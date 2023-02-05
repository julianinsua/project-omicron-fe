import { FC } from 'react'
import Logo from 'presentation/Logo'
import HeaderActions from 'presentation/HeaderActions'
import styles from './authorizedHeader.module.scss'

const AuthorizedHeader: FC<any> = () => {
  return (
    <div className={styles.container}>
      <Logo />
      <HeaderActions />
    </div>
  )
}

export default AuthorizedHeader
