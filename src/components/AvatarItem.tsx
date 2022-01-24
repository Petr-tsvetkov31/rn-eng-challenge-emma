import { ReactElement, memo } from 'react'
import { View, StyleSheet, Image, Pressable } from 'react-native'

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
const BorderWidth = 2
export const ItemWidth = Size + HorizontalMargin * 2 + BorderWidth * 2

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
  border: {
    borderWidth: BorderWidth,
    borderRadius: Size / 2 + BorderWidth * 2,
    borderColor: 'transparent'
  },
  isSelected: {
    borderColor: '#c9dff2'
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
  return (
    <View style={styles.container}>
      <Pressable onPress={_onPress}>
        <View style={[styles.border, isSelected && styles.isSelected]}>
          <Image style={styles.logo} source={source} />
        </View>
      </Pressable>
    </View>
  )
}

export const MemoizedAvatarItem = memo(AvatarItem)
