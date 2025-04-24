"use client"

import type React from "react"

import { createContext, useState, useEffect } from "react"
import type { User } from "@/types"

interface UsersContextType {
  teachers: User[]
  students: User[]
  addTeacher: (teacher: User) => void
  addStudent: (student: User) => void
  removeTeacher: (id: string) => void
  removeStudent: (id: string) => void
}

export const UsersContext = createContext<UsersContextType>({
  teachers: [],
  students: [],
  addTeacher: () => {},
  addStudent: () => {},
  removeTeacher: () => {},
  removeStudent: () => {},
})

export function UsersProvider({ children }: { children: React.ReactNode }) {
  const [teachers, setTeachers] = useState<User[]>([])
  const [students, setStudents] = useState<User[]>([])

  // Simulate loading users from an API
  useEffect(() => {
    // In a real app, you would fetch from an API
    const mockTeachers: User[] = [
      {
        id: "1",
        name: "Demo Teacher",
        email: "teacher@example.com",
        role: "teacher",
        classIds: ["1", "2", "3"],
      },
    ]

    const mockStudents: User[] = [
      {
        id: "2",
        name: "John Doe",
        email: "john@example.com",
        role: "student",
        classIds: ["1", "2"],
      },
      {
        id: "3",
        name: "Jane Smith",
        email: "jane@example.com",
        role: "student",
        classIds: ["1", "3"],
      },
      {
        id: "4",
        name: "Bob Johnson",
        email: "bob@example.com",
        role: "student",
        classIds: ["2", "3"],
      },
    ]

    setTeachers(mockTeachers)
    setStudents(mockStudents)
  }, [])

  const addTeacher = (teacher: User) => {
    setTeachers((prev) => [...prev, teacher])
  }

  const addStudent = (student: User) => {
    setStudents((prev) => [...prev, student])
  }

  const removeTeacher = (id: string) => {
    setTeachers((prev) => prev.filter((t) => t.id !== id))
  }

  const removeStudent = (id: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== id))
  }

  return (
    <UsersContext.Provider
      value={{
        teachers,
        students,
        addTeacher,
        addStudent,
        removeTeacher,
        removeStudent,
      }}
    >
      {children}
    </UsersContext.Provider>
  )
}
