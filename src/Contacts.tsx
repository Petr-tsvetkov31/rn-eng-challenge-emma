import Constants from 'expo-constants'
import { StatusBar } from 'expo-status-bar'
import { ElementRef, useCallback, useRef } from 'react'
import { View, StyleSheet } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'

import { ItemWidth } from './components/AvatarItem'
import { PageHeight } from './components/Page'
import Pager from './components/Pager'
import SnapCarousel from './components/SnapCarousel'
import { CarouselContainerHeight } from './helpers/consts'
import { ActiveScroll, UserItem } from './helpers/types'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight
  },
  topContainer: {
    height: CarouselContainerHeight
  },
  pageContainer: {
    flex: 1
  }
})

type SnapCarouselRef = ElementRef<typeof SnapCarousel>
type PagerRef = ElementRef<typeof Pager>

type Props = {
  users: UserItem[]
}

export default function Contacts({ users }: Props) {
  const activeScroll = useSharedValue<ActiveScroll>('none')
  const positionPercentage = useSharedValue(0)
  const carouselRef = useRef<SnapCarouselRef>(null)
  const pagerRef = useRef<PagerRef>(null)

  const onSelectCarouselItem = useCallback(
    (index: number) => {
      const offsetX = index * ItemWidth
      const offsetY = index * PageHeight

      carouselRef.current?.scrollToOffset(offsetX, true)
      pagerRef.current?.scrollToOffset(offsetY, true)
    },
    [carouselRef, pagerRef]
  )

  return (
    <View testID="ContactsScreen" style={styles.container}>
      <StatusBar style="auto" hidden={false} backgroundColor="black" />
      <View style={styles.topContainer}>
        <SnapCarousel
          ref={carouselRef}
          users={users}
          positionPercentage={positionPercentage}
          activeScroll={activeScroll}
          onSelectCarouselItem={onSelectCarouselItem}
        />
      </View>
      <View style={styles.pageContainer}>
        <Pager
          ref={pagerRef}
          users={users}
          positionPercentage={positionPercentage}
          activeScroll={activeScroll}
        />
      </View>
    </View>
  )
}
