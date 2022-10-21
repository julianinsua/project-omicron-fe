import { FC, useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AuthContainer from 'presentation/AuthContainer'
import InputWrapper from 'presentation/InputWrapper'
import LiteralValue from 'presentation/LiteralValue'
import ResetPasswordStore from './ResetPaswordStore'
import styles from './resetPassword.module.scss'

const ResetPassword: FC = () => {
  const [resetPasswordStore] = useState(() => new ResetPasswordStore())
  const { token } = useParams()
  const { t } = useTranslation('common')

  useEffect(() => {
    if (token) {
      resetPasswordStore.checkToken(token)
    }
  }, [])

  const handleChangePassword = useCallback((e) => {
    resetPasswordStore.setPassword(e.target.value)
  }, [])

  const handleChangeRepeatPassword = useCallback((e) => {
    resetPasswordStore.setRepeatPassword(e.target.value)
  }, [])

  return (
    <AuthContainer>
      {token ? (
        <form className={styles.inputContainer}>
          <InputWrapper
            as={LiteralValue}
            label={t('email')}
            value="some email"
            wrapperClassName={styles.emailLiteral}
          />
          <InputWrapper
            inputStore={resetPasswordStore.password}
            label={t('password')}
            material
            wrapperClassName={styles.input}
            onChange={handleChangePassword}
          />
          <InputWrapper
            inputStore={resetPasswordStore.repeatPassword}
            label={t('repeatPassword')}
            material
            wrapperClassName={styles.input}
            onChange={handleChangeRepeatPassword}
          />
        </form>
      ) : (
        <div>bad luck pal</div>
      )}
    </AuthContainer>
  )
}

export default ResetPassword
