import { forwardRef } from 'react'
import Animated, { useAnimatedScrollHandler } from 'react-native-reanimated'

import { ActiveScroll, UserItem, UsersData } from '../helpers/types'
import { MemoizedPage, PageHeight } from './Page'

type Props = {
  data: UsersData
  position: Animated.SharedValue<number>
  activeScroll: Animated.SharedValue<ActiveScroll>
}

export const Pager = forwardRef<Animated.ScrollView, Props>((props, ref) => {
  const { data, position, activeScroll } = props

  const renderItem = (user: UserItem) => {
    return <MemoizedPage key={user.id} user={user} />
  }

  const scrollHandler = useAnimatedScrollHandler(
    {
      onScroll: (event) => {
        position.value = event.contentOffset.y
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

  return (
    <Animated.ScrollView
      ref={ref}
      showsVerticalScrollIndicator={false}
      renderToHardwareTextureAndroid
      decelerationRate="fast"
      snapToInterval={PageHeight}
      onScroll={scrollHandler}
      scrollEventThrottle={1}
      removeClippedSubviews
    >
      {data.users.map(renderItem)}
    </Animated.ScrollView>
  )
})
