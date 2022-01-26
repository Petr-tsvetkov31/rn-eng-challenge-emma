import React, { ReactElement, memo } from 'react'
import { View, StyleSheet, Text, Button } from 'react-native'

import { UserItem } from '../helpers/types'
import { getNames } from '../helpers/utils'

const styles = StyleSheet.create({
  container: {
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
  },
  buttonContainer: {
    paddingVertical: 10,
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: 4
  }
})

type Props = {
  user: UserItem
  pageHeight: number
  index: number
  onShowDetails: (index: number) => void
}

export function Page({
  user: { name, position, description },
  pageHeight,
  index,
  onShowDetails
}: Props): ReactElement {
  const { first, last } = getNames(name)

  const onDetails = () => {
    onShowDetails(index)
  }

  return (
    <View testID="Page" style={[styles.container, { height: pageHeight }]}>
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

      <View style={styles.buttonContainer}>
        <Button title="More Details" color="#52a8f3" onPress={onDetails} />
      </View>
    </View>
  )
}

export const MemoizedPage = memo(Page)
