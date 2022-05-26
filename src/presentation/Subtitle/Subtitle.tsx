import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './subtitle.module.scss'

const Subtitle: FC = () => {
  const { t } = useTranslation('common')

  return <h2 className={styles.subtitle}>{t('subtitle')}</h2>
}

export default Subtitle
