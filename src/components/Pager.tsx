import {
  useState,
  forwardRef,
  ForwardRefRenderFunction,
  useCallback,
  useImperativeHandle
} from 'react'
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
import { MemoizedPage } from './Page'

type Props = {
  users: UserItem[]
  positionPercentage: Animated.SharedValue<number>
  activeScroll: Animated.SharedValue<ActiveScroll>
  pageHeight: number
  onShowDetails: (index: number) => void
}

type Handle = {
  scrollToOffset: (offsetY: number, animated: boolean) => void
}

const Pager: ForwardRefRenderFunction<Handle, Props> = (
  { users, positionPercentage, activeScroll, pageHeight, onShowDetails },
  componentRef
) => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>()
  const [disableScroll, setDisableScroll] = useState(false)

  const scrollToOffset = useCallback(
    (offsetY: number, animated: boolean) => {
      runOnUI(scrollTo)(scrollRef, 0, offsetY, animated)
    },
    [scrollRef]
  )

  useImperativeHandle(
    componentRef,
    () => ({
      scrollToOffset
    }),
    [scrollToOffset]
  )

  const renderItem = (user: UserItem, index: number) => {
    return (
      <MemoizedPage
        key={user.id}
        user={user}
        index={index}
        pageHeight={pageHeight}
        onShowDetails={onShowDetails}
      />
    )
  }

  const scrollHandler = useAnimatedScrollHandler(
    {
      onScroll: (event) => {
        positionPercentage.value = getOffsetPercentage({
          offset: event.contentOffset.y,
          viewSize: pageHeight
        })
      },
      onBeginDrag: () => {
        activeScroll.value = 'pager'
      },
      onMomentumEnd: () => {
        activeScroll.value = 'none'
      }
    },
    [activeScroll]
  )

  useDerivedValue(() => {
    const offsetY = getOffsetFromPercentage({
      offsetPercentage: positionPercentage.value,
      viewSize: pageHeight
    })
    if (activeScroll.value === 'carousel') {
      scrollTo(scrollRef, 0, offsetY, false)
    }
  }, [positionPercentage, activeScroll, scrollRef])

  useDerivedValue(() => {
    if (activeScroll.value !== 'carousel') {
      runOnJS(setDisableScroll)(false)
    } else {
      runOnJS(setDisableScroll)(true)
    }
  }, [activeScroll])

  return (
    <Animated.ScrollView
      ref={scrollRef}
      showsVerticalScrollIndicator={false}
      renderToHardwareTextureAndroid
      decelerationRate="fast"
      snapToInterval={pageHeight}
      onScroll={scrollHandler}
      scrollEventThrottle={1}
      removeClippedSubviews
      pointerEvents={disableScroll ? 'none' : 'auto'}
    >
      {users.map(renderItem)}
    </Animated.ScrollView>
  )
}

export default forwardRef(Pager)
