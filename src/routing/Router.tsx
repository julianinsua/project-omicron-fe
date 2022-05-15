import { FC } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './routes'

const Router: FC = () => {
  return useRoutes(routes)
}

export default Router
