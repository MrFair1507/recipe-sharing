"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { User, Mail, Lock, ImageIcon, Sparkles } from "lucide-react"

export default function RegisterForm() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [profilePicture, setProfilePicture] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (!username || !email || !password) {
      setError("Please fill in all required fields")
      setLoading(false)
      return
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long")
      setLoading(false)
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address")
      setLoading(false)
      return
    }

    const success = await register(username, email, password, profilePicture)
    if (!success) {
      setError("User with this email already exists")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 dark:from-emerald-800 dark:via-teal-900 dark:to-cyan-900 p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/5 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/5 w-56 h-56 bg-yellow-300/20 rounded-full blur-2xl animate-bounce delay-500"></div>
        <div className="absolute top-2/3 right-1/2 w-40 h-40 bg-pink-300/20 rounded-full blur-xl animate-pulse delay-1500"></div>
      </div>

      <Card className="w-full max-w-md relative z-10 bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg shadow-2xl border-0">
        <CardHeader className="text-center pb-2">
          {/* Enhanced logo */}
          <div className="relative mx-auto mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-xl transform -rotate-3 hover:rotate-0 transition-transform duration-300">
              <span className="text-white font-bold text-3xl">R</span>
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
          </div>

          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
            Join RecipeShare
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400 text-lg">
            Create your account to start sharing recipes
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive" className="border-red-200 bg-red-50 dark:bg-red-900/20">
                <AlertDescription className="text-red-700 dark:text-red-400">{error}</AlertDescription>
              </Alert>
            )}

            {/* Username Input */}
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center"
              >
                <User className="w-4 h-4 mr-2 text-emerald-600" />
                Username *
              </label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose a username"
                className="pl-4 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 focus:border-emerald-400 dark:focus:border-emerald-500 rounded-xl bg-gray-50 dark:bg-gray-700 transition-all duration-200 hover:border-emerald-300"
              />
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                <Mail className="w-4 h-4 mr-2 text-emerald-600" />
                Email *
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="pl-4 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 focus:border-emerald-400 dark:focus:border-emerald-500 rounded-xl bg-gray-50 dark:bg-gray-700 transition-all duration-200 hover:border-emerald-300"
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center"
              >
                <Lock className="w-4 h-4 mr-2 text-emerald-600" />
                Password *
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password (min 8 characters)"
                className="pl-4 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 focus:border-emerald-400 dark:focus:border-emerald-500 rounded-xl bg-gray-50 dark:bg-gray-700 transition-all duration-200 hover:border-emerald-300"
              />
            </div>

            {/* Profile Picture Input */}
            <div className="space-y-2">
              <label
                htmlFor="profilePicture"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center"
              >
                <ImageIcon className="w-4 h-4 mr-2 text-emerald-600" />
                Profile Picture URL (Optional)
              </label>
              <Input
                id="profilePicture"
                type="url"
                value={profilePicture}
                onChange={(e) => setProfilePicture(e.target.value)}
                placeholder="https://example.com/your-photo.jpg"
                className="pl-4 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 focus:border-emerald-400 dark:focus:border-emerald-500 rounded-xl bg-gray-50 dark:bg-gray-700 transition-all duration-200 hover:border-emerald-300"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Creating account...
                </div>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-600">
            <p className="text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 font-semibold hover:underline transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
