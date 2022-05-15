import { FC } from 'react'
import c from 'classnames'
import styles from './formLabel.module.scss'

interface PropTypes {
  label: string
  disabled?: boolean
  viewMode?: boolean
}

const FormLabel: FC<PropTypes> = ({ label, disabled, viewMode = false }) => (
  <div className={c(styles.label, disabled && styles.disabled, viewMode && styles.literalLabel)}>
    {label}
  </div>
)

FormLabel.defaultProps = {
  disabled: false,
  viewMode: false,
}

export default FormLabel
