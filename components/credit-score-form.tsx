"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, CreditCard, Lock, Wallet } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

const MotionCard = motion(Card)

export default function CreditScoreForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>("")
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name"),
      cpf: formData.get("cpf"),
      birthDate: formData.get("birthDate"),
      email: formData.get("email"),
    }

    try {
      const response = await fetch("/api/credit-score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Erro ao consultar score")
      }

      const result = await response.json()

      // Salva os dados no localStorage
      localStorage.setItem("creditScoreData", JSON.stringify(result))

      // Redireciona para a página do relatório
      router.push("/relatorio")
    } catch (err) {
      setError("Ocorreu um erro ao consultar seu score. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className={cn(
        "min-h-screen p-4 md:p-8 relative overflow-hidden transition-colors duration-300",
        "dark:bg-[#0A0F1C] dark:text-white",
        "bg-[#F8FAFC] text-gray-900",
      )}
    >
      {/* Elementos decorativos de fundo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-[0.02] dark:opacity-[0.02]" />
        <div
          className={cn(
            "absolute top-20 -left-1/4 w-1/2 h-1/2 rounded-full blur-3xl",
            "dark:bg-blue-500/10",
            "bg-blue-500/5",
          )}
        />
        <div
          className={cn(
            "absolute bottom-20 -right-1/4 w-1/2 h-1/2 rounded-full blur-3xl",
            "dark:bg-purple-500/10",
            "bg-purple-500/5",
          )}
        />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 md:mb-16 space-y-4"
        >
          <div className="inline-block">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs md:text-sm font-medium bg-white/10 backdrop-blur-xl border border-white/20 text-gray-600 dark:text-gray-300 mb-4">
              Análise de crédito simplificada ✨
            </span>
          </div>
          <h1
            className={cn(
              "text-4xl md:text-6xl font-bold tracking-tight",
              "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent",
            )}
          >
            Score de Crédito
            <span className="block text-2xl md:text-3xl mt-2 font-normal">Inteligente e Preciso</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light">
            Descubra seu potencial financeiro com nossa análise avançada e receba recomendações personalizadas.
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-3 gap-6 mb-12 md:mb-16"
        >
          {[
            {
              icon: <Lock className="w-6 h-6" />,
              title: "100% Seguro",
              description: "Seus dados são protegidos com criptografia de ponta",
            },
            {
              icon: <CreditCard className="w-6 h-6" />,
              title: "Análise Completa",
              description: "Avaliação detalhada do seu perfil de crédito",
            },
            {
              icon: <Wallet className="w-6 h-6" />,
              title: "Recomendações",
              description: "Dicas personalizadas para melhorar seu score",
            },
          ].map((feature, index) => (
            <MotionCard
              key={index}
              whileHover={{ y: -5 }}
              className={cn(
                "overflow-hidden transition-all duration-300",
                "dark:bg-white/5 dark:border-white/10 dark:backdrop-blur-xl",
                "bg-white/70 border-white/20 backdrop-blur-xl hover:shadow-xl",
              )}
            >
              <CardContent className="p-6 md:p-8">
                <div className="space-y-4">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center text-white",
                      "bg-gradient-to-br from-blue-500 to-purple-500",
                    )}
                  >
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </MotionCard>
          ))}
        </motion.div>

        {/* Form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card
            className={cn(
              "overflow-hidden border-0 shadow-2xl",
              "dark:bg-white/5 dark:backdrop-blur-xl",
              "bg-white/70 backdrop-blur-xl",
            )}
          >
            <CardContent className="p-6 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-base font-medium text-gray-700 dark:text-gray-300">
                      Nome Completo
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Digite seu nome completo"
                      required
                      className={cn(
                        "h-12 text-base",
                        "dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder:text-gray-500",
                        "bg-white/50 border-gray-200 text-gray-900 placeholder:text-gray-500",
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cpf" className="text-base font-medium text-gray-700 dark:text-gray-300">
                      CPF
                    </Label>
                    <Input
                      id="cpf"
                      name="cpf"
                      placeholder="000.000.000-00"
                      required
                      className={cn(
                        "h-12 text-base",
                        "dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder:text-gray-500",
                        "bg-white/50 border-gray-200 text-gray-900 placeholder:text-gray-500",
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="birth" className="text-base font-medium text-gray-700 dark:text-gray-300">
                      Data de Nascimento
                    </Label>
                    <Input
                      id="birth"
                      name="birthDate"
                      type="date"
                      required
                      className={cn(
                        "h-12 text-base",
                        "dark:bg-white/5 dark:border-white/10 dark:text-white",
                        "bg-white/50 border-gray-200 text-gray-900",
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base font-medium text-gray-700 dark:text-gray-300">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="seu@email.com"
                      required
                      className={cn(
                        "h-12 text-base",
                        "dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder:text-gray-500",
                        "bg-white/50 border-gray-200 text-gray-900 placeholder:text-gray-500",
                      )}
                    />
                  </div>
                </div>

                {error && (
                  <div className="p-4 rounded-lg bg-red-50/50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  className={cn(
                    "w-full h-12 text-base font-medium",
                    "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
                    "transition-all duration-300 transform hover:scale-[1.02]",
                  )}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin" />
                      Analisando seus dados...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      Consultar Score
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

