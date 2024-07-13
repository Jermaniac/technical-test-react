import { useEffect, useRef, useState } from 'react'
import './App.css'
import { type APIResponse, type User } from './types.ts'
import UserList from './components/UserList.tsx'

function App() {
  const [people, setPeople] = useState<User[]>([])
  const [colorRows, setColorRows] = useState<boolean>(false)
  const [sortByCountry, setSortByCountry] = useState<boolean>(false)
  const originalPeople = useRef<User[]>([])
  const [country, setCountry] = useState<String>('')

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

  const sortedUsers = (filteredPeople : User[]) =>
    sortByCountry
      ? filteredPeople.toSorted((a: User, b: User) => {
          return a.location.country.localeCompare(b.location.country)
        })
      : filteredPeople

  const resetState = () => {
    setPeople(originalPeople.current)
  }

  const deleteRow = (userIdDeleted: string | null) => {
    const filteredPeople = [...people].filter(
      (user) => user.id.value !== userIdDeleted
    )
    setPeople(filteredPeople)
  }

  const filterByCountry = () => [...people].filter(
      (user) => user.location.country.toLowerCase().includes(country.toLowerCase())
    )

  const prepareData = () => {
    const filteredUsersByCountry = filterByCountry()
    return sortedUsers(filteredUsersByCountry)
  }

  return (
    <>
      <div>Technical test</div>
      <header>
        <button onClick={toggleColorSwitch}> Color rows</button>
        <button onClick={toggleSortByCountry}> Sort by country</button>
        <button onClick={resetState}> Restore initial state</button>
          <input type="text" onChange={(event) => setCountry(event?.target.value)}></input>
      </header>
      <main>
        <UserList
          handleDelete={deleteRow}
          colorRows={colorRows}
          users={prepareData()}
        />
      </main>
    </>
  )
}

export default App
