import { FC, FunctionComponent, ReactElement } from 'react'
import styles from './layout.module.scss'

const Layout: FC<PropTypes> = ({
  sidebar: Sidebar,
  header: Header,
  mainContent: MainContent,
  children,
}) => {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <Header />
      </header>
      <nav>
        <Sidebar />
      </nav>
      <MainContent>{children}</MainContent>
    </div>
  )
}

interface PropTypes {
  sidebar: FunctionComponent
  header: FunctionComponent
  mainContent: FunctionComponent
  children: ReactElement
}

export default Layout
