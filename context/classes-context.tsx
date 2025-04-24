"use client"

import type React from "react"

import { createContext, useState, useEffect } from "react"
import type { ClassItem } from "@/types"

interface ClassesContextType {
  classes: ClassItem[]
  addClass: (classItem: ClassItem) => void
  updateClass: (id: string, classItem: Partial<ClassItem>) => void
  deleteClass: (id: string) => void
  getClassById: (id: string) => ClassItem | undefined
}

export const ClassesContext = createContext<ClassesContextType>({
  classes: [],
  addClass: () => {},
  updateClass: () => {},
  deleteClass: () => {},
  getClassById: () => undefined,
})

export function ClassesProvider({ children }: { children: React.ReactNode }) {
  const [classes, setClasses] = useState<ClassItem[]>([])

  // Simulate loading classes from an API
  useEffect(() => {
    // In a real app, you would fetch from an API
    const mockClasses: ClassItem[] = [
      {
        id: "1",
        name: "Mathematics 101",
        section: "Period 1",
        teacher: "Demo Teacher",
        color: "#1a73e8",
        coverImage: "",
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        name: "Science",
        section: "Period 2",
        teacher: "Demo Teacher",
        color: "#00c853",
        coverImage: "",
        createdAt: new Date().toISOString(),
      },
      {
        id: "3",
        name: "History",
        section: "Period 3",
        teacher: "Demo Teacher",
        color: "#ff6d00",
        coverImage: "",
        createdAt: new Date().toISOString(),
      },
    ]

    setClasses(mockClasses)
  }, [])

  const addClass = (classItem: ClassItem) => {
    setClasses((prev) => [...prev, classItem])
  }

  const updateClass = (id: string, classItem: Partial<ClassItem>) => {
    setClasses((prev) => prev.map((c) => (c.id === id ? { ...c, ...classItem } : c)))
  }

  const deleteClass = (id: string) => {
    setClasses((prev) => prev.filter((c) => c.id !== id))
  }

  const getClassById = (id: string) => {
    return classes.find((c) => c.id === id)
  }

  return (
    <ClassesContext.Provider
      value={{
        classes,
        addClass,
        updateClass,
        deleteClass,
        getClassById,
      }}
    >
      {children}
    </ClassesContext.Provider>
  )
}
