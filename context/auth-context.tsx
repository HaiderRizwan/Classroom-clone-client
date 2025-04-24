'use client'

import { createContext, useState, useEffect, useContext } from "react"
import { authAPI } from "@/lib/api"

interface User {
  id: string
  name: string 
  email: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void> 
  logout: () => void
  isLoading: boolean
}

// Create and export the context
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Add the register function that was missing
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      const data = await authAPI.register({ name, email, password })
      localStorage.setItem('token', data.token)
      setUser({
        id: data.user._id,
        name: data.user.name,
        email: data.user.email,
        avatar: data.user.avatar
      })
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const data = await authAPI.login(email, password)
      localStorage.setItem('token', data.token)
      setUser({
        id: data.user._id,
        name: data.user.name,
        email: data.user.email,
        avatar: data.user.avatar
      })
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      setIsLoading(false)
      return
    }

    authAPI.validateToken()
      .then(data => {
        setUser({
          id: data.user._id,
          name: data.user.name,
          email: data.user.email,
          avatar: data.user.avatar
        })
      })
      .catch(() => {
        localStorage.removeItem('token')
        setUser(null)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const value = {
    user,
    login,
    register, // Include the register function in the context value
    logout,
    isLoading
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
