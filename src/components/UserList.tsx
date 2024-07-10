import { type User } from '../types.ts'

interface Props {
  colorRows: boolean
  users: User[]
}

const UserList = ({ colorRows, users }: Props) => {
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
          return (
            <tr
              key={`${user.id.value}_${index}`}
              style={{ backgroundColor: coloredStyle }}
            >
              <td>
                <img src={user.picture.thumbnail} />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button>Delete</button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default UserList
