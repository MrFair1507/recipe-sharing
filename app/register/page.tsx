"use client"
import { useAuth } from "@/contexts/AuthContext"
import { redirect } from "next/navigation"
import RegisterForm from "@/components/auth/RegisterForm"

export default function RegisterPage() {
  const { user } = useAuth()
  if (user) redirect("/")

  return <RegisterForm />
}
