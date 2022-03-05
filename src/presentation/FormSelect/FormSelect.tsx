import { FC, memo, Ref } from 'react'
import Select from 'react-select'
import LiteralValue from 'presentation/LiteralValue'
import FormLabel from 'presentation/FormLabel'
const styles = require('./formSelect.module.scss')

const FormSelect: FC<PropTypes> = ({
  as: Component = Select,
  inputRef,
  label = '',
  disabled = false,
  error = false,
  literal = false,
  value,
  isMulti = false,
  options = [],
  ...props
}) => {
  if (literal) {
    let literalValue: string = ''
    if (Array.isArray(value) && isMulti) {
      literalValue = value?.map((e) => e.value).join(', ')
    } else if (isValueInterface(value)) {
      literalValue = value?.value || ''
    } else if (typeof value === 'string') {
      literalValue = value
    }

    return <LiteralValue label={label} value={literalValue} />
  }

  return (
    <label className={styles.label}>
      {label && <FormLabel label={label} disabled={disabled} />}
      <Component
        options={options}
        ref={inputRef}
        isDisabled={disabled}
        getOptionLabel={(option: ValueInterface) => {
          if (option.__isNew__) {
            return option.value
          }
          return option.label
        }}
        getOptionValue={(option: ValueInterface) => {
          return option.value
        }}
        className="select__container"
        classNamePrefix="select"
        value={value}
        isMulti={isMulti}
        {...props}
      />
    </label>
  )
}

interface ValueInterface {
  value: string
  label?: string
  [x: string]: any
}

const isValueInterface = (object: unknown): object is ValueInterface =>
  Object.prototype.hasOwnProperty.call(object, 'name')

interface PropTypes {
  as?: FC<any>
  inputRef?: Ref<any>
  label?: string
  disabled?: boolean
  error?: boolean
  literal?: boolean
  value?: ValueInterface | Array<ValueInterface> | string | null
  isMulti?: boolean
  options?: Array<ValueInterface>
  [props: string]: any
}

export default memo(FormSelect)
