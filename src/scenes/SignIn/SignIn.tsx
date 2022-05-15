import { FC, useState, useContext, useCallback } from 'react'
import { observer } from 'mobx-react'
import { Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { StoreContext } from 'providers/storeContext'
import Button from 'presentation/Button'
import InputWrapper from 'presentation/InputWrapper'
import SignInStore from './SignInStore'

const SignIn: FC<any> = () => {
  const { t } = useTranslation('common')
  const { authStore } = useContext(StoreContext)
  const [signInStore] = useState(() => new SignInStore())

  const handleChangeUsername = useCallback((e) => {
    signInStore.setUserName(e.target.value)
  }, [])

  const handleChangePassword = useCallback((e) => {
    signInStore.setPassword(e.target.value)
  }, [])

  if (authStore.isAuthenticated) {
    return <Navigate to="/auth/dashboard" />
  }

  return (
    <div>
      <InputWrapper
        material
        inputStore={signInStore.username}
        onChange={handleChangeUsername}
        label={t('user')}
      />
      <InputWrapper
        material
        inputStore={signInStore.password}
        onChange={handleChangePassword}
        label={t('password')}
      />
      <Button label={t('signIn')} material secondary />
    </div>
  )
}

export default observer(SignIn)
