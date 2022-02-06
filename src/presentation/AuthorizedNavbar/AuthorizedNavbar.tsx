import { FC } from 'react'
import styles from './authorizedNavbar.module.scss'

const AuthorizedNavbar: FC<PropTypes> = () => {
  return <div className={styles.container}>Navbar</div>
}

interface PropTypes {}

export default AuthorizedNavbar
