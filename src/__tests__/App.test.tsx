import { describe, expect, it } from '@jest/globals'
import { render } from '@testing-library/react-native'
import React from 'react'

// .tsx prefix is needed here to mitigate the error of importing app.json and not App.tsx
//@ts-ignore
import App from '../../App.tsx'

describe('<App />', () => {
  it('should render ContactsScreen', () => {
    const tree = render(<App />).toJSON()
    expect(tree.props.testID).toBe('ContactsScreen')
  })
})
