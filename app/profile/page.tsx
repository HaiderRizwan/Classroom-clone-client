'use client'

import { useState } from 'react'
import { useAuth } from '@/context/auth-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const [error, setError] = useState('')

  if (!user) {
    return null
  }

  const handleLogout = () => {
    try {
      logout()
    } catch (error: any) {
      setError('Failed to logout')
    }
  }

  return (
    <div className="container mx-auto max-w-2xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Account Information</h3>
              <div className="mt-2 space-y-2">
                <div>
                  <span className="text-sm text-gray-500">Name:</span>
                  <p>{user.name}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Email:</span>
                  <p>{user.email}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">User ID:</span>
                  <p>{user.id}</p>
                </div>
              </div>
            </div>

            <Button
              variant="destructive"
              onClick={handleLogout}
              className="mt-4"
            >
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}