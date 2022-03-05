import { FC, memo, ReactNode, useCallback, useRef } from 'react'
import { observer } from 'mobx-react'
import ImageInputStore from 'stores/ImageInputStore'
import c from 'classnames'
import Button from '../Button'
const styles = require('./imageInput.module.scss')

const ImageInput: FC<PropTypes> = ({
  literal = false,
  round = false,
  inputStore,
  uploadButtonText,
  placeholder = null,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { imageTypeError, imageBase64, urlImage, loadingSaveImage } = inputStore

  const handleButtonClick = useCallback(() => {
    inputRef?.current?.click()
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
    }
  }, [])

  const onChangeFile = useCallback(
    (e) => {
      e.stopPropagation()
      e.preventDefault()

      const file = e.target.files[0]
      inputStore.selectImage(file)

      e.target.value = null
    },
    [inputStore]
  )

  let showImage
  if (imageBase64) {
    showImage = imageBase64
  } else if (urlImage) {
    showImage = urlImage
  }

  return (
    <>
      {literal ? (
        <div className={c(styles.image, styles.literalImage, round && styles.round)}>
          {!showImage && placeholder}
        </div>
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.inputContainer}>
            <div
              className={c(
                styles.image,
                loadingSaveImage && styles.loadingImage,
                round && styles.round
              )}
              onClick={handleButtonClick}
              style={showImage ? { backgroundImage: `url(${showImage})` } : undefined}
              role="button"
              tabIndex={0}
            >
              {!showImage && placeholder}
            </div>
            <Button
              label={uploadButtonText}
              onClick={handleButtonClick}
              className={styles.uploadButton}
              smallest
            />
            {imageTypeError.error && <div className={styles.error}>{imageTypeError.message}</div>}
            <input
              style={{ display: 'none' }}
              onChange={onChangeFile}
              accept="image/*"
              ref={inputRef}
              type="file"
            />
          </div>
        </div>
      )}
    </>
  )
}

interface PropTypes {
  literal?: boolean
  inputStore: ImageInputStore
  uploadButtonText: string
  placeholder: ReactNode
  round?: boolean
}

export default memo(observer(ImageInput))
