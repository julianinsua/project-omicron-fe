import { FC } from 'react'
import { Navigate } from 'react-router-dom'

const MainPageRedirector: FC = () => <Navigate to="/auth/dashboard" />

export default MainPageRedirector
