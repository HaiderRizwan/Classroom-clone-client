"use client"

import type React from "react"

import { createContext, useState, useEffect } from "react"
import type { Assignment } from "@/types"

interface AssignmentsContextType {
  assignments: Assignment[]
  addAssignment: (assignment: Assignment) => void
  updateAssignment: (id: string, assignment: Partial<Assignment>) => void
  deleteAssignment: (id: string) => void
  getAssignmentById: (id: string) => Assignment | undefined
}

export const AssignmentsContext = createContext<AssignmentsContextType>({
  assignments: [],
  addAssignment: () => {},
  updateAssignment: () => {},
  deleteAssignment: () => {},
  getAssignmentById: () => undefined,
})

export function AssignmentsProvider({ children }: { children: React.ReactNode }) {
  const [assignments, setAssignments] = useState<Assignment[]>([])

  // Simulate loading assignments from an API
  useEffect(() => {
    // In a real app, you would fetch from an API
    const mockAssignments: Assignment[] = [
      {
        id: "1",
        classId: "1",
        title: "Algebra Homework",
        description: "Complete exercises 1-10 on page 25.",
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        points: 100,
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        classId: "1",
        title: "Geometry Quiz",
        description: "Study chapters 3-4 for the quiz.",
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        points: 50,
        createdAt: new Date().toISOString(),
      },
      {
        id: "3",
        classId: "2",
        title: "Lab Report",
        description: "Write a report on the experiment we conducted in class.",
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        points: 100,
        createdAt: new Date().toISOString(),
      },
    ]

    setAssignments(mockAssignments)
  }, [])

  const addAssignment = (assignment: Assignment) => {
    setAssignments((prev) => [...prev, assignment])
  }

  const updateAssignment = (id: string, assignment: Partial<Assignment>) => {
    setAssignments((prev) => prev.map((a) => (a.id === id ? { ...a, ...assignment } : a)))
  }

  const deleteAssignment = (id: string) => {
    setAssignments((prev) => prev.filter((a) => a.id !== id))
  }

  const getAssignmentById = (id: string) => {
    return assignments.find((a) => a.id === id)
  }

  return (
    <AssignmentsContext.Provider
      value={{
        assignments,
        addAssignment,
        updateAssignment,
        deleteAssignment,
        getAssignmentById,
      }}
    >
      {children}
    </AssignmentsContext.Provider>
  )
}
