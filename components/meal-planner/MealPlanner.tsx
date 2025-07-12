"use client"

import { useState, useEffect } from "react"
import { useRecipes } from "@/contexts/RecipeContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Calendar, Sparkles, TrendingUp } from "lucide-react"
import { DragDropContext, type DropResult } from "@hello-pangea/dnd"
import DroppableDayContainer from "./DroppableDayContainer"
import type { Recipe } from "@/contexts/RecipeContext"
import MealPlanSummary from "./MealPlanSummary"

interface MealPlan {
  [day: string]: string[] // day -> recipe IDs
}

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export default function MealPlanner() {
  const { recipes, getRecipeById } = useRecipes()
  const [mealPlan, setMealPlan] = useState<MealPlan>({})
  const [selectedDay, setSelectedDay] = useState<string | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem("mealPlan")
    if (saved) setMealPlan(JSON.parse(saved))
  }, [])

  const saveMealPlan = (plan: MealPlan) => {
    setMealPlan(plan)
    localStorage.setItem("mealPlan", JSON.stringify(plan))
  }

  const addRecipeToDay = (day: string, recipeId: string) => {
    const updated = { ...mealPlan, [day]: [...(mealPlan[day] || []), recipeId] }
    saveMealPlan(updated)
  }

  const removeRecipeFromDay = (day: string, recipeId: string) => {
    const updated = { ...mealPlan, [day]: mealPlan[day].filter((id) => id !== recipeId) }
    saveMealPlan(updated)
  }

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) return

    const newPlan = { ...mealPlan }
    const from = [...newPlan[source.droppableId]]
    const to = [...(newPlan[destination.droppableId] || [])]

    from.splice(source.index, 1)
    to.splice(destination.index, 0, draggableId)

    newPlan[source.droppableId] = from
    newPlan[destination.droppableId] = to
    saveMealPlan(newPlan)
  }

  const nutrition = Object.values(mealPlan).flat().reduce(
    (acc, id) => {
      const r = getRecipeById(id)
      if (r) {
        acc.calories += r.nutritionalInfo.calories
        acc.protein += r.nutritionalInfo.protein
        acc.fat += r.nutritionalInfo.fat
        acc.carbs += r.nutritionalInfo.carbs
      }
      return acc
    },
    { calories: 0, protein: 0, fat: 0, carbs: 0 }
  )

  const totalRecipes = Object.values(mealPlan).flat().length
  const totalCookingTime = Object.values(mealPlan).flat().reduce((sum, id) => sum + (getRecipeById(id)?.cookingTime || 0), 0)
  const averageServings = (() => {
    const all = Object.values(mealPlan).flat()
    if (!all.length) return 0
    const total = all.reduce((sum, id) => sum + (getRecipeById(id)?.servings || 0), 0)
    return Math.round(total / all.length)
  })()

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative w-full h-[400px] overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-600 dark:from-indigo-600 dark:via-purple-700 dark:to-pink-800" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-xl animate-pulse" />
          <div className="absolute top-20 right-20 w-24 h-24 bg-yellow-300 rounded-full blur-lg animate-bounce" />
        </div>
        <div className="absolute inset-0 opacity-10 grid grid-cols-7 gap-4 h-full p-8">
          {Array.from({ length: 35 }).map((_, i) => (
            <Calendar key={i} className="w-6 h-6 text-white animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
          ))}
        </div>
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <div className="text-center max-w-3xl">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 dark:bg-black/20 backdrop-blur-md rounded-full mb-4">
              <Calendar className="w-5 h-5 text-yellow-300 mr-2" />
              <span className="text-white font-medium">Plan & Organize</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Weekly <span className="text-yellow-300">Meal Planner</span>
            </h1>
            <p className="text-xl text-white/90">Plan your meals and track nutrition effortlessly</p>
          </div>
        </div>
      </div>

      {/* Summary */}
      <MealPlanSummary
        totalNutrition={{
          totalCalories: nutrition.calories,
          totalProtein: nutrition.protein,
          totalFat: nutrition.fat,
          totalCarbs: nutrition.carbs,
        }}
        totalRecipes={totalRecipes}
        totalCookingTime={totalCookingTime}
        averageServings={averageServings}
      />

      {/* Grid */}
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Your Weekly Plan
          </h2>
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            {totalRecipes} recipes planned
          </div>
        </div>
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {daysOfWeek.map((day) => {
              const dayRecipes = (mealPlan[day] || [])
                .map((id) => getRecipeById(id))
                .filter((r): r is Recipe => !!r)
              return (
                <DroppableDayContainer
                  key={day}
                  day={day}
                  recipes={dayRecipes}
                  onRemoveRecipe={(id) => removeRecipeFromDay(day, id)}
                  onAddRecipe={() => setSelectedDay(selectedDay === day ? null : day)}
                />
              )
            })}
          </div>
        </DragDropContext>
      </div>

      {/* Modal Add Recipe */}
      {selectedDay && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <Card className="w-full max-w-6xl max-h-[90vh] overflow-hidden backdrop-blur-xl bg-white/90 dark:bg-gray-800/95">
            <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex gap-3 items-center">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold">Add Recipe to {selectedDay}</CardTitle>
                    <p className="text-indigo-100">Choose from your recipes</p>
                  </div>
                </div>
                <Button variant="ghost" onClick={() => setSelectedDay(null)} className="text-white hover:bg-white/20 rounded-xl p-2">
                  <X size={20} />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 overflow-y-auto max-h-[70vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.map((recipe) => (
                  <div
                    key={recipe.id}
                    onClick={() => {
                      addRecipeToDay(selectedDay, recipe.id)
                      setSelectedDay(null)
                    }}
                    className="cursor-pointer group p-4 rounded-2xl border border-gray-200 dark:border-gray-600 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 hover:scale-105 transition"
                  >
                    <div className="relative h-32 mb-3 rounded-xl overflow-hidden">
                      <img
                        src={recipe.image || "/placeholder.svg"}
                        alt={recipe.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                    <h4 className="font-bold text-gray-800 dark:text-white truncate mb-2">{recipe.title}</h4>
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                      <Badge variant="secondary">{recipe.category}</Badge>
                      <span>{recipe.cookingTime} min • {recipe.nutritionalInfo.calories} cal</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
