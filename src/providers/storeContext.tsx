import { createContext, FC, ReactNode } from 'react'
import RootStore from '../stores/RootStore'

export const StoreContext = createContext({} as RootStore)

const GeneralProvider: FC<PropsInterface> = ({ rootStore, children }) => {
  return <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
}

interface PropsInterface {
  rootStore: RootStore
  children: ReactNode
}

export default GeneralProvider
