"use client"
import { useAuth } from "@/contexts/AuthContext"
import { redirect } from "next/navigation"
import LoginForm from "@/components/auth/LoginForm"

export default function LoginPage() {
  const { user } = useAuth()
  if (user) redirect("/")

  return <LoginForm />
}
