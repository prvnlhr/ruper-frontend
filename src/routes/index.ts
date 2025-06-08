// src/routes/index.jsx
import { useAuth } from '@clerk/clerk-react'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad: async () => {
    try {
      // 1. Get user ID (using Clerk as example)
      const { userId } = useAuth()

      // 2. If no user, redirect to login
      if (!userId) {
        throw redirect({
          to: '/auth/sign-in',
          replace: true,
        })
      }

      // 3. If user exists, redirect to dashboard
      throw redirect({
        to: '/user/$userId/dashboard',
        params: { userId }, // Dynamic param
        replace: true,
      })
    } catch (error) {
      // Fallback redirect if auth fails
      throw redirect({
        to: '/auth/sign-in',
        replace: true,
      })
    }
  },
  component: () => null, // Empty component (never renders)
})
