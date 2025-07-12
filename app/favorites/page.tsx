"use client"
import { useAuth } from "@/contexts/AuthContext"
import { redirect } from "next/navigation"
import FavoritesList from "@/components/favorites/FavoritesList"
import Header from "@/components/Header"

export default function FavoritesPage() {
  const { user } = useAuth()
  if (!user) redirect("/login")

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <FavoritesList />
      </main>
    </>
  )
}
