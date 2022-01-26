import { useHeaderHeight } from '@react-navigation/elements'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import { ElementRef, useCallback, useRef } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'

import { ItemWidth } from './components/AvatarItem'
import Pager from './components/Pager'
import SnapCarousel from './components/SnapCarousel'
import { CarouselContainerHeight } from './helpers/consts'
import { ActiveScroll, MainStackType } from './helpers/types'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
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

type Props = NativeStackScreenProps<MainStackType, 'Contacts'>

export default function Contacts({
  route: {
    params: { users }
  },
  navigation: { navigate }
}: Props) {
  const activeScroll = useSharedValue<ActiveScroll>('none')
  const positionPercentage = useSharedValue(0)
  const carouselRef = useRef<SnapCarouselRef>(null)
  const pagerRef = useRef<PagerRef>(null)
  const headerHeight = useHeaderHeight()
  const pageHeight =
    Dimensions.get('screen').height - CarouselContainerHeight - headerHeight

  const onSelectCarouselItem = useCallback(
    (index: number) => {
      const offsetX = index * ItemWidth
      const offsetY = index * pageHeight

      carouselRef.current?.scrollToOffset(offsetX, true)
      pagerRef.current?.scrollToOffset(offsetY, true)
    },
    [carouselRef, pagerRef, pageHeight]
  )

  const onShowDetails = (index: number) => {
    if (index > users.length - 1) return
    const user = users[index]
    navigate('ContactDetails', { user })
  }

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
          pageHeight={pageHeight}
          onShowDetails={onShowDetails}
        />
      </View>
    </View>
  )
}
