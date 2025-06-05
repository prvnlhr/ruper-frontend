import Dashboard from '@/components/Dashboard/Dashboard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/user/$userId/dashboard')({
  component: Dashboard,
})
