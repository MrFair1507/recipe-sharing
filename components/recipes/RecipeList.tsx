"use client"

import { useState, useMemo } from "react"
import { useRecipes } from "@/contexts/RecipeContext"
import { useAuth } from "@/contexts/AuthContext"
import RecipeCard from "./RecipeCard"
import RecipeFilters from "./RecipeFilters"
import { Input } from "@/components/ui/input"
import { Search, Sparkles, TrendingUp } from "lucide-react"

export default function RecipeList() {
  const { recipes } = useRecipes()
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("newest")
  const [maxCookingTime, setMaxCookingTime] = useState(120)

  const filteredAndSortedRecipes = useMemo(() => {
    const filtered = recipes.filter((recipe) => {
      const matchesSearch =
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.ingredients.some((ingredient) => ingredient.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCategory = selectedCategory === "All" || recipe.category === selectedCategory
      const matchesCookingTime = recipe.cookingTime <= maxCookingTime

      return matchesSearch && matchesCategory && matchesCookingTime
    })

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case "rating":
          return b.rating - a.rating
        case "alphabetical":
          return a.title.localeCompare(b.title)
        case "cookingTime":
          return a.cookingTime - b.cookingTime
        default:
          return 0
      }
    })

    return filtered
  }, [recipes, searchTerm, selectedCategory, sortBy, maxCookingTime])

  const suggestedRecipes = useMemo(() => {
    const userFavorites = JSON.parse(localStorage.getItem("favorites") || "[]")
    const favoriteCategories = recipes
      .filter((recipe) => userFavorites.includes(recipe.id))
      .map((recipe) => recipe.category)

    const categoryCount = favoriteCategories.reduce(
      (acc, category) => {
        acc[category] = (acc[category] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    const topCategory = Object.keys(categoryCount).sort((a, b) => categoryCount[b] - categoryCount[a])[0]

    return recipes
      .filter((recipe) => recipe.category === topCategory && !userFavorites.includes(recipe.id))
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3)
  }, [recipes])

  return (
    <div className="space-y-8">
      {/* Enhanced Hero Section with Beautiful Gradients */}
      <div className="relative w-full h-[650px] overflow-hidden rounded-2xl mx-4 md:mx-0">
        {/* Background with multiple layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 dark:from-green-600 dark:via-emerald-700 dark:to-teal-800"></div>

        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-yellow-300 rounded-full blur-lg animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-blue-300 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-pink-300 rounded-full blur-xl animate-bounce delay-500"></div>
        </div>

        {/* Food pattern overlay */}
        <div
          className="absolute inset-0 opacity-10 dark:opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.4'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <div className="text-center max-w-4xl mx-auto">
            {/* Welcome message with enhanced styling */}
            <div className="mb-6">
              <div className="inline-flex items-center px-4 py-2 bg-white/20 dark:bg-black/20 backdrop-blur-md rounded-full mb-4">
                <Sparkles className="w-5 h-5 text-yellow-300 mr-2" />
                <span className="text-white font-medium">Welcome back!</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                Hello, <span className="text-yellow-300 drop-shadow-lg">{user?.username}</span>!
              </h1>

              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                Discover amazing recipes, share your culinary creations, and connect with food lovers around the world
              </p>
            </div>

            {/* Enhanced Search Bar */}
            <div className="relative max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl blur-sm"></div>
              <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl p-2 shadow-2xl">
                <div className="relative">
                  <Search
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                    size={20}
                  />
                  <Input
                    type="text"
                    placeholder="Search recipes, ingredients, cuisines..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 pr-4 py-3 text-lg border-0 bg-transparent focus:ring-2 focus:ring-green-400 rounded-xl"
                  />
                </div>
              </div>
            </div>

            {/* Stats or quick actions */}
            <div className="mt-8 flex justify-center space-x-8 text-white/80">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-300">{recipes.length}</div>
                <div className="text-sm">Recipes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-300">{suggestedRecipes.length}</div>
                <div className="text-sm">Suggested</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-300">
                  {JSON.parse(localStorage.getItem("favorites") || "[]").length}
                </div>
                <div className="text-sm">Favorites</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Filters Section */}
      <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-700 rounded-2xl p-6 shadow-lg border border-green-100 dark:border-gray-600">
        <RecipeFilters
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          maxCookingTime={maxCookingTime}
          onCookingTimeChange={setMaxCookingTime}
        />
      </div>

      {/* Enhanced Suggested Recipes */}
      {suggestedRecipes.length > 0 && (
        <div className="relative">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 dark:from-green-900/30 dark:via-emerald-900/30 dark:to-teal-900/30 rounded-2xl"></div>

          {/* Content */}
          <div className="relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 border border-green-200 dark:border-green-700 shadow-xl">
            <div className="flex items-center mb-6">
              <div className="flex items-center bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-full mr-4">
                <TrendingUp className="w-5 h-5 mr-2" />
                <span className="font-semibold">Trending</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Suggested for You</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {suggestedRecipes.map((recipe) => (
                <div key={recipe.id} className="transform hover:scale-105 transition-transform duration-300">
                  <RecipeCard recipe={recipe} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Recipe Grid Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            All Recipes ({filteredAndSortedRecipes.length})
          </h2>

          {/* Recipe count badge */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
            {filteredAndSortedRecipes.length} found
          </div>
        </div>

        {filteredAndSortedRecipes.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-400 dark:text-gray-500" />
            </div>
            <p className="text-xl text-gray-500 dark:text-gray-400 mb-2">No recipes found</p>
            <p className="text-gray-400 dark:text-gray-500">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedRecipes.map((recipe, index) => (
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
        )}
      </div>
    </div>
  )
}
