import { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { DASHBOARD } from 'routing/paths'

const MainPageRedirector: FC = () => <Navigate to={DASHBOARD} />

export default MainPageRedirector
