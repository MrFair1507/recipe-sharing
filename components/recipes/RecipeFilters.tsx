"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Filter, SortAsc, Clock } from "lucide-react"

interface RecipeFiltersProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
  sortBy: string
  onSortChange: (sort: string) => void
  maxCookingTime: number
  onCookingTimeChange: (time: number) => void
}

const categories = ["All", "Breakfast", "Lunch", "Dinner", "Dessert", "Snack", "Appetizer"]

export default function RecipeFilters({
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  maxCookingTime,
  onCookingTimeChange,
}: RecipeFiltersProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-green-100 dark:border-gray-600">
      <div className="flex items-center mb-4">
        <div className="flex items-center bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1.5 rounded-full mr-3">
          <Filter className="w-4 h-4 mr-2" />
          <span className="font-medium text-sm">Filters</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Refine Your Search</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Category Filter */}
        <div className="space-y-3">
          <Label htmlFor="category" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
            <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-2"></div>
            Category
          </Label>
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger className="border-2 border-gray-200 dark:border-gray-600 focus:border-green-400 dark:focus:border-green-500 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-2 border-gray-200 dark:border-gray-600">
              {categories.map((category) => (
                <SelectItem
                  key={category}
                  value={category}
                  className="hover:bg-green-50 dark:hover:bg-green-900/20 focus:bg-green-100 dark:focus:bg-green-900/30"
                >
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sort Filter */}
        <div className="space-y-3">
          <Label htmlFor="sort" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mr-2"></div>
            Sort by
          </Label>
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="border-2 border-gray-200 dark:border-gray-600 focus:border-green-400 dark:focus:border-green-500 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-2 border-gray-200 dark:border-gray-600">
              <SelectItem value="newest" className="hover:bg-green-50 dark:hover:bg-green-900/20">
                <div className="flex items-center">
                  <SortAsc className="w-4 h-4 mr-2" />
                  Newest First
                </div>
              </SelectItem>
              <SelectItem value="oldest" className="hover:bg-green-50 dark:hover:bg-green-900/20">
                Oldest First
              </SelectItem>
              <SelectItem value="rating" className="hover:bg-green-50 dark:hover:bg-green-900/20">
                Highest Rated
              </SelectItem>
              <SelectItem value="alphabetical" className="hover:bg-green-50 dark:hover:bg-green-900/20">
                A-Z
              </SelectItem>
              <SelectItem value="cookingTime" className="hover:bg-green-50 dark:hover:bg-green-900/20">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Cooking Time
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Cooking Time Slider */}
        <div className="space-y-3">
          <Label
            htmlFor="cookingTime"
            className="flex items-center justify-between text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            <div className="flex items-center">
              <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-red-400 rounded-full mr-2"></div>
              Max Cooking Time
            </div>
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              {maxCookingTime} min
            </div>
          </Label>
          <div className="px-2">
            <Slider
              value={[maxCookingTime]}
              onValueChange={(value) => onCookingTimeChange(value[0])}
              max={120}
              min={5}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>5 min</span>
              <span>120 min</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
