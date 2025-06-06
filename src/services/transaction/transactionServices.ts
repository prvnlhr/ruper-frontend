const BASE_URL: string = import.meta.env.VITE_API_BASE_URL

type TransactionPayload = {
  type: 'income' | 'expense'
  amount: number
  category: {
    id: string
    name: string
    icon: string
  }
  description?: string
  userId: string
}

export async function createTransaction(data: TransactionPayload) {
  try {
    const response = await fetch(`${BASE_URL}/api/transactions/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(
        JSON.stringify({
          error: result.error || 'Transaction failed',
          details: result.details || result.message || 'Please try again',
        }),
      )
    }

    return result.data
  } catch (error) {
    if (error instanceof Error && !error.message.startsWith('{')) {
      throw new Error(
        JSON.stringify({
          error: 'Transaction Error',
          details: error.message,
        }),
      )
    }
    throw error
  }
}
