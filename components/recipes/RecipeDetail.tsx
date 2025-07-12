"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useParams } from "next/navigation"
import { useRecipes } from "@/contexts/RecipeContext"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Clock, Users, Star, ArrowLeft, Share2, Edit, Trash2 } from "lucide-react"
import ShareButtons from "./ShareButtons"
import RatingStars from "./RatingStars"

export default function RecipeDetail() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const { user } = useAuth()
  const { getRecipeById, favorites, toggleFavorite, addComment, deleteRecipe } = useRecipes()
  const [comment, setComment] = useState("")
  const [showShare, setShowShare] = useState(false)

  const recipe = getRecipeById(id!)

  if (!recipe) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400 text-lg">Recipe not found</p>
        <Button className="mt-4 bg-green-600 hover:bg-green-700" onClick={() => router.push("/")}>
          Back to Recipes
        </Button>
      </div>
    )
  }

  const isFavorite = favorites.includes(recipe.id)
  const isOwner = recipe.createdBy === user?.id

  const handleAddComment = () => {
    if (comment.trim() && user) {
      addComment(recipe.id, comment.trim(), user.username)
      setComment("")
    }
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      deleteRecipe(recipe.id)
      router.push("/")
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => router.back()} className="text-green-600 hover:text-green-700">
          <ArrowLeft size={16} className="mr-2" />
          Back
        </Button>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" onClick={() => setShowShare(!showShare)} className="text-green-600 hover:text-green-700">
            <Share2 size={16} />
          </Button>
          {isOwner && (
            <>
              <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
                <Edit size={16} />
              </Button>
              <Button variant="ghost" onClick={handleDelete} className="text-red-600 hover:text-red-700">
                <Trash2 size={16} />
              </Button>
            </>
          )}
        </div>
      </div>

      {showShare && <ShareButtons recipe={recipe} />}

      {/* Recipe Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="relative">
          <img
            src={recipe.image || "/placeholder.svg?height=400&width=800"}
            alt={recipe.title}
            className="w-full h-64 md:h-80 object-cover"
          />
          <Button
            onClick={() => toggleFavorite(recipe.id)}
            className={`absolute top-4 right-4 p-3 rounded-full ${
              isFavorite ? "bg-red-100 text-red-600 hover:bg-red-200" : "bg-white/80 text-gray-600 hover:bg-white"
            }`}
          >
            <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
          </Button>
          <Badge className="absolute top-4 left-4 bg-green-600 text-white">{recipe.category}</Badge>
        </div>

        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">{recipe.title}</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{recipe.description}</p>

          <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <div className="flex items-center space-x-1">
              <Clock size={16} />
              <span>{recipe.cookingTime} minutes</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users size={16} />
              <span>{recipe.servings} servings</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star size={16} fill="currentColor" className="text-yellow-500" />
              <span>{recipe.rating.toFixed(1)}</span>
            </div>
          </div>

          <RatingStars recipeId={recipe.id} currentRating={recipe.rating} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ingredients & Instructions */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-green-800 dark:text-green-400">Ingredients</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-green-800 dark:text-green-400">Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{recipe.instructions}</p>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-green-800 dark:text-green-400">Nutrition (per serving)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(recipe.nutritionalInfo).map(([key, value]) => (
                <div className="flex justify-between" key={key}>
                  <span className="text-gray-600 dark:text-gray-400 capitalize">{key}</span>
                  <span className="font-medium">{value}{key === "calories" ? "" : "g"}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-green-800 dark:text-green-400">Comments ({recipe.comments.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Textarea
                  placeholder="Share your thoughts..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  maxLength={500}
                  className="border-green-300 focus:border-green-500"
                />
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">{comment.length}/500 characters</span>
                  <Button
                    onClick={handleAddComment}
                    disabled={!comment.trim()}
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Add Comment
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                {recipe.comments.length === 0 && (
                  <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-4">
                    No comments yet. Be the first to share your thoughts!
                  </p>
                )}
                {recipe.comments.map((comment) => (
                  <div key={comment.id} className="border-l-2 border-green-200 pl-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm text-green-700 dark:text-green-400">{comment.username}</span>
                      <span className="text-xs text-gray-500">{new Date(comment.timestamp).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{comment.text}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
