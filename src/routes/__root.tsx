import { Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <Outlet />
      </div>
    )
  },
})
