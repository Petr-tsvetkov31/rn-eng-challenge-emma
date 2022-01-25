export function getAvatarSource(name: string) {
  switch (name) {
    case 'Allan-Munger':
      return require('../../assets/avatars/Allan-Munger.png')
    case 'Amanda-Brady':
      return require('../../assets/avatars/Amanda-Brady.png')
    case 'Ashley-Mc-Carthy':
      return require('../../assets/avatars/Ashley-Mc-Carthy.png')
    case 'Carlos-Slattery':
      return require('../../assets/avatars/Carlos-Slattery.png')
    case 'Carole-Poland':
      return require('../../assets/avatars/Carole-Poland.png')
    case 'Cecil-Folk':
      return require('../../assets/avatars/Cecil-Folk.png')
    case 'Celeste-Burton':
      return require('../../assets/avatars/Celeste-Burton.png')
    case 'Charlotte-Waltson':
      return require('../../assets/avatars/Charlotte-Waltson.png')
    case 'Colin-Ballinger':
      return require('../../assets/avatars/Colin-Ballinger.png')
    case 'Daisy-Phillips':
      return require('../../assets/avatars/Daisy-Phillips.png')
    case 'Elliot-Woodward':
      return require('../../assets/avatars/Elliot-Woodward.png')
    case 'Elvia-Atkins':
      return require('../../assets/avatars/Elvia-Atkins.png')
    case 'Erik-Nason':
      return require('../../assets/avatars/Erik-Nason.png')
    case 'Henry-Brill':
      return require('../../assets/avatars/Henry-Brill.png')
    case 'Isaac-Fielder':
      return require('../../assets/avatars/Isaac-Fielder.png')
    case 'Johnie-McConnell':
      return require('../../assets/avatars/Johnie-McConnell.png')
    case 'Kat-larsson':
      return require('../../assets/avatars/Kat-larsson.png')
    case 'Katri-Ahokas':
      return require('../../assets/avatars/Katri-Ahokas.png')
    case 'Kevin-Sturgis':
      return require('../../assets/avatars/Kevin-Sturgis.png')
    case 'Kristin-Patterson':
      return require('../../assets/avatars/Kristin-Patterson.png')
    case 'Lydia-Bauer':
      return require('../../assets/avatars/Lydia-Bauer.png')
    case 'Mauricio-August':
      return require('../../assets/avatars/Mauricio-August.png')
    case 'Miguel-Garcia':
      return require('../../assets/avatars/Miguel-Garcia.png')
    case 'Mona-Kane':
      return require('../../assets/avatars/Mona-Kane.png')
    case 'Robert-Tolbert':
      return require('../../assets/avatars/Robert-Tolbert.png')
    case 'Robin-Counts':
      return require('../../assets/avatars/Robin-Counts.png')
    case 'Tim-Deboer':
      return require('../../assets/avatars/Tim-Deboer.png')
    case 'Wanda-Howard':
      return require('../../assets/avatars/Wanda-Howard.png')
    default:
      return null
  }
}

export function getNames(name: string) {
  const replaced = name.replace('-', ' ')
  const first = replaced.slice(0, replaced.indexOf(' '))
  const last = replaced.slice(replaced.indexOf(' ') + 1)
  return { first, last }
}

export function getOffsetFromPercentage({
  offsetPercentage,
  viewSize
}: {
  offsetPercentage: number
  viewSize: number
}) {
  'worklet'
  return (offsetPercentage / 100) * viewSize
}

export function getOffsetPercentage({
  offset,
  viewSize
}: {
  offset: number
  viewSize: number
}) {
  'worklet'
  return (100 * offset) / viewSize
}
