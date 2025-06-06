export interface DashboardData {
  totals: {
    income: number
    expense: number
    balance: number
  }
  trend: {
    weekly: DailyTrend[]
    monthly: DailyTrend[]
  }
  categoryDistribution: {
    income: CategoryDistribution[]
    expense: CategoryDistribution[]
  }
}

export interface DailyTrend {
  date: string // Format: YYYY-MM-DD
  income: number
  expense: number
}

export interface CategoryDistribution {
  category: string
  amount: number
  percentage: number
}
