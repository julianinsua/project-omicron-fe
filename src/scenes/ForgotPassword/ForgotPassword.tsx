import { FC, useCallback, useState } from 'react'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import c from 'classnames'
import AuthContainer from 'presentation/AuthContainer'
import InputWrapper from 'presentation/InputWrapper'
import Button from 'presentation/Button'
import { LOGIN, SIGNUP } from 'routing/paths'
import ForgotPasswordStore from './ForgotPasswordStore'
import styles from './forgotPassword.module.scss'

const ForgotPassword: FC = () => {
  const [forgotPasswordStore] = useState(() => new ForgotPasswordStore())
  const { t } = useTranslation('common')

  const handleChangeEmail = useCallback((e) => {
    forgotPasswordStore.setEmail(e.target.value)
  }, [])

  const handleSubmitForgotPassword = useCallback(() => {
    forgotPasswordStore.requestPaswordReset()
  }, [])

  return (
    <AuthContainer>
      <form className={styles.inputContainer}>
        <InputWrapper
          inputStore={forgotPasswordStore.email}
          type="email"
          material
          t={t}
          label={t('email')}
          onChange={handleChangeEmail}
          wrapperClassName={styles.input}
        />
      </form>
      <Button
        type="submit"
        label={t('sendResetEmail')}
        material
        onClick={handleSubmitForgotPassword}
      />
      <Link to={SIGNUP} className={c(styles.link, styles.signupLink)}>
        {t('signup')}
      </Link>
      <Link to={LOGIN} className={c(styles.link, styles.loginLink)}>
        {t('login')}
      </Link>
    </AuthContainer>
  )
}

export default observer(ForgotPassword)
