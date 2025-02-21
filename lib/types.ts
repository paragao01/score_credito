export interface CreditScore {
  score: number
  scoreRange: {
    min: number
    max: number
    average: number
  }
  analysis: {
    status: "EXCELLENT" | "GOOD" | "NEEDS_ATTENTION"
    summary: string
    factors: {
      positive: Factor[]
      negative: Factor[]
    }
  }
  history: {
    months: string[]
    scores: number[]
  }
  recommendations: Recommendation[]
  creditProfile: CreditProfile
}

interface Factor {
  factor: string
  impact: "ALTO" | "MÉDIO" | "BAIXO"
  description: string
}

interface Recommendation {
  title: string
  description: string
  priority: "ALTA" | "MÉDIA" | "BAIXA"
}

interface CreditProfile {
  totalAccounts: number
  openAccounts: number
  totalDebt: number
  creditUsage: number
  paymentHistory: {
    onTime: number
    delayed: number
  }
}

