import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Sidebar from "@/components/sidebar"
import { AuthProvider } from "@/context/auth-context"
import { ClassesProvider } from "@/context/classes-context"
import { AssignmentsProvider } from "@/context/assignments-context"
import { AnnouncementsProvider } from "@/context/announcements-context"
import { UsersProvider } from "@/context/users-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Google Classroom Clone",
  description: "A Google Classroom clone built with Next.js and React",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <ClassesProvider>
              <AssignmentsProvider>
                <AnnouncementsProvider>
                  <UsersProvider>
                    <div className="flex min-h-screen flex-col">
                      <Navbar />
                      <div className="flex flex-1">
                        <aside className="hidden w-64 md:block">
                          <Sidebar />
                        </aside>
                        <main className="flex-1">{children}</main>
                      </div>
                    </div>
                  </UsersProvider>
                </AnnouncementsProvider>
              </AssignmentsProvider>
            </ClassesProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
