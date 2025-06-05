import SignInPage from '../../components/Auth/SignInPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/sign-in')({
  component: SignInPage,
})
