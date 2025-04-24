"use client"

import type React from "react"

import { createContext, useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
  isLoading: true,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading the user from localStorage or a token
  useEffect(() => {
    // In a real app, you would check for a token and validate it
    const mockUser = {
      id: "1",
      name: "Demo Teacher",
      email: "teacher@example.com",
    }

    setUser(mockUser)
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // In a real app, you would make an API call to authenticate
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockUser = {
      id: "1",
      name: "Demo Teacher",
      email,
    }

    setUser(mockUser)
    setIsLoading(false)
  }

  const logout = () => {
    // In a real app, you would clear the token
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}
