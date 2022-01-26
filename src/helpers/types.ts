export type UserItem = {
  id: string
  name: string
  position: string
  description: string
}

export type ActiveScroll = 'none' | 'carousel' | 'pager'

export type MainStackType = {
  Contacts: { users: UserItem[] }
  ContactDetails: { user: UserItem }
}
