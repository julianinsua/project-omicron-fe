import { FC, useState, useContext, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate } from 'react-router-dom'
import { StoreContext } from 'providers/storeContext'
import { DASHBOARD } from 'routing/paths'
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

  if (authStore.isAuthenticated) {
    return <Navigate to={DASHBOARD} />
  }

  return (
    <div>
      <InputWrapper
        inputStore={signInStore.username}
        onChange={handleChangeUsername}
        label={t('user')}
      />
      <Button label={t('signIn')} material secondary />
    </div>
  )
}

export default SignIn
