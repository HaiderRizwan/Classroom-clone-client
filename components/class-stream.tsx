"use client"

import type React from "react"

import { useState, useContext } from "react"
import type { ClassItem } from "@/types"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AuthContext } from "@/context/auth-context"
import { AnnouncementsContext } from "@/context/announcements-context"

interface ClassStreamProps {
  classItem: ClassItem
}

export default function ClassStream({ classItem }: ClassStreamProps) {
  const { user } = useContext(AuthContext)
  const { announcements, addAnnouncement } = useContext(AnnouncementsContext)
  const [announcement, setAnnouncement] = useState("")

  const classAnnouncements = announcements.filter((a) => a.classId === classItem.id)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!announcement.trim()) return

    addAnnouncement({
      id: Date.now().toString(),
      classId: classItem.id,
      content: announcement,
      author: user?.name || "Teacher",
      createdAt: new Date().toISOString(),
    })

    setAnnouncement("")
  }

  return (
    <div className="space-y-6 py-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
              <AvatarFallback>{user?.name?.charAt(0) || "T"}</AvatarFallback>
            </Avatar>
            <div>Announce something to your class</div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Textarea
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
              placeholder="Share with your class..."
              className="mb-3"
            />
            <div className="flex justify-end">
              <Button type="submit" disabled={!announcement.trim()}>
                Post
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {classAnnouncements.length === 0 ? (
        <Card className="p-6 text-center">
          <p className="text-muted-foreground">No announcements yet</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {classAnnouncements.map((announcement) => (
            <Card key={announcement.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>{announcement.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{announcement.author}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(announcement.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p>{announcement.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
