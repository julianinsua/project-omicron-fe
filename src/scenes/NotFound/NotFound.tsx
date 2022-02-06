import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './notFound.module.scss'
import Button from '../../presentation/Button'
import { DASHBOARD } from '../../routing/paths'
import { Link } from 'react-router-dom'

const NotFound: FC<PropTypes> = () => {
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

interface PropTypes {}

export default NotFound
