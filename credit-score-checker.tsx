"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { ArrowRight, CheckCircle2, CreditCard, Lock, Moon, Sun, Wallet, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import type { CreditScore } from "@/lib/types"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const MotionCard = motion(Card)

export default function CreditScoreChecker() {
  const [score, setScore] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [scoreData, setScoreData] = useState<CreditScore | null>(null)
  const [error, setError] = useState<string>("")

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
      setScoreData(result)
      setStep(2)
    } catch (err) {
      setError("Ocorreu um erro ao consultar seu score. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 700) return theme === "dark" ? "#4ade80" : "#22c55e"
    if (score >= 600) return theme === "dark" ? "#facc15" : "#eab308"
    return theme === "dark" ? "#f87171" : "#ef4444"
  }

  const getScoreText = (score: number) => {
    if (score >= 700) return "Excelente"
    if (score >= 600) return "Bom"
    return "Precisa de Atenção"
  }

  if (!mounted) return null

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

      {/* Theme Toggle */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 flex justify-end mb-4"
      >
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full w-10 h-10 bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </motion.div>

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
        {step === 1 && (
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
                        "w-12 h-12 rounded-2xl flex items-center justify-center",
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
        )}

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
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
                          name="name" // Adicionado name
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
                          name="cpf" // Adicionado name
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
                          name="birthDate" // Adicionado name
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
                          name="email" // Adicionado name
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
          ) : (
            step === 2 &&
            scoreData && (
              <div className="grid gap-6 md:grid-cols-2">
                <Card
                  className={cn(
                    "overflow-hidden border-0 shadow-2xl col-span-full",
                    "dark:bg-white/5 dark:backdrop-blur-xl",
                    "bg-white/70 backdrop-blur-xl",
                  )}
                >
                  <CardContent className="p-6 md:p-10">
                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-48 h-48 md:w-64 md:h-64 relative"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-2xl" />
                        <CircularProgressbar
                          value={scoreData.score}
                          maxValue={scoreData.scoreRange.max}
                          text={`${scoreData.score}`}
                          styles={buildStyles({
                            pathColor: getScoreColor(scoreData.score),
                            textColor: theme === "dark" ? "white" : "#1a1a1a",
                            trailColor: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
                            textSize: "20px",
                            pathTransitionDuration: 1,
                          })}
                        />
                      </motion.div>
                      <div className="text-center md:text-left space-y-4">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                        >
                          <h3 className="text-3xl font-bold mb-2" style={{ color: getScoreColor(scoreData.score) }}>
                            {scoreData.analysis.status === "EXCELLENT"
                              ? "Excelente!"
                              : scoreData.analysis.status === "GOOD"
                                ? "Muito Bom!"
                                : "Atenção"}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-lg">{scoreData.analysis.summary}</p>
                        </motion.div>
                        <div className="flex gap-4 justify-center md:justify-start">
                          <div className="text-center">
                            <div className="text-sm text-gray-500 dark:text-gray-400">Média Nacional</div>
                            <div className="text-xl font-semibold">{scoreData.scoreRange.average}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-gray-500 dark:text-gray-400">Seu Score</div>
                            <div className="text-xl font-semibold">{scoreData.score}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className={cn(
                    "overflow-hidden border-0 shadow-2xl col-span-full",
                    "dark:bg-white/5 dark:backdrop-blur-xl",
                    "bg-white/70 backdrop-blur-xl",
                  )}
                >
                  <CardContent className="p-6 md:p-10">
                    <h3 className="text-2xl font-bold mb-6">Evolução do Score</h3>
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={scoreData.history.months.map((month, index) => ({
                            month,
                            score: scoreData.history.scores[index],
                          }))}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                          <XAxis dataKey="month" />
                          <YAxis domain={[scoreData.scoreRange.min, scoreData.scoreRange.max]} />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="score"
                            stroke="#6366f1"
                            strokeWidth={2}
                            dot={{ fill: "#6366f1" }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className={cn(
                    "overflow-hidden border-0 shadow-2xl",
                    "dark:bg-white/5 dark:backdrop-blur-xl",
                    "bg-white/70 backdrop-blur-xl",
                  )}
                >
                  <CardContent className="p-6 md:p-10">
                    <h3 className="text-2xl font-bold mb-6">Fatores de Impacto</h3>
                    <div className="space-y-6">
                      {scoreData.analysis.factors.positive.map((factor, index) => (
                        <motion.div
                          key={`positive-${index}`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 rounded-xl bg-green-50/50 dark:bg-green-500/10"
                        >
                          <div className="flex items-start gap-4">
                            <div className="p-2 rounded-lg bg-green-500/20">
                              <CheckCircle2 className="w-5 h-5 text-green-500" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-green-700 dark:text-green-400">{factor.factor}</h4>
                              <p className="text-green-600 dark:text-gray-300 text-sm mt-1">{factor.description}</p>
                              <div className="mt-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400">
                                Impacto {factor.impact}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}

                      {scoreData.analysis.factors.negative.map((factor, index) => (
                        <motion.div
                          key={`negative-${index}`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (scoreData.analysis.factors.positive.length + index) * 0.1 }}
                          className="p-4 rounded-xl bg-red-50/50 dark:bg-red-500/10"
                        >
                          <div className="flex items-start gap-4">
                            <div className="p-2 rounded-lg bg-red-500/20">
                              <AlertTriangle className="w-5 h-5 text-red-500" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-red-700 dark:text-red-400">{factor.factor}</h4>
                              <p className="text-red-600 dark:text-gray-300 text-sm mt-1">{factor.description}</p>
                              <div className="mt-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400">
                                Impacto {factor.impact}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className={cn(
                    "overflow-hidden border-0 shadow-2xl",
                    "dark:bg-white/5 dark:backdrop-blur-xl",
                    "bg-white/70 backdrop-blur-xl",
                  )}
                >
                  <CardContent className="p-6 md:p-10">
                    <h3 className="text-2xl font-bold mb-6">Perfil de Crédito</h3>
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-500/10">
                          <div className="text-sm text-blue-600 dark:text-blue-400">Total de Contas</div>
                          <div className="text-2xl font-bold mt-1">{scoreData.creditProfile.totalAccounts}</div>
                        </div>
                        <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-500/10">
                          <div className="text-sm text-blue-600 dark:text-blue-400">Contas Ativas</div>
                          <div className="text-2xl font-bold mt-1">{scoreData.creditProfile.openAccounts}</div>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-500/10">
                        <div className="text-sm text-blue-600 dark:text-blue-400">Uso do Crédito</div>
                        <div className="mt-2">
                          <div className="h-2 w-full bg-blue-200 dark:bg-blue-500/20 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                              style={{ width: `${scoreData.creditProfile.creditUsage}%` }}
                            />
                          </div>
                          <div className="mt-1 text-sm text-blue-600 dark:text-blue-400">
                            {scoreData.creditProfile.creditUsage}% utilizado
                          </div>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-500/10">
                        <div className="text-sm text-blue-600 dark:text-blue-400">Histórico de Pagamentos</div>
                        <div className="mt-2 space-y-2">
                          <div>
                            <div className="flex justify-between text-sm">
                              <span>Em dia</span>
                              <span>{scoreData.creditProfile.paymentHistory.onTime}%</span>
                            </div>
                            <div className="h-2 w-full bg-blue-200 dark:bg-blue-500/20 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-green-500 rounded-full transition-all duration-1000"
                                style={{ width: `${scoreData.creditProfile.paymentHistory.onTime}%` }}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm">
                              <span>Atrasados</span>
                              <span>{scoreData.creditProfile.paymentHistory.delayed}%</span>
                            </div>
                            <div className="h-2 w-full bg-blue-200 dark:bg-blue-500/20 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-red-500 rounded-full transition-all duration-1000"
                                style={{ width: `${scoreData.creditProfile.paymentHistory.delayed}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className={cn(
                    "overflow-hidden border-0 shadow-2xl col-span-full",
                    "dark:bg-white/5 dark:backdrop-blur-xl",
                    "bg-white/70 backdrop-blur-xl",
                  )}
                >
                  <CardContent className="p-6 md:p-10">
                    <h3 className="text-2xl font-bold mb-6">Recomendações</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      {scoreData.recommendations.map((rec, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={cn(
                            "p-6 rounded-xl",
                            rec.priority === "ALTA"
                              ? "bg-red-50/50 dark:bg-red-500/10"
                              : rec.priority === "MÉDIA"
                                ? "bg-yellow-50/50 dark:bg-yellow-500/10"
                                : "bg-green-50/50 dark:bg-green-500/10",
                          )}
                        >
                          <h4
                            className={cn(
                              "text-lg font-semibold mb-2",
                              rec.priority === "ALTA"
                                ? "text-red-700 dark:text-red-400"
                                : rec.priority === "MÉDIA"
                                  ? "text-yellow-700 dark:text-yellow-400"
                                  : "text-green-700 dark:text-green-400",
                            )}
                          >
                            {rec.title}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{rec.description}</p>
                          <div
                            className={cn(
                              "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                              rec.priority === "ALTA"
                                ? "bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400"
                                : rec.priority === "MÉDIA"
                                  ? "bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400"
                                  : "bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400",
                            )}
                          >
                            Prioridade {rec.priority}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

