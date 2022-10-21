import { FC, useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import AuthorizedNavbar from 'presentation/AuthorizedNavbar'
import AuthorizedHeader from 'presentation/AuthorizedHeader'
import AuthorizedContentWrapper from 'presentation/AuthorizedContentWrapper'
import { StoreContext } from 'providers/storeContext'
import { LOGIN } from 'routing/paths'
import styles from './layout.module.scss'

interface PropTypes {
  sidebar?: FC<any>
  header?: FC<any>
  mainContent?: FC<any>
}

const Layout: FC<PropTypes> = ({ sidebar: Sidebar, header: Header, mainContent: MainContent }) => {
  const { authStore } = useContext(StoreContext)

  if (!authStore.isAuthenticated) {
    return <Navigate to={LOGIN} />
  }

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>{Header && <Header />}</header>
      <nav>{Sidebar && <Sidebar />}</nav>
      {MainContent && (
        <MainContent>
          <Outlet />
        </MainContent>
      )}
    </div>
  )
}

Layout.defaultProps = {
  sidebar: AuthorizedNavbar,
  header: AuthorizedHeader,
  mainContent: AuthorizedContentWrapper,
}

export default Layout
