import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native'

import { MainStackType } from '../helpers/types'
import { getAvatarSource, getNames } from '../helpers/utils'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  imageContainer: {
    paddingVertical: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 80,
    height: 80
  },
  infoContainer: {
    paddingHorizontal: 14
  },
  label: {
    color: '#a7a7a7',
    fontStyle: 'italic'
  },
  value: {
    fontSize: 20,
    fontWeight: '700'
  },
  valueContainer: {
    paddingVertical: 6
  },
  descriptionContainer: {
    paddingTop: 6
  },
  description: {
    fontStyle: 'italic'
  }
})

type Props = NativeStackScreenProps<MainStackType, 'ContactDetails'>

export default function ContactDetails({
  route: {
    params: { user }
  }
}: Props) {
  const { name, description, position } = user
  const { first, last } = getNames(name)
  const avatarSource = getAvatarSource(name)
  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={avatarSource} />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.valueContainer}>
          <Text style={styles.label}>First Name</Text>
          <Text style={styles.value}>{first}</Text>
        </View>
        <View style={styles.valueContainer}>
          <Text style={styles.label}>Last Name</Text>
          <Text style={styles.value}>{last}</Text>
        </View>
        <View style={styles.valueContainer}>
          <Text style={styles.label}>Position</Text>
          <Text style={styles.value}>{position}</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
    </ScrollView>
  )
}
