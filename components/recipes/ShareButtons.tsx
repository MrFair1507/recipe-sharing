"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Facebook, Twitter, Link2, Check } from "lucide-react"

interface ShareButtonsProps {
  recipe: {
    id: string
    title: string
    description: string
  }
}

export default function ShareButtons({ recipe }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const recipeUrl = `${window.location.origin}/recipe/${recipe.id}`
  const shareText = `Check out this amazing recipe: ${recipe.title}`

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(recipeUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy link:", err)
    }
  }

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(recipeUrl)}`
    window.open(url, "_blank", "width=550,height=420")
  }

  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(recipeUrl)}`
    window.open(url, "_blank", "width=550,height=420")
  }

  return (
    <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
      <CardContent className="p-4">
        <h3 className="text-sm font-medium text-green-800 dark:text-green-400 mb-3">Share this recipe</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleTwitterShare}
            className="flex items-center space-x-1 border-green-300 text-green-700 hover:bg-green-50 bg-transparent"
          >
            <Twitter size={16} />
            <span>Twitter</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleFacebookShare}
            className="flex items-center space-x-1 border-green-300 text-green-700 hover:bg-green-50 bg-transparent"
          >
            <Facebook size={16} />
            <span>Facebook</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyLink}
            className="flex items-center space-x-1 border-green-300 text-green-700 hover:bg-green-50 bg-transparent"
          >
            {copied ? <Check size={16} /> : <Link2 size={16} />}
            <span>{copied ? "Copied!" : "Copy Link"}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
