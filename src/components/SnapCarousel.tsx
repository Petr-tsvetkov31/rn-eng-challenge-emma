import { forwardRef, useCallback, useState } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import Animated, {
  runOnJS,
  runOnUI,
  useAnimatedScrollHandler,
  useDerivedValue
} from 'react-native-reanimated'

import { ActiveScroll, UserItem, UsersData } from '../helpers/types'
import { MemoizedAvatarItem, ItemWidth } from './AvatarItem'

const ScreenCenterForItem = Dimensions.get('screen').width / 2 - ItemWidth / 2

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: ScreenCenterForItem,
    paddingVertical: 20
  }
})

type Props = {
  data: UsersData
  position: Animated.SharedValue<number>
  onSelectCarouselItem: (index: number) => void
  activeScroll: Animated.SharedValue<ActiveScroll>
}

export const SnapCarousel = forwardRef<Animated.ScrollView, Props>(
  (props, ref) => {
    const { data, position, activeScroll, onSelectCarouselItem } = props
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [disableScroll, setDisableScroll] = useState(false)

    const onItemPress = useCallback(
      (index: number) => {
        runOnUI(onSelectCarouselItem)(index)
      },
      [onSelectCarouselItem]
    )

    const selectItem = (x: number) => {
      const index = Math.round(x / ItemWidth)
      if (index > -1 && index < data.users.length) {
        setSelectedIndex(index)
      }
    }

    useDerivedValue(() => {
      runOnJS(selectItem)(position.value)
    }, [position])

    useDerivedValue(() => {
      if (activeScroll.value !== 'pager') {
        runOnJS(setDisableScroll)(false)
      } else {
        runOnJS(setDisableScroll)(true)
      }
    }, [activeScroll])

    const renderItem = (user: UserItem, index: number) => {
      return (
        <MemoizedAvatarItem
          key={user.id}
          index={index}
          item={user}
          onPress={onItemPress}
          isSelected={selectedIndex === index}
        />
      )
    }

    const scrollHandler = useAnimatedScrollHandler(
      {
        onScroll: (event) => {
          position.value = event.contentOffset.x
        },
        onBeginDrag: () => {
          activeScroll.value = 'carousel'
        },
        onMomentumEnd: () => {
          activeScroll.value = 'none'
        }
      },
      [activeScroll]
    )

    return (
      <Animated.ScrollView
        ref={ref}
        contentContainerStyle={styles.content}
        horizontal
        snapToInterval={ItemWidth}
        renderToHardwareTextureAndroid
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={1}
        removeClippedSubviews
        pointerEvents={disableScroll ? 'none' : 'auto'}
      >
        {data.users.map(renderItem)}
      </Animated.ScrollView>
    )
  }
)
