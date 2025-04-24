"use client"

import type React from "react"

import { createContext, useState, useEffect } from "react"
import type { Announcement } from "@/types"

interface AnnouncementsContextType {
  announcements: Announcement[]
  addAnnouncement: (announcement: Announcement) => void
  updateAnnouncement: (id: string, announcement: Partial<Announcement>) => void
  deleteAnnouncement: (id: string) => void
}

export const AnnouncementsContext = createContext<AnnouncementsContextType>({
  announcements: [],
  addAnnouncement: () => {},
  updateAnnouncement: () => {},
  deleteAnnouncement: () => {},
})

export function AnnouncementsProvider({ children }: { children: React.ReactNode }) {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])

  // Simulate loading announcements from an API
  useEffect(() => {
    // In a real app, you would fetch from an API
    const mockAnnouncements: Announcement[] = [
      {
        id: "1",
        classId: "1",
        content: "Welcome to Mathematics 101! I'm excited to start this semester with you all.",
        author: "Demo Teacher",
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        classId: "2",
        content: "Don't forget to bring your lab notebooks tomorrow.",
        author: "Demo Teacher",
        createdAt: new Date().toISOString(),
      },
    ]

    setAnnouncements(mockAnnouncements)
  }, [])

  const addAnnouncement = (announcement: Announcement) => {
    setAnnouncements((prev) => [...prev, announcement])
  }

  const updateAnnouncement = (id: string, announcement: Partial<Announcement>) => {
    setAnnouncements((prev) => prev.map((a) => (a.id === id ? { ...a, ...announcement } : a)))
  }

  const deleteAnnouncement = (id: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id))
  }

  return (
    <AnnouncementsContext.Provider
      value={{
        announcements,
        addAnnouncement,
        updateAnnouncement,
        deleteAnnouncement,
      }}
    >
      {children}
    </AnnouncementsContext.Provider>
  )
}
