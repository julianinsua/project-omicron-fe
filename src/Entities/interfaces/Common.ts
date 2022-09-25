import React from 'react'
import { Link } from 'react-router-dom'

export type ReactComponent = typeof React.Component | typeof Link

// Regular expresions (RegEx)
export const validNumber = /^-?\d*[.]?\d{0,2}$/
export const validEmail = /\S+@\S+\.\S+/

// Event Handlers
export type onChangeEventHandler<T> = (event: React.ChangeEvent<T>) => void
export type onClickEventHandler<T> = (event: React.MouseEvent<T>) => void

// Localization
export type TFunction = (key?: string, data?: Record<string, unknown>) => string

// Common types. enums and interfaces
// eslint-disable-next-line no-shadow
export enum IMAGE_FORMATS {
  png = 'PNG',
  jpg = 'JPG',
  jpeg = 'JPEG',
  gif = 'GIF',
}

// eslint-disable-next-line no-shadow
export enum ALIGN_OPTIONS {
  start = 'align-start',
  center = 'align-center',
  end = 'align-end',
}

export type base64Image = string | Blob | File | ProgressEvent<FileReader>
