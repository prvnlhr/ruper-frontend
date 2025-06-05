import SignUpPage from '@/components/Auth/SignUpPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/sign-up')({
  component: SignUpPage,
})
