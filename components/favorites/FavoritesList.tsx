"use client"

import { useRecipes } from "@/contexts/RecipeContext"
import RecipeCard from "@/components/recipes/RecipeCard"
import { Heart, Sparkles, Star } from "lucide-react"

export default function FavoritesList() {
  const { recipes, favorites } = useRecipes()

  const favoriteRecipes = recipes.filter((recipe) => favorites.includes(recipe.id))

  return (
    <div className="space-y-8">
      {/* Enhanced Hero Section */}
      <div className="relative w-full h-[400px] overflow-hidden rounded-2xl">
        {/* Background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-400 via-pink-500 to-rose-600 dark:from-red-600 dark:via-pink-700 dark:to-rose-800"></div>

        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-20 right-20 w-24 h-24 bg-yellow-300 rounded-full blur-lg animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-purple-300 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-10 right-1/3 w-28 h-28 bg-blue-300 rounded-full blur-xl animate-bounce delay-500"></div>
        </div>

        {/* Heart pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-8 gap-8 h-full p-8">
            {Array.from({ length: 32 }).map((_, i) => (
              <Heart
                key={i}
                className="w-8 h-8 text-white animate-pulse"
                style={{ animationDelay: `${i * 200}ms` }}
                fill="currentColor"
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 dark:bg-black/20 backdrop-blur-md rounded-full mb-4">
              <Heart className="w-5 h-5 text-red-300 mr-2" fill="currentColor" />
              <span className="text-white font-medium">Your Collection</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Your <span className="text-yellow-300 drop-shadow-lg">Favorite</span> Recipes
            </h1>

            <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto leading-relaxed">
              All your saved recipes in one beautiful place
            </p>

            {/* Stats */}
            <div className="flex justify-center space-x-8 text-white/80">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-300">{favoriteRecipes.length}</div>
                <div className="text-sm">Favorites</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-300">
                  {favoriteRecipes.reduce((acc, recipe) => acc + recipe.rating, 0).toFixed(1)}
                </div>
                <div className="text-sm">Total Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {favoriteRecipes.length === 0 ? (
        <div className="text-center py-16">
          {/* Enhanced empty state */}
          <div className="relative mx-auto mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-red-100 to-pink-200 dark:from-red-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center shadow-2xl">
              <Heart className="w-16 h-16 text-red-400 dark:text-red-500" />
            </div>
            <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">No favorites yet</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto leading-relaxed">
            Start exploring recipes and save your favorites by clicking the heart icon. Build your personal collection
            of amazing dishes!
          </p>

          <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-2xl p-6 max-w-md mx-auto">
            <div className="flex items-center justify-center space-x-2 text-red-600 dark:text-red-400">
              <Heart className="w-5 h-5" fill="currentColor" />
              <span className="font-medium">Tip: Click the heart on any recipe to save it here!</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
              Your Favorite Collection ({favoriteRecipes.length})
            </h2>

            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg flex items-center">
              <Star className="w-4 h-4 mr-1" fill="currentColor" />
              {favoriteRecipes.length} saved
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favoriteRecipes.map((recipe, index) => (
              <div
                key={recipe.id}
                className="transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <RecipeCard recipe={recipe} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
