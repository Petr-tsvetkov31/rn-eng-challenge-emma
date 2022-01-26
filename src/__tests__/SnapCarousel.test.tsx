import { describe, expect, it } from '@jest/globals'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import { useSharedValue } from 'react-native-reanimated'

import UsersData from '../../data.json'
import { ItemWidth } from '../components/AvatarItem'
import SnapCarousel from '../components/SnapCarousel'
import { ActiveScroll } from '../helpers/types'

const eventData = {
  nativeEvent: {
    contentOffset: {
      x: ItemWidth,
      y: 0
    },
    contentSize: {
      height: 150,
      width: 2658
    },
    layoutMeasurement: {
      height: 150,
      width: 390
    }
  }
}

describe('<SnapCarousel />', () => {
  it('after initial render first user should be selected', () => {
    const Carousel = () => {
      const users = UsersData.users
      const positionPercentage = useSharedValue(0)
      const activeScroll = useSharedValue<ActiveScroll>('none')
      const onSelect = () => {}
      return (
        <SnapCarousel
          users={users}
          positionPercentage={positionPercentage}
          activeScroll={activeScroll}
          onSelectCarouselItem={onSelect}
        />
      )
    }
    const { getAllByTestId } = render(<Carousel />)
    const avatarElements = getAllByTestId('AvatarItem')
    const firstAvatar = avatarElements[0].parent.parent

    expect(firstAvatar.props.index).toBe(0)
    expect(firstAvatar.props.isSelected).toBeTruthy()
  })

  it('should select second item because position set to second item', () => {
    const Carousel = () => {
      const users = UsersData.users
      const positionPercentage = useSharedValue(100)
      const activeScroll = useSharedValue<ActiveScroll>('none')
      const onSelect = () => {}
      return (
        <SnapCarousel
          users={users}
          positionPercentage={positionPercentage}
          activeScroll={activeScroll}
          onSelectCarouselItem={onSelect}
        />
      )
    }
    const { getAllByTestId } = render(<Carousel />)
    const avatarElements = getAllByTestId('AvatarItem')
    const secondAvatar = avatarElements[1].parent.parent

    expect(secondAvatar.props.index).toBe(1)
    expect(secondAvatar.props.isSelected).toBeTruthy()
  })

  it('should scroll to next item', async () => {
    const Carousel = () => {
      const users = UsersData.users
      const positionPercentage = useSharedValue(0)
      const activeScroll = useSharedValue<ActiveScroll>('none')
      const onSelect = () => {}
      return (
        <SnapCarousel
          users={users}
          positionPercentage={positionPercentage}
          activeScroll={activeScroll}
          onSelectCarouselItem={onSelect}
        />
      )
    }
    const { getByTestId, getAllByTestId } = render(<Carousel />)
    const initiallySelectedAvatar =
      getAllByTestId('AvatarItem')[0].parent.parent
    expect(initiallySelectedAvatar.props.isSelected).toBeTruthy()
    const carouselScroll = getByTestId('CarouselScroll')

    fireEvent.scroll(carouselScroll, eventData)
    await waitFor(() => {
      const avatarItems = getAllByTestId('AvatarItem')
      const firstAvatarItem = avatarItems[0].parent.parent
      const secondAvatarItem = avatarItems[1].parent.parent

      expect(firstAvatarItem.props.isSelected).toBeFalsy()
      expect(secondAvatarItem.props.isSelected).toBeTruthy()
    })
  })
})
