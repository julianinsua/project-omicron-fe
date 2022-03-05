import { FC, memo, Ref } from 'react'
import { observer } from 'mobx-react'
import c from 'classnames'
import { ALIGN_OPTIONS } from 'Entities/interfaces/Common'
import InputStore from 'stores/InputStore'
import Input from 'presentation/Input'
const styles = require('./inputWrapper.module.scss')

const InputWrapper: FC<PropTypes> = ({
  wrapperClassName = null,
  t = null,
  as: Component = Input,
  placeholder = null,
  description = null,
  inputStore,
  alignError = 'start',
  inputRef = null,
  required = false,
  literal = false,
  label,
  name = null,
  ...props
}) => {
  let useLabel = label
  let usePlaceholder = placeholder

  if (name !== null && t) {
    if (label !== null) {
      // @ts-ignore
      useLabel = t(`${name}Label`)
    }

    if (placeholder !== null) {
      usePlaceholder = t(`${name}Placeholder`)
    }
  }

  if (required && !literal) {
    useLabel = `${useLabel} *`
  }

  return (
    <div className={c(styles.wrapper, wrapperClassName && wrapperClassName)}>
      <Component
        value={inputStore && inputStore.value}
        error={inputStore && inputStore.error}
        placeholder={usePlaceholder}
        inputRef={inputRef}
        literal={literal}
        label={useLabel}
        {...props}
      />
      {inputStore?.error && inputStore?.errorMessage !== '' && (
        <small
          className={c(styles.error, literal && styles.errorLiteral, styles[`align-${alignError}`])}
        >
          {inputStore.errorMessage && t && t(inputStore.errorMessage)}
        </small>
      )}
      {description && <span className={styles.description}>{description}</span>}
    </div>
  )
}

interface PropTypes {
  wrapperClassName?: string | null
  t?: (x: string) => string
  as?: FC<any>
  placeholder?: string | null
  description?: string | null
  inputStore?: InputStore | undefined
  alignError?: ALIGN_OPTIONS
  inputRef?: Ref<any> | null
  required?: boolean
  literal?: boolean
  label?: string | undefined
  name?: string | null
  [props: string]: any
}

export default memo(observer(InputWrapper))
