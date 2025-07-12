"use client"

import { useState } from "react"
import { useRecipes } from "@/contexts/RecipeContext"
import { Star } from "lucide-react"

interface RatingStarsProps {
  recipeId: string
  currentRating: number
}

export default function RatingStars({ recipeId, currentRating }: RatingStarsProps) {
  const [hoverRating, setHoverRating] = useState(0)
  const { rateRecipe } = useRecipes()

  const handleRating = (rating: number) => {
    rateRecipe(recipeId, rating)
  }

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-600 dark:text-gray-400">Rate this recipe:</span>
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="transition-colors hover:scale-110"
          >
            <Star
              size={20}
              className={`${star <= (hoverRating || currentRating) ? "text-yellow-500 fill-current" : "text-gray-300"}`}
            />
          </button>
        ))}
      </div>
      <span className="text-sm text-gray-600 dark:text-gray-400">({currentRating.toFixed(1)})</span>
    </div>
  )
}
