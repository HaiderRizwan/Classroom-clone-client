import type { ClassItem } from "@/types"
import { Button } from "@/components/ui/button"
import { Settings, MoreVertical } from "lucide-react"

interface ClassHeaderProps {
  classItem: ClassItem
}

export default function ClassHeader({ classItem }: ClassHeaderProps) {
  const { name, section, teacher, coverImage, color } = classItem

  return (
    <div
      className="relative h-48 w-full flex items-end"
      style={{
        backgroundColor: color || "#1a73e8",
        backgroundImage: coverImage ? `url(${coverImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="container mx-auto relative z-10 p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">{name}</h1>
            {section && <p className="text-lg opacity-90">{section}</p>}
            <p className="text-sm opacity-90">{teacher}</p>
          </div>

          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
