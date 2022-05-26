import { FC, ReactElement } from 'react'
import Title from 'presentation/Title'
import Subtitle from 'presentation/Subtitle'
import styles from './authBox.module.scss'

interface PropsInterface {
  children: ReactElement | ReactElement[]
}

const AuthBox: FC<PropsInterface> = ({ children }) => {
  return (
    <div className={styles.box}>
      <Title />
      <Subtitle />
      {children}
    </div>
  )
}

export default AuthBox
