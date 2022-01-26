import 'react-native-reanimated'
import 'react-native-gesture-handler/jestSetup'

require('react-native-reanimated/lib/reanimated2/jestUtils').setUpTests()

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')

jest.mock('@react-navigation/elements', () => {
  const actual = jest.requireActual('@react-navigation/elements')
  return {
    ...actual,
    useHeaderHeight: () => 0
  }
})
