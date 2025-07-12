"use client"

import { Droppable } from "@hello-pangea/dnd"
import DraggableRecipeCard from "./DraggableRecipeCard"
import type { Recipe } from "@/contexts/RecipeContext"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface Props {
  day: string
  recipes: Recipe[]
  onRemoveRecipe: (recipeId: string) => void
  onAddRecipe: () => void
}

export default function DroppableDayContainer({ day, recipes, onRemoveRecipe, onAddRecipe }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md border border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">{day}</h3>
        <Button
          variant="secondary"
          size="sm"
          onClick={onAddRecipe}
          className="text-xs font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105"
        >
          <Plus size={14} className="mr-1" />
          Add
        </Button>
      </div>

      <Droppable droppableId={day}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex flex-col gap-3 p-2 rounded-md min-h-[100px] transition ${
              snapshot.isDraggingOver
                ? "bg-purple-50 dark:bg-purple-900/20 border-2 border-dashed border-purple-400"
                : "bg-gray-50 dark:bg-gray-700"
            }`}
          >
            {recipes.length === 0 && (
              <div className="text-center text-sm text-gray-400 italic py-4">
                Drag a recipe here
              </div>
            )}
            {recipes.map((recipe, index) => (
              <DraggableRecipeCard
                key={recipe.id}
                recipe={recipe}
                index={index}
                onRemove={() => onRemoveRecipe(recipe.id)}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}
