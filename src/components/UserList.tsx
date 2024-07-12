import { type User } from '../types.ts'

interface Props {
  colorRows: boolean
  users: User[]
  handleDelete: Function
}

const UserList = ({ colorRows, users, handleDelete }: Props) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Photo</th>
          <th>Name</th>
          <th>Surname</th>
          <th>Country</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user: User, index: number) => {
          const color = index % 2 === 0 ? '#333' : 'black'
          const coloredStyle = colorRows ? color : 'transparent'
          const userId = `${user.id.value}_${index}`
          return (
            <tr key={userId} style={{ backgroundColor: coloredStyle }}>
              <td>
                <img src={user.picture.thumbnail} />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button onClick={() => handleDelete(user.id.value)}>
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
