import { ReactElement, memo } from 'react'
import { View, StyleSheet, Image, Pressable } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming
} from 'react-native-reanimated'

import { UserItem } from '../helpers/types'
import { getAvatarSource } from '../helpers/utils'

type Props = {
  onPress: (index: number) => void
  index: number
  item: UserItem
  isSelected: boolean
}

const HorizontalMargin = 10
const Size = 64
const BorderWidth = 2.5
export const ItemWidth = Size + HorizontalMargin * 2

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: HorizontalMargin
  },
  logo: {
    height: Size,
    width: Size
  },
  absoluteBorderView: {
    position: 'absolute',
    top: -BorderWidth,
    left: -BorderWidth,
    height: Size + BorderWidth * 2,
    width: Size + BorderWidth * 2,
    borderWidth: BorderWidth,
    borderRadius: Size / 2 + BorderWidth * 2,
    borderColor: '#0985f1'
  }
})

export function AvatarItem({
  isSelected,
  index,
  onPress,
  item: { name }
}: Props): ReactElement {
  const _onPress = () => {
    onPress(index)
  }

  const source = getAvatarSource(name)

  const animatedOpacity = useDerivedValue(() => {
    return isSelected ? 1 : 0
  }, [isSelected])

  const borderViewOpacityStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(animatedOpacity.value, {
        duration: 500
      })
    }
  }, [animatedOpacity])

  return (
    <View style={styles.container}>
      <Pressable onPress={_onPress}>
        <Animated.View
          style={[styles.absoluteBorderView, borderViewOpacityStyle]}
        />
        <Image style={styles.logo} source={source} />
      </Pressable>
    </View>
  )
}

export const MemoizedAvatarItem = memo(AvatarItem)
