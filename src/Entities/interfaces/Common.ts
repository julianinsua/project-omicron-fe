import React from 'react'
import { Link } from 'react-router-dom'

export type ReactComponent = typeof React.Component | typeof Link

// Regular expresions (RegEx)
export const validNumber = /^-?\d*[.]?\d{0,2}$/

// Event Handlers
export type onChangeEventHandler<T> = (event: React.ChangeEvent<T>) => void
export type onClickEventHandler<T> = (event: React.MouseEvent<T>) => void

// Localization
export type TFunction = (key?: string, data?: Object) => string

// Common types. enums and interfaces
export enum IMAGE_FORMATS {
  png = 'PNG',
  jpg = 'JPG',
  jpeg = 'JPEG',
  gif = 'GIF',
}

export enum ALIGN_OPTIONS {
  start = 'start',
  center = 'center',
  end = 'end',
}

export type base64Image = string | Blob | File | ProgressEvent<FileReader>
