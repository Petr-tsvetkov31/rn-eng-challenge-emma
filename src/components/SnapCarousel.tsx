import { useRef, useState } from 'react'
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet
} from 'react-native'

import DATA from '../../data.json'
import AvatarItem, { UserItem, ItemWidth } from './AvatarItem'

const ScreenCenterForItem = Dimensions.get('screen').width / 2 - ItemWidth / 2

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: ScreenCenterForItem,
    paddingVertical: 20
  }
})

export default function SnapCarousel() {
  const data = DATA as { users: UserItem[] }
  const [selectedIndex, setSelectedIndex] = useState(0)
  const ref = useRef<FlatList<UserItem>>(null)

  const onItemPress = (index: number) => {
    ref.current?.scrollToIndex({ index, animated: true, viewPosition: 0.5 })
  }

  const renderItem = ({ item, index }: { item: UserItem; index: number }) => {
    return (
      <AvatarItem
        index={index}
        item={item}
        onPress={onItemPress}
        isSelected={selectedIndex === index}
      />
    )
  }

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {
      nativeEvent: {
        contentOffset: { x }
      }
    } = event

    const index = Math.round(x / ItemWidth)
    if (index >= 0 && index !== selectedIndex) {
      setSelectedIndex(index)
    }
  }

  const keyExtractor = (item: UserItem) => item.id

  return (
    <FlatList
      ref={ref}
      contentContainerStyle={styles.content}
      data={data.users}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      horizontal
      snapToInterval={ItemWidth}
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false}
      onScroll={onScroll}
      scrollEventThrottle={30}
    />
  )
}
