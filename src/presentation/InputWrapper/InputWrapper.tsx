import { FC, memo, RefObject } from 'react'
import { observer } from 'mobx-react'
import c from 'classnames'
import { ALIGN_OPTIONS } from 'Entities/interfaces/Common'
import InputStore from 'stores/InputStore'
import Input from 'presentation/Input'
import styles from './inputWrapper.module.scss'

interface PropTypes {
  wrapperClassName?: string | null
  t?: (x: string) => string
  as?: FC<any>
  placeholder?: string | null
  description?: string | null
  inputStore?: InputStore | undefined
  alignError?: ALIGN_OPTIONS
  inputRef?: RefObject<any>
  required?: boolean
  literal?: boolean
  label?: string | undefined
  name?: string | null
  [props: string]: any
}

const InputWrapper: FC<PropTypes> = ({
  wrapperClassName = null,
  t = null,
  as: Component = Input,
  placeholder = null,
  description = null,
  inputStore,
  alignError = ALIGN_OPTIONS.start,
  inputRef,
  required = false,
  literal = false,
  label,
  name = null,
  ...props
}) => {
  let useLabel = label
  let usePlaceholder = placeholder
  let errorAlignment: 'align-start' | 'align-center' | 'align-end' = 'align-start'

  if (name !== null && t) {
    if (label !== null) {
      useLabel = t(`${name}Label`)
    }

    if (placeholder !== null) {
      usePlaceholder = t(`${name}Placeholder`)
    }
  }

  if (required && !literal) {
    useLabel = `${useLabel} *`
  }

  if (alignError === ALIGN_OPTIONS.center) {
    errorAlignment = 'align-center'
  } else if (alignError === ALIGN_OPTIONS.end) {
    errorAlignment = 'align-end'
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
        <small className={c(styles.error, literal && styles.errorLiteral, styles[errorAlignment])}>
          {inputStore.errorMessage && t && t(inputStore.errorMessage)}
        </small>
      )}
      {description && <span className={styles.description}>{description}</span>}
    </div>
  )
}

InputWrapper.defaultProps = {
  wrapperClassName: null,
  inputStore: undefined,
  label: '',
  t: undefined,
  as: Input,
  placeholder: null,
  description: null,
  alignError: ALIGN_OPTIONS.start,
  inputRef: undefined,
  required: false,
  literal: false,
  // eslint-disable-next-line no-restricted-globals
  name: null,
}

export default memo(observer(InputWrapper))
