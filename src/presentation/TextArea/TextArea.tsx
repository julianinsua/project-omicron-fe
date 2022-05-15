import { FC, memo, Ref } from 'react'
import c from 'classnames'
import LiteralValue from 'presentation/LiteralValue'
import FormLabel from 'presentation/FormLabel'
import styles from './textArea.module.scss'

interface PropTypes {
  label?: string
  inputRef?: Ref<any>
  error?: boolean
  value?: string
  literal?: boolean
  fullHeightLabel?: boolean
  minRows?: number
  [props: string]: any
}

const TextArea: FC<PropTypes> = ({
  label = '',
  inputRef,
  error = false,
  value = '',
  literal = false,
  fullHeightLabel = false,
  minRows = 4,
  ...props
}) =>
  literal ? (
    <LiteralValue label={label} value={value} />
  ) : (
    <label className={c(fullHeightLabel && styles.fullHeightLabel)}>
      {label && <FormLabel label={label} />}
      <textarea
        className={c(styles.input, fullHeightLabel && styles.fullHeightArea, error && styles.error)}
        ref={inputRef}
        value={value}
        rows={minRows}
        onKeyDown={(e) => {
          if (e.target instanceof HTMLTextAreaElement && e.key === 'escape') {
            e.target.blur()
          }
        }}
        {...props}
      />
    </label>
  )

TextArea.defaultProps = {
  label: '',
  inputRef: undefined,
  error: false,
  value: '',
  literal: false,
  fullHeightLabel: false,
  minRows: 4,
}

export default memo(TextArea)
