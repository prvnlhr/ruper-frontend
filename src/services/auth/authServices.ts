const BASE_URL: string = import.meta.env.VITE_API_BASE_URL

type SignUpPayload = {
  email: string
  password: string
  fullname: string
}

// ADMIN SIGN-UP
export async function signUpUser(data: SignUpPayload) {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if (!response.ok) {
      // Return the error as a stringified JSON object
      throw new Error(
        JSON.stringify({
          error: result.error || 'Registration failed',
          details: result.details || result.message || 'Please try again',
        }),
      )
    }

    return result.data
  } catch (error) {
    // If the error isn't already stringified JSON, wrap it
    if (error instanceof Error && !error.message.startsWith('{')) {
      throw new Error(
        JSON.stringify({
          error: 'Registration Error',
          details: error.message,
        }),
      )
    }
    throw error
  }
}
