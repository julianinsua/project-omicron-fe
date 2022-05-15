import { FC } from 'react'
import c from 'classnames'
import styles from './loadingCircle.module.scss'

interface PropTypes {
  secondary?: boolean
  cancel?: boolean
  outline?: boolean
}

const LoadingCircle: FC<PropTypes> = ({ secondary, cancel, outline }) => {
  return (
    <div
      className={c(
        styles.loadingCircle,
        secondary && styles.secondary,
        cancel && styles.cancel,
        outline && styles.outline
      )}
    />
  )
}

LoadingCircle.defaultProps = {
  secondary: false,
  cancel: false,
  outline: false,
}

export default LoadingCircle
