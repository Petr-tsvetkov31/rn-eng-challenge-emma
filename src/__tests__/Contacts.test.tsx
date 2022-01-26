import { describe, expect, it } from '@jest/globals'
import { render } from '@testing-library/react-native'

import UsersData from '../../data.json'
import Contacts from '../Contacts'

describe('<Contacts />', () => {
  it('should render 3 contacts', () => {
    const { getAllByTestId } = render(<Contacts users={UsersData.users} />)

    const avatarElements = getAllByTestId('AvatarItem')
    expect(avatarElements.length).toBe(UsersData.users.length)

    const pageElements = getAllByTestId('Page')
    expect(pageElements.length).toBe(UsersData.users.length)
  })

  it('after initial render first user should be selected', () => {
    const { getAllByTestId } = render(<Contacts users={UsersData.users} />)
    const avatarElements = getAllByTestId('AvatarItem')
    const firstAvatar = avatarElements[0].parent.parent

    expect(firstAvatar.props.index).toBe(0)
    expect(firstAvatar.props.isSelected).toBeTruthy()
  })
})
