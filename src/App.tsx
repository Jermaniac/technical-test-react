import { useEffect, useState } from 'react'
import './App.css'
import { type APIResponse, type User } from './types.ts'
import UserList from './components/UserList.tsx'

function App() {
  const [people, setPeople] = useState<User[]>([])
  const [colorRows, setColorRows] = useState<boolean>(false)

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(async (res) => await res.json())
      .then((data: APIResponse) => {
        setPeople(data.results)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  const toggleColorSwitch = () => {
    setColorRows(!colorRows)
  }

  return (
    <>
      <div>Technical test</div>
      <header>
        <button onClick={toggleColorSwitch}> Color rows</button>
      </header>
      <main>
        <UserList colorRows={colorRows} users={people} />
      </main>
    </>
  )
}

export default App
