import { createContext, useContext, useState } from 'react'

interface Person {
  name: string;
  id: number;
  q1: number | null;
  q2: string | null;
  q3: number | null;
  q4: string | null;
}

// create the context
const DataContext = createContext<{data: Person[], setData: React.Dispatch<React.SetStateAction<Person[]>>}>({
  data: [],
  setData: () => {}
})

// create a custom hook to access the context
export function useData() {
  return useContext(DataContext)
}

// create a provider component
export function DataProvider({ children }: {children: React.ReactNode}) {
  const [ data, setData ] = useState<Person[]>([
    {
      name: 'Timmy Tim',
      id: 0,
      q1: null,
      q2: null,
      q3: null,
      q4: null
    },
    {
      name: 'Emily Em',
      id: 1,
      q1: null,
      q2: null,
      q3: null,
      q4: null
    },
    {
      name: 'Billy Cool',
      id: 2,
      q1: null,
      q2: null,
      q3: null,
      q4: null
    },
    {
      name: 'Sally Funny',
      id: 3,
      q1: null,
      q2: null,
      q3: null,
      q4: null
    }
  ])

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  )
}