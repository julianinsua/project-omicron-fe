import { FC, Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import LoadingRing from 'presentation/LoadingRing'
import routes from './routes'

const Router: FC = () => {
  const navigation = useRoutes(routes)

  return (
    <>
      <Suspense fallback={<LoadingRing center />} />
      {navigation}
    </>
  )
}

export default Router
