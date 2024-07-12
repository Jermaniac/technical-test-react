import { useEffect, useRef, useState } from 'react'
import './App.css'
import { type APIResponse, type User } from './types.ts'
import UserList from './components/UserList.tsx'

function App() {
  const [people, setPeople] = useState<User[]>([])
  const [colorRows, setColorRows] = useState<boolean>(false)
  const [sortByCountry, setSortByCountry] = useState<boolean>(false)
  const originalPeople = useRef<User[]>([])

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(async (res) => await res.json())
      .then((data: APIResponse) => {
        setPeople(data.results)
        originalPeople.current = data.results
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  const toggleColorSwitch = () => {
    setColorRows(!colorRows)
  }

  const toggleSortByCountry = () => {
    setSortByCountry(!sortByCountry)
  }

  const sortedUsers = () =>
    sortByCountry
      ? people.toSorted((a, b) => {
          return a.location.country.localeCompare(b.location.country)
        })
      : people

  const resetState = () => {
    setPeople(originalPeople.current)
  }

  const deleteRow = (userIdDeleted: string | null) => {
    const filteredPeople = [...people].filter(
      (user) => user.id.value !== userIdDeleted
    )
    setPeople(filteredPeople)
  }

  return (
    <>
      <div>Technical test</div>
      <header>
        <button onClick={toggleColorSwitch}> Color rows</button>
        <button onClick={toggleSortByCountry}> Sort by country</button>
        <button onClick={resetState}> Restore initial state</button>
      </header>
      <main>
        <UserList
          handleDelete={deleteRow}
          colorRows={colorRows}
          users={sortedUsers()}
        />
      </main>
    </>
  )
}

export default App
