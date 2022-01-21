import { StatusBar } from 'expo-status-bar'
import { View, Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default function Main() {
  return (
    <View style={styles.container}>
      <Text>Hello there!</Text>
      <StatusBar style="auto" />
    </View>
  )
}
