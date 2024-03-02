import type { User } from "./user-interface"

export interface Post {
  id: string
  title: string
  content: string
  likes: number
  createdAt: string
  updatedAt: string
  deletedAt: any
  user: User
}

