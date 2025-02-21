"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { ArrowLeft, CheckCircle2, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import type { CreditScore } from "@/lib/types"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function CreditScoreReport() {
  const [scoreData, setScoreData] = useState<CreditScore | null>(null)
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    // Recupera os dados do localStorage
    const data = localStorage.getItem("creditScoreData")
    if (data) {
      setScoreData(JSON.parse(data))
    } else {
      // Se não houver dados, redireciona para a página inicial
      router.push("/")
    }
  }, [router])

  const getScoreColor = (score: number) => {
    if (score >= 700) return theme === "dark" ? "#4ade80" : "#22c55e"
    if (score >= 600) return theme === "dark" ? "#facc15" : "#eab308"
    return theme === "dark" ? "#f87171" : "#ef4444"
  }

  if (!mounted || !scoreData) return null

  return (
    <div
      className={cn(
        "min-h-screen p-4 md:p-8 relative overflow-hidden transition-colors duration-300",
        "dark:bg-[#0A0F1C] dark:text-white",
        "bg-[#F8FAFC] text-gray-900",
      )}
    >
      {/* Background elements */}
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
        {/* Back button and Title */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4 md:mb-0"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para o início
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
            Relatório de Crédito
          </h1>
        </div>

        {/* Report Content */}
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
                    <XAxis dataKey="month" stroke={theme === "dark" ? "#94a3b8" : "#64748b"} />
                    <YAxis
                      domain={[scoreData.scoreRange.min, scoreData.scoreRange.max]}
                      stroke={theme === "dark" ? "#94a3b8" : "#64748b"}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
                        border: "none",
                        borderRadius: "8px",
                        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                      }}
                      labelStyle={{
                        color: theme === "dark" ? "#e2e8f0" : "#1f2937",
                      }}
                    />
                    <Line type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={2} dot={{ fill: "#6366f1" }} />
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
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${scoreData.creditProfile.creditUsage}%` }}
                        transition={{ duration: 1 }}
                        className="h-full bg-blue-500 rounded-full"
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
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${scoreData.creditProfile.paymentHistory.onTime}%` }}
                          transition={{ duration: 1 }}
                          className="h-full bg-green-500 rounded-full"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Atrasados</span>
                        <span>{scoreData.creditProfile.paymentHistory.delayed}%</span>
                      </div>
                      <div className="h-2 w-full bg-blue-200 dark:bg-blue-500/20 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${scoreData.creditProfile.paymentHistory.delayed}%` }}
                          transition={{ duration: 1 }}
                          className="h-full bg-red-500 rounded-full"
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
      </div>
    </div>
  )
}

