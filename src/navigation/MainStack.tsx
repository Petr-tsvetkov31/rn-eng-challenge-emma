import { createNativeStackNavigator } from '@react-navigation/native-stack'

import UsersData from '../../data.json'
import Contacts from '../Contacts'
import ContactDetails from '../components/ContactDetails'
import { MainStackType } from '../helpers/types'

const Stack = createNativeStackNavigator<MainStackType>()

export default function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Contacts"
        component={Contacts}
        initialParams={{ users: UsersData.users }}
      />
      <Stack.Screen
        name="ContactDetails"
        component={ContactDetails}
        options={{ headerTitle: 'Details' }}
      />
    </Stack.Navigator>
  )
}
