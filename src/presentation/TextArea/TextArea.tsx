import { FC, memo, Ref } from 'react'
import c from 'classnames'
import LiteralValue from 'presentation/LiteralValue'
import FormLabel from 'presentation/FormLabel'
const styles = require('./textArea.module.scss')

const TextArea: FC<PropTypes> = ({
  label = '',
  inputRef,
  error = false,
  value = '',
  literal = false,
  fullHeightLabel = false,
  minRows = 4,
  autosize = true,
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

interface PropTypes {
  label?: string
  inputRef?: Ref<any>
  error?: boolean
  value?: string
  literal?: boolean
  fullHeightLabel?: boolean
  minRows?: number
  autosize?: boolean
  [props: string]: any
}

export default memo(TextArea)
