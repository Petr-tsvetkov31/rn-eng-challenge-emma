export type UserItem = {
  id: string
  name: string
  position: string
  description: string
}

export type UsersData = {
  users: UserItem[]
}

export type ActiveScroll = 'none' | 'carousel' | 'pager'
