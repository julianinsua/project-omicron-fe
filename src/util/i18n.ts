import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import commonEn from 'lang/en/common.json'
import commonEs from 'lang/es/common.json'

export const defaultNS = 'common'
export const resources = {
  en: {
    common: commonEn,
  },
  es: {
    common: commonEs,
  },
} as const

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: 'en',

  ns: ['common'],
  defaultNS,

  debug: true,

  interpolation: {
    escapeValue: false,
  },

  resources,
})

export default i18n
