"use client"

import Link from "next/link"
import { useRecipes } from "@/contexts/RecipeContext"
import { Button } from "@/components/ui/button"
import { Heart, Clock, Users, Star, Sparkles } from "lucide-react"

interface RecipeCardProps {
  recipe: {
    id: string
    title: string
    description: string
    cookingTime: number
    servings: number
    category: string
    rating: number
    image?: string
    nutritionalInfo: {
      calories: number
      protein: number
      fat: number
      carbs: number
    }
  }
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const { favorites, toggleFavorite } = useRecipes()
  const isFavorite = favorites.includes(recipe.id)

  const getCategoryColor = (category: string) => {
    const colors = {
      Breakfast: "from-orange-400 to-red-400",
      Lunch: "from-blue-400 to-cyan-400",
      Dinner: "from-purple-400 to-pink-400",
      Dessert: "from-pink-400 to-rose-400",
      Snack: "from-green-400 to-emerald-400",
      Appetizer: "from-yellow-400 to-orange-400",
    }
    return colors[category as keyof typeof colors] || "from-gray-400 to-gray-500"
  }

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg border overflow-hidden">
      <div className="relative overflow-hidden">
        <img
          src={recipe.image || "/placeholder.svg?height=200&width=300"}
          alt={recipe.title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => toggleFavorite(recipe.id)}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md ${
            isFavorite ? "bg-red-500/90 text-white" : "bg-white/80 text-gray-600"
          }`}
        >
          <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
        </Button>

        <div
          className={`absolute top-3 left-3 bg-gradient-to-r ${getCategoryColor(recipe.category)} text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg`}
        >
          {recipe.category}
        </div>

        <div className="absolute bottom-3 left-3 flex items-center bg-black/60 text-white px-2 py-1 rounded-full text-sm">
          <Star size={12} className="text-yellow-400 mr-1" fill="currentColor" />
          {recipe.rating.toFixed(1)}
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-1 line-clamp-1">{recipe.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{recipe.description}</p>

        <div className="flex items-center justify-between text-xs mt-4 mb-2">
          <div className="flex items-center text-blue-600 dark:text-blue-400">
            <Clock size={14} className="mr-1" />
            {recipe.cookingTime}m
          </div>
          <div className="flex items-center text-green-600 dark:text-green-400">
            <Users size={14} className="mr-1" />
            {recipe.servings}
          </div>
        </div>

        <Link href={`/recipe/${recipe.id}`}>
          <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white mt-2 rounded-xl">
            View Recipe
          </Button>
        </Link>
      </div>
    </div>
  )
}
