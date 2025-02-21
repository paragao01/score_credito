import creditProfiles from "@/data/credit-profiles.json"
import type { CreditScore } from "@/lib/types"

export class CreditService {
  private static readonly profiles = creditProfiles.profiles

  static async getScoreByDocument(document: string): Promise<CreditScore> {
    // Simula um delay de rede
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Remove caracteres não numéricos do documento
    const cleanDocument = document.replace(/\D/g, "")

    // Usa a soma dos dígitos do documento para determinar o perfil
    const documentSum = cleanDocument.split("").reduce((acc, digit) => acc + Number.parseInt(digit), 0)

    // Seleciona o perfil baseado na soma dos dígitos
    let profileIndex: number
    if (documentSum % 3 === 0) {
      profileIndex = 0 // Perfil excelente
    } else if (documentSum % 3 === 1) {
      profileIndex = 1 // Perfil bom
    } else {
      profileIndex = 2 // Perfil que precisa de atenção
    }

    // Adiciona uma pequena variação ao score para parecer mais realista
    const baseProfile = this.profiles[profileIndex]
    const variation = Math.floor(Math.random() * 20) - 10 // Variação de -10 a +10
    const score = Math.max(0, Math.min(850, baseProfile.profile.score + variation))

    // Retorna uma cópia do perfil com o score ajustado
    return {
      score,
      scoreRange: baseProfile.scoreRange,
      analysis: {
        status: baseProfile.profile.status,
        summary: baseProfile.profile.summary,
        factors: baseProfile.profile.analysis.factors,
      },
      history: {
        months: baseProfile.profile.history.months,
        scores: baseProfile.profile.history.scores.map((s) => Math.max(0, Math.min(850, s + variation))),
      },
      recommendations: baseProfile.profile.recommendations,
      creditProfile: {
        ...baseProfile.profile.creditProfile,
        totalDebt: baseProfile.profile.creditProfile.totalDebt + (Math.floor(Math.random() * 5000) - 2500), // Variação de -2500 a +2500
      },
    }
  }
}

