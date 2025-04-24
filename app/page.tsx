'use client'

import { useEffect,useContext } from 'react'
import { useRouter } from 'next/navigation'
import Dashboard from "@/components/dashboard"
import { useAuth } from '@/context/auth-context'
import { Skeleton } from '@/components/ui/skeleton'

export default function HomePage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    }
  }, [isLoading, user, router])

  if (isLoading) {
    return (
      <div className="p-8" aria-busy="true" aria-label="Loading dashboard">
        <Skeleton className="h-12 w-[250px] mb-6" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-[200px] rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <Dashboard />
}