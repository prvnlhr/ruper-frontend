// src/services/dashboard.service.ts
const BASE_URL: string = import.meta.env.VITE_API_BASE_URL

export interface DashboardData {
  totals: {
    income: number
    expense: number
    balance: number
  }
  monthlyTrend: {
    weeks: {
      week: number
      income: number
      expense: number
    }[]
  }
  categoryDistribution: {
    income: {
      category: string
      amount: number
      percentage: number
    }[]
    expense: {
      category: string
      amount: number
      percentage: number
    }[]
  }
}

export async function fetchDashboardData(
  userId: string,
): Promise<DashboardData> {
  try {
    const response = await fetch(`${BASE_URL}/api/dashboard/data/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(
        JSON.stringify({
          error: result.error || 'Failed to fetch dashboard data',
          details: result.details || result.message || 'Please try again later',
        }),
      )
    }

    return result.data as DashboardData
  } catch (error) {
    if (error instanceof Error && !error.message.startsWith('{')) {
      throw new Error(
        JSON.stringify({
          error: 'Dashboard Data Error',
          details: error.message,
        }),
      )
    }
    throw error
  }
}
