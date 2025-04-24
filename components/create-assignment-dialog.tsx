"use client"

import type React from "react"

import { useState, useContext } from "react"
import { AssignmentsContext } from "@/context/assignments-context"
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
import { Textarea } from "@/components/ui/textarea"

interface CreateAssignmentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  classId: string
}

export default function CreateAssignmentDialog({ open, onOpenChange, classId }: CreateAssignmentDialogProps) {
  const { addAssignment } = useContext(AssignmentsContext)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    points: "100",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    addAssignment({
      id: Date.now().toString(),
      classId,
      title: formData.title,
      description: formData.description,
      dueDate: formData.dueDate || new Date().toISOString(),
      points: Number.parseInt(formData.points) || 100,
      createdAt: new Date().toISOString(),
    })

    setFormData({
      title: "",
      description: "",
      dueDate: "",
      points: "100",
    })

    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Assignment</DialogTitle>
            <DialogDescription>Create a new assignment for your class.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title (required)</Label>
              <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Instructions</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input id="dueDate" name="dueDate" type="date" value={formData.dueDate} onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="points">Points</Label>
                <Input id="points" name="points" type="number" value={formData.points} onChange={handleChange} />
              </div>
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
