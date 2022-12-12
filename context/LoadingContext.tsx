import {
  useState,
  createContext,
  ReactNode,
  SetStateAction,
  Dispatch,
} from 'react'

interface ILoadingContext {
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
}

const LoadingContext = createContext<ILoadingContext>({
  loading: false,
  setLoading: () => false,
})

const LoadingContextProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  )
}

export { LoadingContextProvider, LoadingContext }
