import Constants from 'expo-constants'
import { StatusBar } from 'expo-status-bar'
import { View, StyleSheet } from 'react-native'

import SnapCarousel from './components/SnapCarousel'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: Constants.statusBarHeight
  }
})

export default function Main() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" hidden={false} backgroundColor="black" />
      <SnapCarousel />
    </View>
  )
}
