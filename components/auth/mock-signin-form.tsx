"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useAuth } from "@/providers/mock-auth-provider"

const MotionCard = motion.div

export default function MockSignInForm() {
  const [email, setEmail] = useState("")
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login(email)
    router.push("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Matching background elements from credit-score-form.tsx */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-[0.02] dark:opacity-[0.02]" />
        <div className={cn(
          "absolute top-20 -left-1/4 w-1/2 h-1/2 rounded-full blur-3xl",
          "dark:bg-blue-500/10",
          "bg-blue-500/5"
        )} />
        <div className={cn(
          "absolute bottom-20 -right-1/4 w-1/2 h-1/2 rounded-full blur-3xl",
          "dark:bg-purple-500/10",
          "bg-purple-500/5"
        )} />
      </div>

      <MotionCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "w-full max-w-md overflow-hidden border-0 shadow-2xl",
          "dark:bg-white/5 dark:backdrop-blur-xl",
          "bg-white/70 backdrop-blur-xl"
        )}
      >
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h1 className={cn(
              "text-3xl font-bold mb-2",
              "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent"
            )}>
              Acesso Rápido
            </h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className={cn(
                      "pl-10 h-12 text-base",
                      "dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder:text-gray-500",
                      "bg-white/50 border-gray-200 text-gray-900 placeholder:text-gray-500"
                    )}
                    required
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className={cn(
                "w-full h-12 text-base font-medium",
                "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
                "transition-all duration-300 transform hover:scale-[1.02]"
              )}
            >
              Acessar
            </Button>
          </form>
        </CardContent>
      </MotionCard>
    </div>
  )
} 