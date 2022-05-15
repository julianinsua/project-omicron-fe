import LoadingRing from 'presentation/LoadingRing'
import RootStore from 'stores/RootStore'
import AuthStore from 'stores/AuthStore'
import GeneralProvider from 'providers/storeContext'
import Router from 'routing/Router'
import axiosInterceptors from 'util/axiosInterceptors'
import 'styles/base.scss'
import 'util/i18n'
import { BrowserRouter } from 'react-router-dom'

const rootStore = new RootStore(new AuthStore())

axiosInterceptors(rootStore)

const App = () => {
  if (rootStore.authStore.isLoading) return <LoadingRing center />

  return (
    <GeneralProvider rootStore={rootStore}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </GeneralProvider>
  )
}

export default App
