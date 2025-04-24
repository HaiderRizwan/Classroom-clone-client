"use client"

import { useContext } from "react"
import { AssignmentsContext } from "@/context/assignments-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, FileText, Calendar } from "lucide-react"
import { useState } from "react"
import CreateAssignmentDialog from "@/components/create-assignment-dialog"

interface ClassAssignmentsProps {
  classId: string
}

export default function ClassAssignments({ classId }: ClassAssignmentsProps) {
  const { assignments } = useContext(AssignmentsContext)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const classAssignments = assignments.filter((a) => a.classId === classId)

  return (
    <div className="space-y-6 py-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Assignments</h2>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create
        </Button>
      </div>

      {classAssignments.length === 0 ? (
        <Card className="p-6 text-center">
          <p className="text-muted-foreground">No assignments yet</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {classAssignments.map((assignment) => (
            <Card key={assignment.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{assignment.title}</CardTitle>
                    <CardDescription>Due: {new Date(assignment.dueDate).toLocaleDateString()}</CardDescription>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="text-xs">Posted: {new Date(assignment.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm line-clamp-2">{assignment.description}</p>
              </CardContent>
              <CardFooter className="border-t p-3 bg-muted/30">
                <div className="flex items-center text-sm text-muted-foreground">
                  <FileText className="h-4 w-4 mr-2" />
                  <span>View assignment</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <CreateAssignmentDialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen} classId={classId} />
    </div>
  )
}
