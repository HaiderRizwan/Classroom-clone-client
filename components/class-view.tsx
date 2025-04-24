"use client"

import { useContext, useState } from "react"
import { ClassesContext } from "@/context/classes-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ClassHeader from "@/components/class-header"
import ClassStream from "@/components/class-stream"
import ClassAssignments from "@/components/class-assignments"
import ClassPeople from "@/components/class-people"

interface ClassViewProps {
  classId: string
}

export default function ClassView({ classId }: ClassViewProps) {
  const { getClassById } = useContext(ClassesContext)
  const [activeTab, setActiveTab] = useState("stream")

  const classItem = getClassById(classId)

  if (!classItem) {
    return <div>Class not found</div>
  }

  return (
    <div>
      <ClassHeader classItem={classItem} />

      <div className="container mx-auto py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="stream">Stream</TabsTrigger>
            <TabsTrigger value="classwork">Classwork</TabsTrigger>
            <TabsTrigger value="people">People</TabsTrigger>
          </TabsList>
          <TabsContent value="stream">
            <ClassStream classItem={classItem} />
          </TabsContent>
          <TabsContent value="classwork">
            <ClassAssignments classId={classId} />
          </TabsContent>
          <TabsContent value="people">
            <ClassPeople classId={classId} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
