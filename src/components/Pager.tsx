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
import { MemoizedPage, PageHeight } from './Page'

type Props = {
  users: UserItem[]
  positionPercentage: Animated.SharedValue<number>
  activeScroll: Animated.SharedValue<ActiveScroll>
}

type Handle = {
  scrollToOffset: (offsetY: number, animated: boolean) => void
}

const Pager: ForwardRefRenderFunction<Handle, Props> = (
  { users, positionPercentage, activeScroll },
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

  const renderItem = (user: UserItem) => {
    return <MemoizedPage key={user.id} user={user} />
  }

  const scrollHandler = useAnimatedScrollHandler(
    {
      onScroll: (event) => {
        positionPercentage.value = getOffsetPercentage({
          offset: event.contentOffset.y,
          viewSize: PageHeight
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
      viewSize: PageHeight
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
      snapToInterval={PageHeight}
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
