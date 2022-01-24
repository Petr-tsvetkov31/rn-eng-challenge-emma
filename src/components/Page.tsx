import Constants from 'expo-constants'
import React, { ReactElement, memo } from 'react'
import { View, StyleSheet, Text, Dimensions } from 'react-native'

import { CarouselContainerHeight } from '../helpers/consts'
import { UserItem } from '../helpers/types'
import { getNames } from '../helpers/utils'

export const PageHeight =
  Dimensions.get('screen').height -
  CarouselContainerHeight -
  Constants.statusBarHeight

const styles = StyleSheet.create({
  container: {
    height: PageHeight,
    alignItems: 'center'
  },
  topContainer: {
    alignItems: 'center',
    paddingVertical: 24
  },
  name: {
    fontSize: 20,
    paddingBottom: 8
  },
  position: {
    color: '#a7a7a7',
    fontSize: 16
  },
  bold: {
    fontWeight: '700'
  },
  descriptionContainer: {
    paddingHorizontal: 12
  },
  description: {
    marginTop: 4,
    color: '#a7a7a7'
  }
})

type Props = {
  user: UserItem
}

export function Page({
  user: { name, position, description }
}: Props): ReactElement {
  const { first, last } = getNames(name)

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.name}>
          <Text style={styles.bold}>{first} </Text>
          {last}
        </Text>
        <Text style={styles.position}>{position}</Text>
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.bold}>About me</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  )
}

export const MemoizedPage = memo(Page)
