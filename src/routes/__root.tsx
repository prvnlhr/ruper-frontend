import FormLayout from '@/components/Form/FormLayout'
import Header from '@/components/Header/Header'
import SubHeader from '@/components/SubHeader/SubHeader'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createRootRoute({
  component: () => {
    const [activeForm, setActiveForm] = useState<'income' | 'expense'>(
      'expense',
    )

    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <div className="w-[100%] h-[80px] flex">
          <Header />
        </div>
        <div className="w-[100%] h-[50px] flex">
          <SubHeader activeForm={activeForm} setActiveForm={setActiveForm} />
        </div>
        <div className="w-[100%] h-[calc(100%-130px)] flex items-center justify-center">
          <div className="w-[100%] h-[100%] flex">
            <div className="w-[75%] h-[100%] flex">
              <Outlet />
            </div>
            <div className="w-[25%] h-[100%] p-[20px]">
              <FormLayout mode={activeForm} />
            </div>
          </div>
        </div>
      </div>
    )
  },
})
