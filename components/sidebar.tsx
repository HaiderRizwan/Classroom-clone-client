"use client"

import { useContext } from "react"
import Link from "next/link"
import { ClassesContext } from "@/context/classes-context"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Home, Calendar, Settings, Archive, PlusCircle } from "lucide-react"

export default function Sidebar() {
  const { classes } = useContext(ClassesContext)

  return (
    <div className="flex h-full flex-col border-r">
      <div className="p-4">
        <Button className="w-full justify-start" asChild variant="ghost">
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Classes
          </Link>
        </Button>
        <Button className="w-full justify-start" asChild variant="ghost">
          <Link href="/calendar">
            <Calendar className="mr-2 h-4 w-4" />
            Calendar
          </Link>
        </Button>
      </div>

      <div className="border-t px-4 py-2">
        <div className="flex items-center justify-between py-1">
          <h2 className="text-xs font-semibold">Enrolled</h2>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <PlusCircle className="h-4 w-4" />
            <span className="sr-only">Create class</span>
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="px-2">
          {classes.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">No classes yet</div>
          ) : (
            <div className="space-y-1">
              {classes.map((classItem) => (
                <Button key={classItem.id} variant="ghost" className="w-full justify-start font-normal" asChild>
                  <Link href={`/class/${classItem.id}`}>
                    <div
                      className="mr-2 h-4 w-4 rounded-full"
                      style={{ backgroundColor: classItem.color || "#1a73e8" }}
                    />
                    <span className="truncate">{classItem.name}</span>
                  </Link>
                </Button>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="border-t p-4">
        <Button className="w-full justify-start" asChild variant="ghost">
          <Link href="/archived">
            <Archive className="mr-2 h-4 w-4" />
            Archived classes
          </Link>
        </Button>
        <Button className="w-full justify-start" asChild variant="ghost">
          <Link href="/settings">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </Button>
      </div>
    </div>
  )
}
