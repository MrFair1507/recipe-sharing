"use client"

import { Draggable } from "@hello-pangea/dnd"
import { Button } from "@/components/ui/button"
import { X, GripVertical, Clock, Zap } from "lucide-react"
import type { Recipe } from "@/contexts/RecipeContext"

interface Props {
  recipe: Recipe
  index: number
  onRemove: () => void
}

export default function DraggableRecipeCard({ recipe, index, onRemove }: Props) {
  return (
    <Draggable draggableId={recipe.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`bg-white dark:bg-gray-700 rounded-xl shadow hover:shadow-xl transition-all border border-gray-200 dark:border-gray-600 relative ${
            snapshot.isDragging ? "ring-2 ring-purple-400 scale-105" : ""
          }`}
        >
          {/* Image */}
          <div className="relative h-24 overflow-hidden rounded-t-xl">
            <img
              src={recipe.image || "/placeholder.svg"}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

            {/* Category */}
            <div className="absolute top-2 left-2 bg-pink-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
              {recipe.category}
            </div>

            {/* Drag handle */}
            <div
              {...provided.dragHandleProps}
              className="absolute top-2 right-2 bg-white/80 dark:bg-gray-800/70 p-1 rounded-lg cursor-grab active:cursor-grabbing"
            >
              <GripVertical size={14} className="text-gray-600 dark:text-gray-300" />
            </div>
          </div>

          {/* Content */}
          <div className="p-3">
            <div className="flex justify-between items-start">
              <h4 className="font-semibold text-sm truncate text-gray-800 dark:text-white">{recipe.title}</h4>
              <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:text-red-700 p-1 rounded"
                onClick={(e) => {
                  e.stopPropagation()
                  onRemove()
                }}
              >
                <X size={14} />
              </Button>
            </div>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-300 mt-2">
              <div className="flex items-center gap-1">
                <Clock size={12} />
                {recipe.cookingTime}m
              </div>
              <div className="flex items-center gap-1 text-orange-500">
                <Zap size={12} />
                {recipe.nutritionalInfo.calories}
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  )
}
