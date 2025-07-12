"use client"
import { useAuth } from "@/contexts/AuthContext"
import { redirect } from "next/navigation"
import CreateRecipe from "@/components/recipes/CreateRecipe"
import Header from "@/components/Header"

export default function CreateRecipePage() {
  const { user } = useAuth()
  if (!user) redirect("/login")

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <CreateRecipe />
      </main>
    </>
  )
}
