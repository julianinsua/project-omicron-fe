import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import LoadingRing from 'presentation/LoadingRing'
import RootStore from 'stores/RootStore'
import AuthStore from 'stores/AuthStore'
import GeneralProvider from 'providers/storeContext'
import Router from 'routing/Router'
import axiosInterceptors from 'util/axiosInterceptors'
import 'styles/base.scss'
import 'util/i18n'

const rootStore = new RootStore(new AuthStore())

axiosInterceptors(rootStore)

const App = () => {
  if (rootStore.authStore.isLoading) return <LoadingRing center />

  return (
    <GeneralProvider rootStore={rootStore}>
      <BrowserRouter>
        <Suspense fallback={<LoadingRing center />}>
          <Router />
        </Suspense>
      </BrowserRouter>
    </GeneralProvider>
  )
}

export default App
