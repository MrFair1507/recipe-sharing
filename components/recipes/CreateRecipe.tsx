"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { useRecipes } from "@/contexts/RecipeContext"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Plus, X, ImagePlus } from "lucide-react"

const categories = ["Breakfast", "Lunch", "Dinner", "Dessert", "Snack", "Appetizer"]

export default function CreateRecipe() {
  const router = useRouter()
  const { user } = useAuth()
  const { addRecipe } = useRecipes()

  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    cookingTime: 30,
    servings: 2,
    ingredients: [""],
    instructions: "",
    image: "",
    nutritionalInfo: { calories: 0, protein: 0, fat: 0, carbs: 0 },
  })

  const update = (field: string, value: any) =>
    setForm((f) => ({ ...f, [field]: value }))

  const updateNutrition = (key: string, value: number) =>
    setForm((f) => ({
      ...f,
      nutritionalInfo: { ...f.nutritionalInfo, [key]: value },
    }))

  const addIngredient = () =>
    setForm((f) => ({ ...f, ingredients: [...f.ingredients, ""] }))

  const removeIngredient = (i: number) =>
    setForm((f) => ({
      ...f,
      ingredients: f.ingredients.filter((_, idx) => idx !== i),
    }))

  const updateIngredient = (i: number, value: string) =>
    setForm((f) => ({
      ...f,
      ingredients: f.ingredients.map((ing, idx) =>
        idx === i ? value : ing
      ),
    }))

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => {
      update("image", reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    addRecipe({ ...form, createdBy: user?.id || "anonymous" })
    router.push("/")
  }

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-purple-600">🍽 Create New Recipe</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-10">

            {/* 🔹 Basic Info */}
            <section className="bg-purple-50 dark:bg-purple-900/10 rounded-xl p-6 space-y-4 shadow">
              <h3 className="font-semibold text-lg text-purple-700 dark:text-purple-300">📋 Basic Info</h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Title</Label>
                  <Input value={form.title} onChange={(e) => update("title", e.target.value)} />
                </div>
                <div>
                  <Label>Category</Label>
                  <Select value={form.category} onValueChange={(v) => update("category", v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Cooking Time (min)</Label>
                  <Input
                    type="number"
                    value={form.cookingTime}
                    onChange={(e) => update("cookingTime", +e.target.value)}
                  />
                </div>
                <div>
                  <Label>Servings</Label>
                  <Input
                    type="number"
                    value={form.servings}
                    onChange={(e) => update("servings", +e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                />
              </div>
            </section>

            {/* 🔹 Image Upload */}
            <section className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-6 space-y-4 shadow">
              <h3 className="font-semibold text-lg text-blue-700 dark:text-blue-300">🖼 Image</h3>

              <div className="space-y-2">
                <Label htmlFor="image-upload" className="flex items-center gap-2 cursor-pointer">
                  <ImagePlus className="w-4 h-4" />
                  Choose Image
                </Label>
                <Input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} />
              </div>

              {form.image && (
                <img
                  src={form.image}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg shadow border"
                />
              )}
            </section>

            {/* 🔹 Ingredients */}
            <section className="bg-green-50 dark:bg-green-900/10 rounded-xl p-6 space-y-4 shadow">
              <h3 className="font-semibold text-lg text-green-700 dark:text-green-300">🥦 Ingredients</h3>
              {form.ingredients.map((ing, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <Input
                    value={ing}
                    onChange={(e) => updateIngredient(i, e.target.value)}
                    className="flex-1"
                    placeholder={`Ingredient ${i + 1}`}
                  />
                  {form.ingredients.length > 1 && (
                    <Button type="button" variant="ghost" onClick={() => removeIngredient(i)}>
                      <X size={16} />
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" onClick={addIngredient} size="sm">
                <Plus size={14} className="mr-1" /> Add Ingredient
              </Button>
            </section>

            {/* 🔹 Instructions */}
            <section className="bg-yellow-50 dark:bg-yellow-900/10 rounded-xl p-6 space-y-4 shadow">
              <h3 className="font-semibold text-lg text-yellow-700 dark:text-yellow-300">📝 Instructions</h3>
              <Textarea
                rows={6}
                value={form.instructions}
                onChange={(e) => update("instructions", e.target.value)}
                placeholder="Step-by-step guide..."
              />
            </section>

            {/* 🔹 Nutrition */}
            <section className="bg-rose-50 dark:bg-rose-900/10 rounded-xl p-6 space-y-4 shadow">
              <h3 className="font-semibold text-lg text-rose-700 dark:text-rose-300">🧪 Nutrition</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["calories", "protein", "fat", "carbs"].map((field) => (
                  <div key={field}>
                    <Label className="capitalize">{field}</Label>
                    <Input
                      type="number"
                      value={form.nutritionalInfo[field as keyof typeof form.nutritionalInfo]}
                      onChange={(e) => updateNutrition(field, +e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* 🔹 Submit */}
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => router.push("/")}>
                Cancel
              </Button>
              <Button type="submit" className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
                Save Recipe
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
