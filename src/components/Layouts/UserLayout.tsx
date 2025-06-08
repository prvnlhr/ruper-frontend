import { Outlet } from '@tanstack/react-router'
import Header from '@/components/Header/Header'
import SubHeader from '@/components/SubHeader/SubHeader'

const UserLayout = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="w-[100%] h-[80px] flex">
        <Header />
      </div>
      <div className="w-[100%] h-[50px] flex">
        <SubHeader />
      </div>
      <div className="w-[100%] h-[calc(100%-130px)] flex items-center justify-center">
        <Outlet />
      </div>
    </div>
  )
}

export default UserLayout
