import { FC, useContext, useCallback, useState } from 'react'
import { observer } from 'mobx-react'
import { Navigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import c from 'classnames'
import { StoreContext } from 'providers/storeContext'
import AuthContainer from 'presentation/AuthContainer/AuthContainer'
import Button from 'presentation/Button'
import InputWrapper from 'presentation/InputWrapper'
import { DASHBOARD, LOGIN, FORGOT_PASSWORD } from 'routing/paths'
import SignUpStore from './SignUpStore'
import styles from './signUp.module.scss'

const SignUp: FC = () => {
  const { t } = useTranslation('common')
  const { authStore } = useContext(StoreContext)
  const [signUpStore] = useState(() => new SignUpStore())

  if (authStore.isAuthenticated) {
    return <Navigate to={DASHBOARD} />
  }

  const handleChangeEmail = useCallback((e) => {
    signUpStore.setEmail(e.target.value)
  }, [])

  const handleChangePassword = useCallback((e) => {
    signUpStore.setPassword(e.target.value)
  }, [])

  const handleChangeRepeatPassword = useCallback((e) => {
    signUpStore.setRepeatPassword(e.target.value)
  }, [])

  const handleSignUpClick = useCallback(() => {
    signUpStore.signUp()
  }, [])

  return (
    <AuthContainer>
      <form className={styles.inputContainer} onSubmit={handleSignUpClick}>
        <InputWrapper
          t={t}
          type="email"
          autoFocus
          material
          label={t('email')}
          inputStore={signUpStore.email}
          onChange={handleChangeEmail}
          wrapperClassName={styles.input}
        />

        <InputWrapper
          t={t}
          material
          label={t('password')}
          type="password"
          inputStore={signUpStore.password}
          onChange={handleChangePassword}
          wrapperClassName={styles.input}
        />

        <InputWrapper
          t={t}
          material
          label={t('repeatPassword')}
          type="password"
          inputStore={signUpStore.repeatPassword}
          onChange={handleChangeRepeatPassword}
          wrapperClassName={styles.input}
        />
      </form>

      <Button label={t('signup')} onClick={handleSignUpClick} />
      <Link to={LOGIN} className={c(styles.link, styles.signupLink)}>
        {t('login')}
      </Link>
      <Link to={FORGOT_PASSWORD} className={c(styles.link, styles.forgotPasswordLink)}>
        {t('forgotPassword')}
      </Link>
    </AuthContainer>
  )
}

export default observer(SignUp)
