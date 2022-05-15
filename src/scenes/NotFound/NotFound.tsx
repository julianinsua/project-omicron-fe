import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Button from 'presentation/Button'
import { DASHBOARD } from 'routing/paths'
import styles from './notFound.module.scss'

const NotFound: FC = () => {
  const { t } = useTranslation()

  return (
    <div className={styles.container}>
      <div className={styles.title}>{t('error404')}</div>
      <div className={styles.subtitle}>{t('error404Message')}</div>
      <div>
        <Button label={t('backToMainPage')} as={Link} to={DASHBOARD} />
      </div>
    </div>
  )
}

export default NotFound
