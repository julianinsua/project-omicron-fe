import { FC, memo, MouseEvent } from 'react'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import c from 'classnames'
import { ReactComponent } from 'Entities/interfaces/Common'
import LiteralValue from 'presentation/LiteralValue'
import FormLabel from 'presentation/FormLabel'
import styles from './datePickerInput.module.scss'
import 'react-datepicker/dist/react-datepicker.css'

interface PropTypes {
  placeholder?: string
  onChange?: (date: Date | null) => void
  literal?: boolean
  value: Date | string
  label?: string
  error?: boolean
  icon?: ReactComponent
  dateFormat?: string
  literalValueFormat?: string
  [props: string]: any
}

const DatePickerInput: FC<PropTypes> = ({
  placeholder,
  onChange,
  literal,
  value,
  label,
  error,
  icon,
  dateFormat,
  literalValueFormat,
  ...props
}) => {
  if (literal) {
    if (value instanceof moment)
      return (
        <LiteralValue label={label} value={value ? moment(value).format(literalValueFormat) : ''} />
      )
  }

  return (
    <label
      onClick={(e: MouseEvent<HTMLLabelElement>) => {
        e.preventDefault()
      }}
      className={styles.datePickerLabel}
    >
      {label && <FormLabel label={label} disabled={false} />}
      <div className={styles.pickerContainer}>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <DatePicker
          className={c(styles.dateInput, error && styles.error)}
          selected={moment(value).toDate()}
          onChange={(date) => onChange && onChange(date)}
          placeholderText={placeholder}
          dateFormat={dateFormat}
          {...props}
        />
        {icon && <span className={styles.pickerIcon}>{icon}</span>}
      </div>
    </label>
  )
}

DatePickerInput.defaultProps = {
  placeholder: undefined,
  label: '',
  onChange: () => {},
  literal: false,
  error: false,
  icon: undefined,
  dateFormat: 'MM/dd/yyyy',
  literalValueFormat: 'MM/dd/yyyy',
}

export default memo(DatePickerInput)
