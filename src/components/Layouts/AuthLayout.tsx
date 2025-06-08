import { Outlet } from '@tanstack/react-router'

const AuthLayout = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <Outlet />
    </div>
  )
}

export default AuthLayout
