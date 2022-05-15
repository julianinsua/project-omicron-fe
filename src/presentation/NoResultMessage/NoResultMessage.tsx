import { FC } from 'react'
import styles from './noResultMessage.module.scss'

interface PropTypes {
  message: string
}

const NoResultMessage: FC<PropTypes> = ({ message }) => {
  return <div className={styles.noResultMessage}>{message}</div>
}

export default NoResultMessage
