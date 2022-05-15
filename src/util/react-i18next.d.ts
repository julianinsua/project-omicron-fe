import { resources, defaultNS } from 'util/i18n'

// react-i18next versions lower than 11.11.0
declare module 'react-i18next' {
  type DefaultResources = typeof resources['en']
}

// react-i18next versions higher than 11.11.0
declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS
    resources: typeof resources['en']
  }
}
