import React, { ReactElement } from 'react'
import { View, StyleSheet, Image, Pressable } from 'react-native'

import { getAvatarSource } from '../helpers/utils'

export type UserItem = {
  id: string
  name: string
  path: string
}

type Props = {
  onPress: (index: number) => void
  index: number
  item: UserItem
  isSelected: boolean
}

const HorizontalMargin = 10
const Size = 60
const BorderWidth = 3
export const ItemWidth = Size + HorizontalMargin * 2 + BorderWidth * 2

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: HorizontalMargin,
    borderWidth: BorderWidth,
    borderRadius: Size / 2 + BorderWidth,
    borderColor: 'transparent'
  },
  logo: {
    height: Size,
    width: Size
  },
  isSelected: {
    borderColor: '#c9dff2'
  }
})

export default function AssetExample({
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
    <View style={[styles.container, isSelected && styles.isSelected]}>
      <Pressable onPress={_onPress}>
        <Image style={styles.logo} source={source} />
      </Pressable>
    </View>
  )
}
