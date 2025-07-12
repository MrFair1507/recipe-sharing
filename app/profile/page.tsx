"use client"
import { useAuth } from "@/contexts/AuthContext"
import { redirect } from "next/navigation"
import Profile from "@/components/profile/Profile"
import Header from "@/components/Header"

export default function ProfilePage() {
  const { user } = useAuth()
  if (!user) redirect("/login")

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Profile />
      </main>
    </>
  )
}
