import { describe, expect, it } from '@jest/globals'
import { render } from '@testing-library/react-native'

import Contacts from '../Contacts'

const users = [
  {
    id: '0',
    name: 'Allan-Munger',
    position: 'Writer',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nulla diam, semper quis mauris vel, venenatis egestas nibh. Praesent mollis egestas lorem, quis lacinia velit vestibulum at. Nullam luctus magna ut vehicula molestie. Sed sodales est in orci mattis faucibus. Donec feugiat felis eget tellus gravida commodo. In odio justo, dictum commodo aliquam in, tincidunt in arcu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n\nSed in hendrerit felis, accumsan dapibus diam. Curabitur sed dapibus lorem. Proin mattis vehicula nunc, quis accumsan tellus varius nec. Vivamus aliquam ac sem sit amet posuere. Aliquam luctus felis nec est rutrum, at interdum mi consequat. Pellentesque sed neque faucibus, vestibulum felis nec, faucibus odio. Praesent nec dignissim diam. Vivamus ultrices arcu non sodales dapibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam erat volutpat. Curabitur egestas tempor ullamcorper. Morbi maximus, mauris ut aliquam rhoncus, est ante tempus tortor, eu egestas augue ligula sed sem. Proin massa urna, tempor quis arcu et, maximus hendrerit magna.'
  },
  {
    id: '1',
    name: 'Amanda-Brady',
    position: 'Writer',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nulla diam, semper quis mauris vel, venenatis egestas nibh. Praesent mollis egestas lorem, quis lacinia velit vestibulum at. Nullam luctus magna ut vehicula molestie. Sed sodales est in orci mattis faucibus. Donec feugiat felis eget tellus gravida commodo. In odio justo, dictum commodo aliquam in, tincidunt in arcu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n\nSed in hendrerit felis, accumsan dapibus diam. Curabitur sed dapibus lorem. Proin mattis vehicula nunc, quis accumsan tellus varius nec. Vivamus aliquam ac sem sit amet posuere. Aliquam luctus felis nec est rutrum, at interdum mi consequat. Pellentesque sed neque faucibus, vestibulum felis nec, faucibus odio. Praesent nec dignissim diam. Vivamus ultrices arcu non sodales dapibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam erat volutpat. Curabitur egestas tempor ullamcorper. Morbi maximus, mauris ut aliquam rhoncus, est ante tempus tortor, eu egestas augue ligula sed sem. Proin massa urna, tempor quis arcu et, maximus hendrerit magna.'
  },
  {
    id: '2',
    name: 'Ashley-Mc-Carthy',
    position: 'Writer',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nulla diam, semper quis mauris vel, venenatis egestas nibh. Praesent mollis egestas lorem, quis lacinia velit vestibulum at. Nullam luctus magna ut vehicula molestie. Sed sodales est in orci mattis faucibus. Donec feugiat felis eget tellus gravida commodo. In odio justo, dictum commodo aliquam in, tincidunt in arcu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n\nSed in hendrerit felis, accumsan dapibus diam. Curabitur sed dapibus lorem. Proin mattis vehicula nunc, quis accumsan tellus varius nec. Vivamus aliquam ac sem sit amet posuere. Aliquam luctus felis nec est rutrum, at interdum mi consequat. Pellentesque sed neque faucibus, vestibulum felis nec, faucibus odio. Praesent nec dignissim diam. Vivamus ultrices arcu non sodales dapibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam erat volutpat. Curabitur egestas tempor ullamcorper. Morbi maximus, mauris ut aliquam rhoncus, est ante tempus tortor, eu egestas augue ligula sed sem. Proin massa urna, tempor quis arcu et, maximus hendrerit magna.'
  }
]

describe('<Contacts />', () => {
  it('should render 3 contacts', () => {
    const { getAllByTestId } = render(<Contacts users={users} />) //.toJSON()

    const avatarElements = getAllByTestId('AvatarItem')
    expect(avatarElements.length).toBe(3)

    const pageElements = getAllByTestId('Page')
    expect(pageElements.length).toBe(3)
  })
})
