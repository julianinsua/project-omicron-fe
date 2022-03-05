import { FC, memo, MouseEvent } from 'react'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import c from 'classnames'
import { ReactComponent } from 'Entities/interfaces/Common'
import LiteralValue from 'presentation/LiteralValue'
import FormLabel from 'presentation/FormLabel'
import styles from './datePickerInput.module.scss'
import 'react-datepicker/dist/react-datepicker.css'

const DatePickerInput: FC<PropTypes> = ({
  placeholder = undefined,
  onChange = () => {},
  literal = false,
  value,
  label,
  error = false,
  icon = null,
  dateFormat = 'MM/dd/yyyy',
  literalValueFormat = 'MM/dd/yyyy',
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
      /* @ts-ignore */
      className={styles.datePickerLabel}
    >
      {label && <FormLabel label={label} disabled={false} />}
      {/* @ts-ignore */}
      <div className={styles.pickerContainer}>
        <DatePicker
          /* @ts-ignore */
          className={c(styles.dateInput, error && styles.error)}
          selected={moment(value).toDate()}
          onChange={(date) => onChange(date)}
          placeholderText={placeholder}
          dateFormat={dateFormat}
          {...props}
        />
        {/* @ts-ignore */}
        {icon && <span className={styles.pickerIcon}>{icon}</span>}
      </div>
    </label>
  )
}

interface PropTypes {
  placeholder?: string
  onChange?: Function
  literal?: boolean
  value: Date | string
  label?: string
  error?: boolean
  icon?: ReactComponent
  dateFormat?: string
  literalValueFormat?: string
  [props: string]: any
}

export default memo(DatePickerInput)
