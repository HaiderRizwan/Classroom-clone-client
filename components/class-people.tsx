"use client"

import { useContext } from "react"
import { UsersContext } from "@/context/users-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

interface ClassPeopleProps {
  classId: string
}

export default function ClassPeople({ classId }: ClassPeopleProps) {
  const { teachers, students } = useContext(UsersContext)

  const classTeachers = teachers.filter((t) => t.classIds.includes(classId))
  const classStudents = students.filter((s) => s.classIds.includes(classId))

  return (
    <div className="space-y-8 py-4">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle>Teachers</CardTitle>
            <Button variant="outline" size="sm">
              <PlusCircle className="h-4 w-4 mr-2" />
              Invite
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {classTeachers.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No teachers</p>
          ) : (
            <ul className="space-y-3">
              {classTeachers.map((teacher) => (
                <li key={teacher.id} className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={teacher.avatar || "/placeholder.svg"} alt={teacher.name} />
                    <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{teacher.name}</div>
                    <div className="text-xs text-muted-foreground">{teacher.email}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle>Students</CardTitle>
            <Button variant="outline" size="sm">
              <PlusCircle className="h-4 w-4 mr-2" />
              Invite
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {classStudents.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No students</p>
          ) : (
            <ul className="space-y-3">
              {classStudents.map((student) => (
                <li key={student.id} className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                    <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{student.name}</div>
                    <div className="text-xs text-muted-foreground">{student.email}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
