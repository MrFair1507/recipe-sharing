"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface Recipe {
  id: string
  title: string
  description: string
  ingredients: string[]
  instructions: string
  cookingTime: number
  servings: number
  category: string
  rating: number
  nutritionalInfo: {
    calories: number
    protein: number
    fat: number
    carbs: number
  }
  comments: Comment[]
  createdBy: string
  createdAt: string
  image?: string
}

export interface Comment {
  id: string
  username: string
  text: string
  timestamp: string
}

interface RecipeContextType {
  recipes: Recipe[]
  favorites: string[]
  addRecipe: (recipe: Omit<Recipe, "id" | "createdAt" | "comments" | "rating">) => void
  updateRecipe: (id: string, updates: Partial<Recipe>) => void
  deleteRecipe: (id: string) => void
  toggleFavorite: (recipeId: string) => void
  addComment: (recipeId: string, comment: string, username: string) => void
  rateRecipe: (recipeId: string, rating: number) => void
  getRecipeById: (id: string) => Recipe | undefined
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined)

// Mock data
const mockRecipes: Recipe[] = [
  {
    id: "1",
    title: "Spaghetti Bolognese",
    description: "Classic Italian pasta dish with rich meat sauce",
    ingredients: [
      "500g spaghetti",
      "300g ground beef",
      "400ml tomato sauce",
      "1 onion",
      "2 cloves garlic",
      "olive oil",
      "salt",
      "pepper",
    ],
    instructions:
      "Cook pasta according to package instructions. In a large pan, heat olive oil and sauté onion and garlic. Add ground beef and cook until browned. Add tomato sauce and simmer for 20 minutes. Season with salt and pepper. Serve over pasta.",
    cookingTime: 45,
    servings: 4,
    category: "Dinner",
    rating: 4.5,
    nutritionalInfo: { calories: 600, protein: 25, fat: 15, carbs: 80 },
    comments: [
      {
        id: "1",
        username: "FoodLover",
        text: "Absolutely delicious! My family loved it.",
        timestamp: "2025-01-15T10:00:00Z",
      },
    ],
    createdBy: "chef1",
    createdAt: "2025-01-10T08:00:00Z",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "2",
    title: "Green Smoothie Bowl",
    description: "Healthy and refreshing breakfast bowl packed with nutrients",
    ingredients: [
      "1 banana",
      "1 cup spinach",
      "1/2 avocado",
      "1 cup almond milk",
      "1 tbsp chia seeds",
      "granola",
      "berries",
    ],
    instructions:
      "Blend banana, spinach, avocado, and almond milk until smooth. Pour into a bowl and top with chia seeds, granola, and berries.",
    cookingTime: 10,
    servings: 1,
    category: "Breakfast",
    rating: 4.8,
    nutritionalInfo: { calories: 350, protein: 12, fat: 18, carbs: 45 },
    comments: [],
    createdBy: "healthyguru",
    createdAt: "2025-01-12T07:00:00Z",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "3",
    title: "Chocolate Chip Cookies",
    description: "Soft and chewy homemade chocolate chip cookies",
    ingredients: [
      "2 cups flour",
      "1 cup butter",
      "3/4 cup brown sugar",
      "1/2 cup white sugar",
      "2 eggs",
      "1 tsp vanilla",
      "1 tsp baking soda",
      "1 cup chocolate chips",
    ],
    instructions:
      "Preheat oven to 375°F. Cream butter and sugars. Add eggs and vanilla. Mix in dry ingredients, then fold in chocolate chips. Drop spoonfuls on baking sheet and bake for 9-11 minutes.",
    cookingTime: 25,
    servings: 24,
    category: "Dessert",
    rating: 4.7,
    nutritionalInfo: { calories: 180, protein: 3, fat: 8, carbs: 26 },
    comments: [
      {
        id: "2",
        username: "BakingMom",
        text: "Perfect recipe! Kids absolutely love these.",
        timestamp: "2025-01-14T15:30:00Z",
      },
    ],
    createdBy: "baker123",
    createdAt: "2025-01-11T14:00:00Z",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export function RecipeProvider({ children }: { children: React.ReactNode }) {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    // Load recipes from localStorage or use mock data
    const savedRecipes = localStorage.getItem("recipes")
    if (savedRecipes) {
      setRecipes(JSON.parse(savedRecipes))
    } else {
      setRecipes(mockRecipes)
      localStorage.setItem("recipes", JSON.stringify(mockRecipes))
    }

    // Load favorites
    const savedFavorites = localStorage.getItem("favorites")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  const saveRecipes = (newRecipes: Recipe[]) => {
    setRecipes(newRecipes)
    localStorage.setItem("recipes", JSON.stringify(newRecipes))
  }

  const saveFavorites = (newFavorites: string[]) => {
    setFavorites(newFavorites)
    localStorage.setItem("favorites", JSON.stringify(newFavorites))
  }

  const addRecipe = (recipeData: Omit<Recipe, "id" | "createdAt" | "comments" | "rating">) => {
    const newRecipe: Recipe = {
      ...recipeData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      comments: [],
      rating: 0,
    }
    const updatedRecipes = [...recipes, newRecipe]
    saveRecipes(updatedRecipes)
  }

  const updateRecipe = (id: string, updates: Partial<Recipe>) => {
    const updatedRecipes = recipes.map((recipe) => (recipe.id === id ? { ...recipe, ...updates } : recipe))
    saveRecipes(updatedRecipes)
  }

  const deleteRecipe = (id: string) => {
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== id)
    saveRecipes(updatedRecipes)
  }

  const toggleFavorite = (recipeId: string) => {
    const newFavorites = favorites.includes(recipeId)
      ? favorites.filter((id) => id !== recipeId)
      : [...favorites, recipeId]
    saveFavorites(newFavorites)
  }

  const addComment = (recipeId: string, comment: string, username: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      username,
      text: comment,
      timestamp: new Date().toISOString(),
    }

    const updatedRecipes = recipes.map((recipe) =>
      recipe.id === recipeId ? { ...recipe, comments: [...recipe.comments, newComment] } : recipe,
    )
    saveRecipes(updatedRecipes)
  }

  const rateRecipe = (recipeId: string, rating: number) => {
    const updatedRecipes = recipes.map((recipe) => (recipe.id === recipeId ? { ...recipe, rating } : recipe))
    saveRecipes(updatedRecipes)
  }

  const getRecipeById = (id: string) => {
    return recipes.find((recipe) => recipe.id === id)
  }

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        favorites,
        addRecipe,
        updateRecipe,
        deleteRecipe,
        toggleFavorite,
        addComment,
        rateRecipe,
        getRecipeById,
      }}
    >
      {children}
    </RecipeContext.Provider>
  )
}

export function useRecipes() {
  const context = useContext(RecipeContext)
  if (context === undefined) {
    throw new Error("useRecipes must be used within a RecipeProvider")
  }
  return context
}
