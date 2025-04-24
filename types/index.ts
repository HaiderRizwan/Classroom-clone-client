export interface ClassItem {
  id: string
  name: string
  section?: string
  subject?: string
  room?: string
  teacher: string
  color?: string
  coverImage?: string
  createdAt: string
}

export interface Assignment {
  id: string
  classId: string
  title: string
  description?: string
  dueDate: string
  points: number
  createdAt: string
}

export interface Announcement {
  id: string
  classId: string
  content: string
  author: string
  createdAt: string
}

export interface User {
  id: string
  name: string
  email: string
  role: "teacher" | "student"
  avatar?: string
  classIds: string[]
}
