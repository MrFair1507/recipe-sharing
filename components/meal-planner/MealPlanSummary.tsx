"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, TrendingUp, Clock, Users } from "lucide-react"

interface MealPlanSummaryProps {
  totalNutrition: {
    totalCalories: number
    totalProtein: number
    totalFat: number
    totalCarbs: number
  }
  totalRecipes: number
  totalCookingTime: number
  averageServings: number
}

export default function MealPlanSummary({
  totalNutrition,
  totalRecipes,
  totalCookingTime,
  averageServings,
}: MealPlanSummaryProps) {
  return (
    <Card className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
      <CardHeader>
        <CardTitle className="text-green-800 dark:text-green-400 flex items-center">
          <TrendingUp className="mr-2" size={20} />
          Weekly Meal Plan Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-700 dark:text-green-400">{totalNutrition.totalCalories}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Calories</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-700 dark:text-green-400">{totalNutrition.totalProtein}g</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Protein</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-700 dark:text-green-400">{totalNutrition.totalFat}g</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Fat</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-700 dark:text-green-400">{totalNutrition.totalCarbs}g</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Carbs</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
            <Calendar className="w-3 h-3 mr-1" />
            {totalRecipes} recipes planned
          </Badge>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
            <Clock className="w-3 h-3 mr-1" />
            {totalCookingTime} min total cooking
          </Badge>
          <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100">
            <Users className="w-3 h-3 mr-1" />~{averageServings} avg servings
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
