"use client"

import CreditScoreForm from "@/components/credit-score-form"
import { useAuth } from "@/providers/mock-auth-provider"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/auth/signin")
    }
  }, [user, router])

  if (!user) return null
  return <CreditScoreForm />
}

