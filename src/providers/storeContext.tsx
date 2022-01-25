import { createContext, FC, ReactNode } from 'react'
import RootStore from '../stores/RootStore'

const StoreContext = createContext<null | RootStore>(null)

const GeneralProvider: FC<PropsInterface> = ({ rootStore, children }) => {
  return <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
}

interface PropsInterface {
  rootStore: RootStore
  children: ReactNode
}

export default GeneralProvider
