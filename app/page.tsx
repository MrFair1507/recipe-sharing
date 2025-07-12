"use client"
import { useAuth } from "@/contexts/AuthContext"
import { redirect } from "next/navigation"
import Header from "@/components/Header"
import RecipeList from "@/components/recipes/RecipeList"

export default function HomePage() {
  const { user } = useAuth()
  if (!user) redirect("/login")

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <RecipeList />
      </main>
    </div>
  )
}
