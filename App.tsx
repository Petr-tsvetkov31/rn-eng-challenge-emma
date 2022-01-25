import UsersData from './data.json'
import Contacts from './src/Contacts'

export default function App() {
  return <Contacts users={UsersData.users} />
}
