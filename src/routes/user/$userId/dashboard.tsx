import Dashboard from '@/components/Dashboard/Dashboard'
import { fetchDashboardData } from '@/services/dashboard/dashboardServices'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/user/$userId/dashboard')({
  component: Dashboard,
  loader: async ({ params }) => {
    return fetchDashboardData(params.userId)
  },
})
