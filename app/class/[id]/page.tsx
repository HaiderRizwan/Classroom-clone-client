import ClassView from "@/components/class-view"

interface ClassPageProps {
  params: {
    id: string
  }
}

export default function ClassPage({ params }: ClassPageProps) {
  const { id } = params

  // In a real app, you would fetch the class data here
  // If class not found, redirect to dashboard

  return <ClassView classId={id} />
}
