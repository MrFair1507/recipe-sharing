"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { useTheme } from "@/contexts/ThemeContext"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Heart, Calendar, Plus, Home, Sparkles } from "lucide-react"

export default function Header() {
  const { user, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const pathname = usePathname()

  if (!user) return null

  const navItems = [
    { path: "/", icon: Home, label: "Recipes" },
    { path: "/create", icon: Plus, label: "Create" },
    { path: "/favorites", icon: Heart, label: "Favorites" },
    { path: "/meal-planner", icon: Calendar, label: "Meal Planner" },
  ]

  return (
    <header className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg shadow-lg border-b border-green-100 dark:border-green-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                <Sparkles className="w-2 h-2 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                RecipeShare
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Culinary Community</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                href={path}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-300 font-medium ${
                  pathname === path
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg transform scale-105"
                    : "text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
                }`}
              >
                <Icon size={18} />
                <span className="text-sm">{label}</span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-300"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </Button>

            <div className="flex items-center space-x-3 bg-gradient-to-r from-gray-50 to-green-50 dark:from-gray-700 dark:to-green-900/20 px-4 py-2 rounded-xl">
              <div className="relative">
                <img
                  src={user.profilePicture || "/placeholder.svg"}
                  alt={user.username}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-green-200 dark:ring-green-700"
                />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
              </div>
              <Link
                href="/profile"
                className="text-gray-700 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400 font-medium transition-colors"
              >
                {user.username}
              </Link>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/20 bg-transparent rounded-xl px-4 py-2 font-medium transition-all duration-300"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
