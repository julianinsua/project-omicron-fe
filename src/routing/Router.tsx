import { Suspense, FC, useContext } from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import LoadingRing from 'presentation/LoadingRing'
import { StoreContext } from 'providers/storeContext'
import RootStore from 'stores/RootStore'
import routes from './routes'
import PublicRouter from './PublicRouter'
import PrivateRouter from './PrivateRouter'
import { LOGIN } from './paths'

const Router: FC<PropsInterface> = () => {
  const { authStore } = useContext(StoreContext) as RootStore
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingRing center />}>
        <Switch>
          <PublicRouter publicRoutes={routes.publicRoutes} />
          <PrivateRouter
            isAuthenticated={authStore.isAuthenticated}
            privateRoutes={routes.privateRoutes}
            redirectPath={LOGIN}
          />
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}

interface PropsInterface {}

export default Router
