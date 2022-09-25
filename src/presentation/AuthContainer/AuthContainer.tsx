import { useTranslation } from 'react-i18next'
import { FC, ReactElement } from 'react'
import AuthBox from 'presentation/AuthBox/AuthBox'
import LanguageChangeSelect from 'presentation/LanguageChangeSelect/LanguageChangeSelect'
import styles from './authContainer.module.scss'

interface PropsInterface {
  children: ReactElement | ReactElement[]
}

const AuthContainer: FC<PropsInterface> = ({ children }) => {
  const { t } = useTranslation('common')
  return (
    <div className={styles.container}>
      <AuthBox>{children}</AuthBox>
      <div>
        <div className={styles.language}>
          <LanguageChangeSelect />
        </div>
        <p className={styles.author}>
          {t('intro')}
          <a href="https://github.com/julianinsua" className={styles.link}>
            Julian Insua
          </a>
        </p>
      </div>
    </div>
  )
}

export default AuthContainer
