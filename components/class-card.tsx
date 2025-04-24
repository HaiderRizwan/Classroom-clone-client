import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { ClassItem } from "@/types"
import Link from "next/link"
import { FolderOpen, Users } from "lucide-react"

interface ClassCardProps {
  classItem: ClassItem
}

export default function ClassCard({ classItem }: ClassCardProps) {
  const { id, name, section, teacher, coverImage, color } = classItem

  return (
    <Link href={`/class/${id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <div
          className="h-24 w-full"
          style={{
            backgroundColor: color || "#1a73e8",
            backgroundImage: coverImage ? `url(${coverImage})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="p-4 text-white">
            <h3 className="text-xl font-bold truncate">{name}</h3>
            {section && <p className="text-sm opacity-90">{section}</p>}
            <p className="text-sm opacity-90">{teacher}</p>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="flex justify-end">
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="h-4 w-4 mr-1" />
              <span>25 students</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t p-3 bg-muted/30">
          <div className="flex items-center text-sm text-muted-foreground">
            <FolderOpen className="h-4 w-4 mr-2" />
            <span>View class</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
