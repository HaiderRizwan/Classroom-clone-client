"use client"

import type React from "react"
import { createContext, useState, useEffect } from "react"
import type { ClassItem } from "@/types"
import { classroomAPI } from "@/lib/api"

interface ClassesContextType {
  classes: ClassItem[]
  addClass: (name: string, section: string) => Promise<void>
  joinClass: (code: string) => Promise<void>
  updateClass: (id: string, classItem: Partial<ClassItem>) => void
  deleteClass: (id: string) => void
  getClassById: (id: string) => Promise<ClassItem | undefined>
  refreshClasses: () => Promise<void>
  isLoading: boolean
}

export const ClassesContext = createContext<ClassesContextType>({
  classes: [],
  addClass: async () => {},
  joinClass: async () => {},
  updateClass: () => {},
  deleteClass: () => {},
  getClassById: async () => undefined,
  refreshClasses: async () => {},
  isLoading: false,
})

export function ClassesProvider({ children }: { children: React.ReactNode }) {
  const [classes, setClasses] = useState<ClassItem[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const refreshClasses = async () => {
    setIsLoading(true)
    try {
      const data = await classroomAPI.getMyClassrooms()
      setClasses(data.map((classroom: any) => ({
        id: classroom._id,
        name: classroom.name,
        section: classroom.section,
        teacher: classroom.teacher.name,
        color: classroom.color || "#1a73e8",
        coverImage: classroom.coverImage || "",
        createdAt: classroom.createdAt,
      })))
    } catch (error) {
      console.error('Failed to fetch classes:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    refreshClasses()
  }, [])

  const addClass = async (name: string, section: string) => {
    setIsLoading(true)
    try {
      const data = await classroomAPI.createClassroom({ name, section })
      const newClass: ClassItem = {
        id: data._id,
        name: data.name,
        section: data.section,
        teacher: data.teacher.name,
        color: data.color || "#1a73e8",
        coverImage: data.coverImage || "",
        createdAt: data.createdAt,
      }
      setClasses((prev) => [...prev, newClass])
    } catch (error) {
      console.error('Failed to create class:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const joinClass = async (code: string) => {
    setIsLoading(true)
    try {
      const data = await classroomAPI.joinClassroom(code)
      const newClass: ClassItem = {
        id: data._id,
        name: data.name,
        section: data.section,
        teacher: data.teacher.name,
        color: data.color || "#1a73e8",
        coverImage: data.coverImage || "",
        createdAt: data.createdAt,
      }
      setClasses((prev) => [...prev, newClass])
    } catch (error) {
      console.error('Failed to join class:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const updateClass = (id: string, classItem: Partial<ClassItem>) => {
    setClasses((prev) => prev.map((c) => (c.id === id ? { ...c, ...classItem } : c)))
  }

  const deleteClass = (id: string) => {
    setClasses((prev) => prev.filter((c) => c.id !== id))
  }

  const getClassById = async (id: string) => {
    try {
      const data = await classroomAPI.getClassroomById(id)
      return {
        id: data._id,
        name: data.name,
        section: data.section,
        teacher: data.teacher.name,
        color: data.color || "#1a73e8",
        coverImage: data.coverImage || "",
        createdAt: data.createdAt,
      }
    } catch (error) {
      console.error('Failed to fetch class:', error)
      return undefined
    }
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
