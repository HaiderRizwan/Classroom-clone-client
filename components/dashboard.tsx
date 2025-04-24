"use client"

import { useContext } from "react"
import { ClassesContext } from "@/context/classes-context"
import ClassCard from "@/components/class-card"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import CreateClassDialog from "@/components/create-class-dialog"
import { useState } from "react"

export default function Dashboard() {
  const { classes } = useContext(ClassesContext)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Classes</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Class
        </Button>
      </div>

      {classes.length === 0 ? (
        <div className="text-center py-12 bg-muted rounded-lg">
          <h2 className="text-xl font-medium mb-2">No classes yet</h2>
          <p className="text-muted-foreground mb-4">Create your first class to get started</p>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Class
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((classItem) => (
            <ClassCard key={classItem.id} classItem={classItem} />
          ))}
        </div>
      )}

      <CreateClassDialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen} />
    </div>
  )
}
