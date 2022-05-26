import { FC } from 'react'
import c from 'classnames'
import styles from './title.module.scss'

interface PropTypes {
  big?: boolean
  small?: boolean
  smallest?: boolean
}

const Title: FC<PropTypes> = ({ big, small, smallest }) => {
  return (
    <div>
      <h1
        className={c(
          styles.header,
          big && styles.big,
          small && styles.small,
          smallest && styles.smallest
        )}
      >
        Omicron <span className={styles.highlight}>Documentation</span>
      </h1>
    </div>
  )
}

Title.defaultProps = {
  big: false,
  small: false,
  smallest: false,
}

export default Title
