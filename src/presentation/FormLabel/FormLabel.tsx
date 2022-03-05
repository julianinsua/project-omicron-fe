import { FC } from 'react'
import c from 'classnames'
import styles from './formLabel.module.scss'

const FormLabel: FC<PropTypes> = ({ label, disabled, viewMode = false }) => (
  <div className={c(styles.label, disabled && styles.disabled, viewMode && styles.literalLabel)}>
    {label}
  </div>
)

interface PropTypes {
  label: string
  disabled?: boolean
  viewMode?: boolean
}

export default FormLabel
