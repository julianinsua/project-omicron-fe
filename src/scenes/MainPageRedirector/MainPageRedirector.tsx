import { FC } from 'react'
import { Redirect } from 'react-router'
import { DASHBOARD } from 'routing/paths'

const MainPageRedirector: FC = () => <Redirect to={DASHBOARD} />

export default MainPageRedirector
