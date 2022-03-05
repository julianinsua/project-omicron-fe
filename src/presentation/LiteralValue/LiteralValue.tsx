import { FC } from 'react'
import c from 'classnames'
import FormLabel from '../FormLabel'
const styles = require('./literalValue.module.scss')

const LiteralValue: FC<PropInterface> = ({ label, value }) => {
  return (
    <label className={c(styles.literalLabel)}>
      {label && <FormLabel label={label} viewMode />}
      <div className={styles.literalValue}>{value ? value : '-'}</div>
    </label>
  )
}

interface PropInterface {
  label?: string
  value: string | number | null
}

export default LiteralValue
