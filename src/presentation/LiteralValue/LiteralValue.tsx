import { FC } from 'react'
import c from 'classnames'
import FormLabel from '../FormLabel'
import styles from './literalValue.module.scss'

interface PropInterface {
  label?: string
  value: string | number | null
}

const LiteralValue: FC<PropInterface> = ({ label, value }) => {
  return (
    <label className={c(styles.literalLabel)}>
      {label && <FormLabel label={label} viewMode />}
      <div className={styles.literalValue}>{value || '-'}</div>
    </label>
  )
}

LiteralValue.defaultProps = {
  label: '',
}

export default LiteralValue
