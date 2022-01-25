import {
  forwardRef,
  ForwardRefRenderFunction,
  useCallback,
  useImperativeHandle,
  useState
} from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import Animated, {
  runOnJS,
  runOnUI,
  scrollTo,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue
} from 'react-native-reanimated'

import { ActiveScroll, UserItem } from '../helpers/types'
import { getOffsetFromPercentage, getOffsetPercentage } from '../helpers/utils'
import { MemoizedAvatarItem, ItemWidth } from './AvatarItem'

const ScreenCenterForItem = Dimensions.get('screen').width / 2 - ItemWidth / 2

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: ScreenCenterForItem,
    paddingVertical: 20
  }
})

type Props = {
  users: UserItem[]
  positionPercentage: Animated.SharedValue<number>
  onSelectCarouselItem: (index: number) => void
  activeScroll: Animated.SharedValue<ActiveScroll>
}

type Handle = {
  scrollToOffset: (offsetX: number, animated: boolean) => void
}

const SnapCarousel: ForwardRefRenderFunction<Handle, Props> = (
  { users, positionPercentage, activeScroll, onSelectCarouselItem },
  ref
) => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [disableScroll, setDisableScroll] = useState(false)

  const scrollToOffset = useCallback(
    (offsetX: number, animated: boolean) => {
      runOnUI(scrollTo)(scrollRef, offsetX, 0, animated)
    },
    [scrollRef]
  )

  useImperativeHandle(
    ref,
    () => ({
      scrollToOffset
    }),
    [scrollToOffset]
  )

  const onItemPress = useCallback(
    (index: number) => {
      runOnUI(onSelectCarouselItem)(index)
    },
    [onSelectCarouselItem]
  )

  const selectItem = (x: number) => {
    const index = Math.round(x / ItemWidth)
    if (index > -1 && index < users.length) {
      setSelectedIndex(index)
    }
  }

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
        positionPercentage.value = getOffsetPercentage({
          offset: event.contentOffset.x,
          viewSize: ItemWidth
        })
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

  useDerivedValue(() => {
    const offset = getOffsetFromPercentage({
      offsetPercentage: positionPercentage.value,
      viewSize: ItemWidth
    })
    runOnJS(selectItem)(offset)
  }, [positionPercentage])

  useDerivedValue(() => {
    if (activeScroll.value !== 'pager') {
      runOnJS(setDisableScroll)(false)
    } else {
      runOnJS(setDisableScroll)(true)
    }
  }, [activeScroll])

  useDerivedValue(() => {
    const offsetX = getOffsetFromPercentage({
      offsetPercentage: positionPercentage.value,
      viewSize: ItemWidth
    })
    if (activeScroll.value === 'pager') {
      scrollTo(scrollRef, offsetX, 0, false)
    }
  }, [positionPercentage, activeScroll, scrollRef])

  return (
    <Animated.ScrollView
      testID="CarouselScroll"
      ref={scrollRef}
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
      {users.map(renderItem)}
    </Animated.ScrollView>
  )
}

export default forwardRef(SnapCarousel)
