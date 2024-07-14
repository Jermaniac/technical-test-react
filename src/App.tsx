import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { type APIResponse, type User } from './types.ts'
import UserList from './components/UserList.tsx'

function App () {
  const [people, setPeople] = useState<User[]>([])
  const [colorRows, setColorRows] = useState<boolean>(false)
  const [sortByCountry, setSortByCountry] = useState<boolean>(false)
  const originalPeople = useRef<User[]>([])
  const [country, setCountry] = useState<string | null>(null)

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
    setSortByCountry(prev => !prev)
  }

  const resetState = () => {
    setPeople(originalPeople.current)
  }

  const deleteRow = (userIdDeleted: string) => {
    const filteredPeople = [...people].filter(
      (user) => user.login.uuid !== userIdDeleted
    )
    setPeople(filteredPeople)
  }

  const filterByCountry = useMemo(() => {
    console.log('filterByCoutnry')
    return country != null
      ? [...people].filter((user) =>
          user.location.country.toLowerCase().includes(country.toLowerCase())
        )
      : people
  }, [people, country])

  const sortedUsers = useMemo(() => {
    console.log('sortedUsers')
    return sortByCountry
      ? filterByCountry.toSorted((a: User, b: User) =>
        a.location.country.localeCompare(b.location.country)
      )
      : filterByCountry
  }, [filterByCountry, sortByCountry])

  return (
    <>
      <div>Technical test</div>
      <header>
        <button onClick={toggleColorSwitch}> Color rows</button>
        <button onClick={toggleSortByCountry}> Sort by country</button>
        <button onClick={resetState}> Restore initial state</button>
        <input
          type="text"
          onChange={(event) => {
            setCountry(event?.target.value)
          }}
        ></input>
      </header>
      <main>
        <UserList
          handleDelete={deleteRow}
          colorRows={colorRows}
          users={sortedUsers}
        />
      </main>
    </>
  )
}

export default App
