"use client"
import { useAuth } from "@/contexts/AuthContext"
import { redirect } from "next/navigation"
import MealPlanner from "@/components/meal-planner/MealPlanner"
import Header from "@/components/Header"

export default function MealPlannerPage() {
  const { user } = useAuth()
  if (!user) redirect("/login")

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <MealPlanner />
      </main>
    </>
  )
}
