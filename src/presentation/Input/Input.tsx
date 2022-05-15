import { FC, memo, ChangeEvent, useRef, RefObject, useCallback } from 'react'
import c from 'classnames'
import { onChangeEventHandler, validNumber } from 'Entities/interfaces/Common'
import LiteralValue from 'presentation/LiteralValue'
import FormLabel from '../FormLabel'
import styles from './input.module.scss'

const validateIfNumericChange = (
  e: ChangeEvent<HTMLInputElement>,
  onChange: onChangeEventHandler<HTMLInputElement>,
  onlyNumeric: boolean
) => {
  if (onlyNumeric && validNumber.test(e?.target?.value)) {
    return false
  }

  // eslint-disable-next-line no-unsafe-optional-chaining
  if (onlyNumeric && +e?.target?.value > Number.MAX_SAFE_INTEGER - 1) {
    return false
  }

  onChange(e)

  return null
}

interface PropTypes {
  inputRef?: RefObject<any>
  label?: string
  value?: string | number
  onlyNumeric?: boolean
  className?: string
  disabled?: boolean
  onChange?: onChangeEventHandler<HTMLInputElement>
  error?: boolean | null
  literal?: boolean
  material?: boolean
  outline?: boolean
  [props: string]: any
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
  material,
  outline = false,
  ...props
}) => {
  const ref = useRef<HTMLInputElement>(null)

  const handleFocusInput = useCallback(() => {
    if (material) {
      if (inputRef?.current) {
        inputRef?.current?.focus()
      } else {
        ref?.current?.focus()
      }
    }
  }, [inputRef, ref, material])

  if (literal) {
    return <LiteralValue label={label} value={value} />
  }

  if (material) {
    return (
      <div className={styles.materialWrapper}>
        <input
          className={c(styles.materialInput, outline && styles.outline, className && className)}
          ref={inputRef || ref}
          value={value && value}
          onChange={(e) => validateIfNumericChange(e, onChange, onlyNumeric)}
          placeholder=" "
          {...props}
        />
        <label
          className={c(styles.materialLabel, outline && styles.outlineLabel)}
          onClick={handleFocusInput}
        >
          {label}
        </label>
      </div>
    )
  }

  return (
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
}

Input.defaultProps = {
  label: '',
  inputRef: undefined,
  disabled: false,
  onChange: () => {},
  onlyNumeric: false,
  error: false,
  literal: false,
  value: '',
  className: '',
  material: false,
  outline: false,
}

export default memo(Input)
