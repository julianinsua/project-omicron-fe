import { FC } from 'react'
const styles = require('./noResultMessage.module.scss')

const NoResultMessage: FC<PropTypes> = ({ message }) => {
  return <div className={styles.noResultMessage}>{message}</div>
}

interface PropTypes {
  message: string
}

export default NoResultMessage
