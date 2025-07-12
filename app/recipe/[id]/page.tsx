"use client"

import { useAuth } from "@/contexts/AuthContext"
import { redirect, useParams } from "next/navigation"
import RecipeDetail from "@/components/recipes/RecipeDetail"
import Header from "@/components/Header"

export default function RecipeDetailPage() {
  const { user } = useAuth()
  const params = useParams()

  if (!user) redirect("/login")
  const id = params.id as string

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <RecipeDetail />
      </main>
    </>
  )
}
