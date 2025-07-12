"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useRecipes } from "@/contexts/RecipeContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Edit2, Save, X, Heart, ChefHat, MessageCircle } from "lucide-react"
import RecipeCard from "@/components/recipes/RecipeCard"

export default function Profile() {
  const { user, updateProfile } = useAuth()
  const { recipes, favorites } = useRecipes()
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    username: user?.username || "",
    profilePicture: user?.profilePicture || "",
    dietaryPreferences: user?.dietaryPreferences || [],
  })

  if (!user) return null

  const userRecipes = recipes.filter((recipe) => recipe.createdBy === user.id)
  const favoriteRecipes = recipes.filter((recipe) => favorites.includes(recipe.id))
  const totalComments = recipes.reduce(
    (total, recipe) => total + recipe.comments.filter((comment) => comment.username === user.username).length,
    0,
  )

  const handleSave = () => {
    updateProfile(editData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData({
      username: user.username,
      profilePicture: user.profilePicture || "",
      dietaryPreferences: user.dietaryPreferences || [],
    })
    setIsEditing(false)
  }

  const addDietaryPreference = (preference: string) => {
    if (preference && !editData.dietaryPreferences.includes(preference)) {
      setEditData((prev) => ({
        ...prev,
        dietaryPreferences: [...prev.dietaryPreferences, preference],
      }))
    }
  }

  const removeDietaryPreference = (preference: string) => {
    setEditData((prev) => ({
      ...prev,
      dietaryPreferences: prev.dietaryPreferences.filter((p) => p !== preference),
    }))
  }

  const commonDietaryPreferences = [
    "Vegetarian",
    "Vegan",
    "Gluten-Free",
    "Dairy-Free",
    "Keto",
    "Paleo",
    "Low-Carb",
    "High-Protein",
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold text-green-800 dark:text-green-400">Profile</CardTitle>
            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                className="border-green-300 text-green-700 hover:bg-green-50"
              >
                <Edit2 size={16} className="mr-2" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                  <Save size={16} className="mr-2" />
                  Save
                </Button>
                <Button onClick={handleCancel} variant="outline">
                  <X size={16} className="mr-2" />
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-start space-x-6">
            <div className="flex-shrink-0">
              {isEditing ? (
                <div className="space-y-2">
                  <img
                    src={editData.profilePicture || "/placeholder.svg?height=80&width=80"}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <Input
                    type="url"
                    placeholder="Profile picture URL"
                    value={editData.profilePicture}
                    onChange={(e) => setEditData((prev) => ({ ...prev, profilePicture: e.target.value }))}
                    className="w-32 text-xs border-green-300 focus:border-green-500"
                  />
                </div>
              ) : (
                <img
                  src={user.profilePicture || "/placeholder.svg?height=80&width=80"}
                  alt={user.username}
                  className="w-20 h-20 rounded-full object-cover"
                />
              )}
            </div>

            <div className="flex-1 space-y-4">
              <div>
                {isEditing ? (
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={editData.username}
                      onChange={(e) => setEditData((prev) => ({ ...prev, username: e.target.value }))}
                      className="border-green-300 focus:border-green-500"
                    />
                  </div>
                ) : (
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{user.username}</h2>
                )}
                <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
              </div>

              <div>
                <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Dietary Preferences</h3>
                {isEditing ? (
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {editData.dietaryPreferences.map((preference) => (
                        <Badge
                          key={preference}
                          variant="secondary"
                          className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                        >
                          {preference}
                          <button
                            onClick={() => removeDietaryPreference(preference)}
                            className="ml-1 text-green-600 hover:text-green-800"
                          >
                            <X size={12} />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {commonDietaryPreferences
                        .filter((pref) => !editData.dietaryPreferences.includes(pref))
                        .map((preference) => (
                          <button
                            key={preference}
                            onClick={() => addDietaryPreference(preference)}
                            className="text-xs px-2 py-1 border border-green-300 text-green-700 rounded hover:bg-green-50"
                          >
                            + {preference}
                          </button>
                        ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {user.dietaryPreferences?.length ? (
                      user.dietaryPreferences.map((preference) => (
                        <Badge
                          key={preference}
                          variant="secondary"
                          className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                        >
                          {preference}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-gray-500 dark:text-gray-400 text-sm">No dietary preferences set</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="text-center">
          <CardContent className="p-6">
            <ChefHat className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-700 dark:text-green-400">{userRecipes.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Recipes Created</div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-red-600">{favoriteRecipes.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Favorite Recipes</div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="p-6">
            <MessageCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">{totalComments}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Comments Posted</div>
          </CardContent>
        </Card>
      </div>

      {/* User's Recipes */}
      {userRecipes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-green-800 dark:text-green-400">My Recipes ({userRecipes.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userRecipes.slice(0, 6).map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
            {userRecipes.length > 6 && (
              <div className="text-center mt-4">
                <Button variant="outline" className="border-green-300 text-green-700 bg-transparent">
                  View All My Recipes
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Favorite Recipes */}
      {favoriteRecipes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-green-800 dark:text-green-400">
              Favorite Recipes ({favoriteRecipes.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {favoriteRecipes.slice(0, 6).map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
            {favoriteRecipes.length > 6 && (
              <div className="text-center mt-4">
                <Button variant="outline" className="border-green-300 text-green-700 bg-transparent">
                  View All Favorites
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
