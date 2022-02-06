import { FC } from 'react'
import c from 'classnames'
import styles from './loadingCircle.module.scss'

const LoadingCircle: FC<PropTypes> = ({ secondary = false, cancel = false, outline = false }) => {
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

interface PropTypes {
  secondary?: boolean
  cancel?: boolean
  outline?: boolean
}

export default LoadingCircle
