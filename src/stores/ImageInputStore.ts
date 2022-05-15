import { action, makeObservable, observable } from 'mobx'
import Resizer from 'react-image-file-resizer'
import { base64Image, IMAGE_FORMATS } from 'Entities/interfaces/Common'

interface ImageErrorInterface {
  error: boolean
  message: string
}

const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif']

class ImageInputStore {
  @observable private id?: string

  @observable private image: Blob = new Blob()

  @observable public imageBase64?: base64Image

  @observable public urlImage?: string

  private fileReader?: any // @TODO Check if this makes sense

  @observable private savedImage = false

  @observable public loadingSaveImage = false

  @observable public imageTypeError: ImageErrorInterface = { error: false, message: '' }

  private maxWidth = 300

  private maxHeight = 300

  private quality = 100

  private compressFormat: IMAGE_FORMATS = IMAGE_FORMATS.png

  private invalidErrorMessage = 'InvalidFileType'

  constructor() {
    makeObservable(this)
  }

  @action
  public setUrlImage(value: string) {
    this.urlImage = value
  }

  public setMaxWidth(value: number) {
    this.maxWidth = value
  }

  public setMaxHeight(value: number) {
    this.maxHeight = value
  }

  public setQuality(value: number) {
    this.quality = value
  }

  public setCompressFormat(value: IMAGE_FORMATS) {
    this.compressFormat = value
  }

  public setInvalidErrorMessage(value: string) {
    this.invalidErrorMessage = value
  }

  @action
  public handleFileRead() {
    Resizer.imageFileResizer(
      this.image, // file of the new image that can now be uploaded
      this.maxWidth, // max width of the new image
      this.maxHeight, // max height of the new image
      this.compressFormat, // format of the new image
      this.quality, // quality of the new image
      0, // rotation of the new image
      (uri) => {
        this.loadingSaveImage = false
        this.imageBase64 = uri
      } // callback function stores base64 image
    )
  }

  @action
  public setImageTypeError(message: string) {
    this.imageTypeError = { error: true, message }
  }

  @action
  public clearImageTypeError() {
    this.imageTypeError = { error: false, message: '' }
  }

  private validateImage(file: File) {
    if (!allowedTypes.includes(file.type)) {
      this.setImageTypeError(this.invalidErrorMessage)
      return false
    }

    return true
  }

  @action
  public selectImage(file: File) {
    if (this.validateImage(file)) {
      this.clearImageTypeError()

      this.loadingSaveImage = true
      this.image = file
      this.fileReader = new FileReader()
      this.fileReader.onloadend = this.handleFileRead()

      this.fileReader.readAsDataURL(this.image)
    }
  }

  @action
  setImage(image: Blob) {
    this.image = image
  }

  public static convertBase64ToFile(image: string) {
    // @TODO check if this solution actually works
    /*
      const byteString = atob(image.split(',')[1])
      const ab = new ArrayBuffer(byteString.length)

      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
      }
    */
    const ab = Buffer.from(image, 'base64')

    return new Blob([ab], { type: 'image/jpeg' })
  }
}

export default ImageInputStore
