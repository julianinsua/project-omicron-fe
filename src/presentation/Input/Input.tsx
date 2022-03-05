import { FC, memo, ChangeEvent, Ref } from 'react'
import c from 'classnames'
import { onChangeEventHandler, validNumber } from 'Entities/interfaces/Common'
import LiteralValue from 'presentation/LiteralValue'
import FormLabel from '../FormLabel'
const styles = require('./input.module.scss')

const validateIfNumericChange = (
  e: ChangeEvent<HTMLInputElement>,
  onChange: onChangeEventHandler<HTMLInputElement>,
  onlyNumeric: boolean
) => {
  if (onlyNumeric && validNumber.test(e?.target?.value)) {
    return false
  }

  if (onlyNumeric && +e?.target?.value > Number.MAX_SAFE_INTEGER - 1) {
    return false
  }

  onChange(e)

  return null
}

const Input: FC<PropTypes> = ({
  label = '',
  inputRef,
  disabled,
  onChange = () => {},
  onlyNumeric = false,
  error = false,
  literal = false,
  value = '',
  className = '',
  ...props
}) =>
  literal ? (
    <LiteralValue label={label} value={value} />
  ) : (
    <label className={styles.label}>
      {label && <FormLabel label={label} disabled={disabled} />}
      <input
        className={c(styles.input, error && styles.error, className !== '' && className)}
        onChange={(e) => validateIfNumericChange(e, onChange, onlyNumeric)}
        disabled={disabled}
        ref={inputRef}
        value={value && value}
        {...props}
      />
    </label>
  )

interface PropTypes {
  inputRef?: Ref<any>
  label?: string
  value?: string | number
  onlyNumeric?: boolean
  className?: string
  disabled?: boolean
  onChange?: onChangeEventHandler<HTMLInputElement>
  error?: boolean | null
  literal?: boolean
  [props: string]: any
}

export default memo(Input)
