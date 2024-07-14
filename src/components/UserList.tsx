import { SORT_TYPES, type User } from '../types.ts'

interface Props {
  colorRows: boolean
  users: User[]
  handleDelete: (id: string) => void
  selectSortType: (type: SORT_TYPES) => void
}

const UserList = ({ colorRows, users, handleDelete, selectSortType }: Props) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Photo</th>
          <th onClick={() => { selectSortType(SORT_TYPES.NAME) }} style={{ cursor: 'pointer' }}>Name</th>
          <th onClick={() => { selectSortType(SORT_TYPES.SURNAME) }} style={{ cursor: 'pointer' }}>Surname</th>
          <th onClick={() => { selectSortType(SORT_TYPES.COUNTRY) }} style={{ cursor: 'pointer' }}>Country</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user: User, index: number) => {
          const color = index % 2 === 0 ? '#333' : 'black'
          const coloredStyle = colorRows ? color : 'transparent'
          const userId = user.login.uuid
          return (
            <tr key={userId} style={{ backgroundColor: coloredStyle }}>
              <td>
                <img src={user.picture.thumbnail} />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button onClick={() => { handleDelete(userId) }}>
                  Delete
                </button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default UserList
