import Constants from 'expo-constants'
import { StatusBar } from 'expo-status-bar'
import { useCallback } from 'react'
import { View, StyleSheet } from 'react-native'
import Animated, {
  useAnimatedRef,
  scrollTo,
  useSharedValue,
  useDerivedValue
} from 'react-native-reanimated'

import UsersData from '../data.json'
import { ItemWidth } from './components/AvatarItem'
import { PageHeight } from './components/Page'
import { Pager } from './components/Pager'
import { SnapCarousel } from './components/SnapCarousel'
import { CarouselContainerHeight } from './helpers/consts'
import { ActiveScroll } from './helpers/types'

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

function getPagerOffsetFromCarousel(carouselOffset: number) {
  'worklet'
  const offsetPercentage = (100 * carouselOffset) / ItemWidth
  const offset = (PageHeight / 100) * offsetPercentage
  return offset
}

function getCarouselOffsetFromPager(pagerOffset: number) {
  'worklet'
  const offsetPercentage = (100 * pagerOffset) / PageHeight
  const offset = (ItemWidth / 100) * offsetPercentage
  return offset
}

export default function Main() {
  const activeScroll = useSharedValue<ActiveScroll>('none')
  const carouselPosition = useSharedValue(0)
  const pagerPosition = useSharedValue(0)
  const carouselRef = useAnimatedRef<Animated.ScrollView>()
  const pagerRef = useAnimatedRef<Animated.ScrollView>()

  const onSelectCarouselItem = useCallback(
    (index: number) => {
      'worklet'
      const offsetX = index * ItemWidth
      const offsetY = index * PageHeight
      carouselPosition.value = offsetX
      pagerPosition.value = offsetY
      scrollTo(carouselRef, offsetX, 0, true)
      scrollTo(pagerRef, 0, offsetY, true)
    },
    [carouselRef, pagerRef, carouselPosition, pagerPosition]
  )

  useDerivedValue(() => {
    const offsetY = getPagerOffsetFromCarousel(carouselPosition.value)
    if (activeScroll.value === 'carousel') {
      scrollTo(pagerRef, 0, offsetY, false)
    }
  }, [carouselPosition, activeScroll])

  useDerivedValue(() => {
    const offsetX = getCarouselOffsetFromPager(pagerPosition.value)
    if (activeScroll.value === 'pager') {
      scrollTo(carouselRef, offsetX, 0, false)
    }
  }, [pagerPosition, activeScroll])

  return (
    <View style={styles.container}>
      <StatusBar style="auto" hidden={false} backgroundColor="black" />
      <View style={styles.topContainer}>
        <SnapCarousel
          ref={carouselRef}
          data={UsersData}
          position={carouselPosition}
          activeScroll={activeScroll}
          onSelectCarouselItem={onSelectCarouselItem}
        />
      </View>
      <View style={styles.pageContainer}>
        <Pager
          ref={pagerRef}
          data={UsersData}
          position={pagerPosition}
          activeScroll={activeScroll}
        />
      </View>
    </View>
  )
}
