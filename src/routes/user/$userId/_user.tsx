import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/user/$userId/_user')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/user/$userId/_user"!</div>
}
