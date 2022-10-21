import { FC, useState, useContext, useCallback } from 'react'
import { observer } from 'mobx-react'
import { Link, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import c from 'classnames'
import { StoreContext } from 'providers/storeContext'
import { FORGOT_PASSWORD, SIGNUP } from 'routing/paths'
import AuthContainer from 'presentation/AuthContainer/AuthContainer'
import Button from 'presentation/Button'
import InputWrapper from 'presentation/InputWrapper'
import SignInStore from './SignInStore'
import styles from './signIn.module.scss'

const SignIn: FC<any> = () => {
  const { t } = useTranslation('common')
  const { authStore } = useContext(StoreContext)
  const [signInStore] = useState(() => new SignInStore(authStore))

  const handleChangeUsername = useCallback((e) => {
    signInStore.setUserName(e.target.value)
  }, [])

  const handleChangePassword = useCallback((e) => {
    signInStore.setPassword(e.target.value)
  }, [])

  const handleSubmitLogin = useCallback(() => {
    signInStore.signIn()
  }, [signInStore])

  if (authStore.isAuthenticated) {
    return <Navigate to="/auth/dashboard" />
  }

  return (
    <AuthContainer>
      <form className={styles.inputContainer} onSubmit={handleSubmitLogin}>
        <InputWrapper
          t={t}
          material
          inputStore={signInStore.username}
          onChange={handleChangeUsername}
          label={t('user')}
          wrapperClassName={styles.input}
        />
        <InputWrapper
          t={t}
          material
          inputStore={signInStore.password}
          onChange={handleChangePassword}
          label={t('password')}
          wrapperClassName={styles.input}
          type="password"
        />
      </form>
      <Button type="submit" label={t('signIn')} material onClick={handleSubmitLogin} />
      <Link to={SIGNUP} className={c(styles.link, styles.signupLink)}>
        {t('signup')}
      </Link>
      <Link to={FORGOT_PASSWORD} className={c(styles.link, styles.forgotPasswordLink)}>
        {t('forgotPassword')}
      </Link>
    </AuthContainer>
  )
}

export default observer(SignIn)
