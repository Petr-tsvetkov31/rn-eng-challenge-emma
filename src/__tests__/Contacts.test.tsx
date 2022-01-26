import { describe, expect, it, jest } from '@jest/globals'
import { render } from '@testing-library/react-native'

import UsersData from '../../data.json'
import Contacts from '../Contacts'

const goBack = jest.fn()
const navigate = jest.fn()
const setOptions = jest.fn()

describe('<Contacts />', () => {
  it('should render contacts', () => {
    const { getAllByTestId } = render(
      <Contacts
        route={{
          params: { users: UsersData.users },
          key: '',
          name: 'Contacts'
        }}
        //@ts-ignore
        navigation={{ goBack, navigate, setOptions }}
      />
    )

    const avatarElements = getAllByTestId('AvatarItem')
    expect(avatarElements.length).toBe(UsersData.users.length)

    const pageElements = getAllByTestId('Page')
    expect(pageElements.length).toBe(UsersData.users.length)
  })

  it('after initial render first user should be selected', () => {
    const { getAllByTestId } = render(
      <Contacts
        route={{
          params: { users: UsersData.users },
          key: '',
          name: 'Contacts'
        }}
        //@ts-ignore
        navigation={{ goBack, navigate, setOptions }}
      />
    )
    const avatarElements = getAllByTestId('AvatarItem')
    const firstAvatar = avatarElements[0].parent.parent

    expect(firstAvatar.props.index).toBe(0)
    expect(firstAvatar.props.isSelected).toBeTruthy()
  })
})
