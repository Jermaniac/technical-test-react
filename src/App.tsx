import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { SORT_TYPES, type APIResponse, type User } from './types.ts'
import UserList from './components/UserList.tsx'

function App () {
  const [people, setPeople] = useState<User[]>([])
  const [colorRows, setColorRows] = useState<boolean>(false)
  const [sortBy, setSortBy] = useState<SORT_TYPES>(SORT_TYPES.NONE)
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
    switch (sortBy) {
      case SORT_TYPES.COUNTRY:
        return filterByCountry.toSorted((a: User, b: User) =>
          a.location.country.localeCompare(b.location.country)
        )
      case SORT_TYPES.NAME:
        return filterByCountry.toSorted((a: User, b: User) =>
          a.name.first.localeCompare(b.name.first)
        )
      case SORT_TYPES.SURNAME:
        return filterByCountry.toSorted((a: User, b: User) =>
          a.name.last.localeCompare(b.name.last)
        )
      default:
        return filterByCountry
    }
  }, [filterByCountry, sortBy])

  const selectSortBy = (type: SORT_TYPES) => {
    setSortBy(type)
  }

  return (
    <>
      <div>Technical test</div>
      <header>
        <button onClick={toggleColorSwitch}> Color rows</button>
        <button onClick={() => { selectSortBy(SORT_TYPES.COUNTRY) }}> Sort by country</button>
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
          selectSortType={selectSortBy}
          handleDelete={deleteRow}
          colorRows={colorRows}
          users={sortedUsers}
        />
      </main>
    </>
  )
}

export default App
