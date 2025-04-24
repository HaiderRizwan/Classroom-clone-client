"use client"

import type React from "react"

import { useState, useContext } from "react"
import { ClassesContext } from "@/context/classes-context"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface CreateClassDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CreateClassDialog({ open, onOpenChange }: CreateClassDialogProps) {
  const { addClass } = useContext(ClassesContext)
  const [formData, setFormData] = useState({
    name: "",
    section: "",
    subject: "",
    room: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    addClass({
      id: Date.now().toString(),
      name: formData.name,
      section: formData.section,
      subject: formData.subject,
      room: formData.room,
      teacher: "You", // In a real app, this would come from auth context
      color: "#1a73e8",
      coverImage: "",
      createdAt: new Date().toISOString(),
    })

    setFormData({
      name: "",
      section: "",
      subject: "",
      room: "",
    })

    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Class</DialogTitle>
            <DialogDescription>Create a new class for your students.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Class name (required)</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="section">Section</Label>
              <Input id="section" name="section" value={formData.section} onChange={handleChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="room">Room</Label>
              <Input id="room" name="room" value={formData.room} onChange={handleChange} />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
