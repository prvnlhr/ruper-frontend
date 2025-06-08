import { Icon } from '@iconify/react/dist/iconify.js'
import SubHeader from '../SubHeader/SubHeader'
import Header from '../Header/Header'
import { useEffect, useState } from 'react'
import { useLoaderData, useNavigate } from '@tanstack/react-router'
import type { DashboardData } from '@/types/dashboard'

import TransactionForm from '../Form/TransactionForm'
import CategoryDistribution from './Charts/CategoryDistribution'
import TrendChart from './Charts/TrendChart'

const Dashboard = () => {
  const [activeForm, setActiveForm] = useState<'income' | 'expense'>('expense')
  const data = useLoaderData({
    from: '/user/$userId/dashboard',
  }) as DashboardData

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
            <div className="w-[100%] h-[100%] flex flex-col px-[30px]">
              {/* Summary Cards */}
              <div className="w-[100%] h-[150px] flex items-center">
                {/* Income Card */}
                <div className="h-[60%] w-auto flex items-center">
                  <div className="w-[30px] h-[100%] flex items-center justify-center">
                    <Icon
                      icon="bx:rupee"
                      className="w-[23px] h-[23px] text-[#ededed]"
                    />
                  </div>
                  <div className="w-auto h-auto flex justify-center flex-col">
                    <div className="w-[100%] h-auto flex items-center">
                      <p className="text-[4rem] text-[#ededed] leading-none">
                        {data.totals.income.toFixed(0)}
                        <span className="text-[2rem]">
                          .{data.totals.income.toFixed(2).split('.')[1]}
                        </span>
                      </p>
                    </div>
                    <div className="w-[100%] h-auto flex items-center">
                      <p className="text-[0.9rem] text-[#ededed] ml-[5px]">
                        Total Income
                      </p>
                    </div>
                  </div>
                  <div className="w-[40px] h-[100%] flex items-center justify-center">
                    <Icon
                      icon="bitcoin-icons:arrow-up-filled"
                      className="w-[30px] h-[30px] text-[#7CFD9D]"
                    />
                  </div>
                </div>

                {/* Expense Card */}
                <div className="h-[60%] w-auto flex items-center ml-[20px]">
                  <div className="w-[30px] h-[100%] flex items-center justify-center">
                    <Icon
                      icon="bx:rupee"
                      className="w-[23px] h-[23px] text-[#ededed]"
                    />
                  </div>
                  <div className="w-auto h-auto flex justify-center flex-col">
                    <div className="w-[100%] h-auto flex items-center">
                      <p className="text-[4rem] text-[#ededed] leading-none">
                        {data.totals.expense.toFixed(0)}
                        <span className="text-[2rem]">
                          .{data.totals.expense.toFixed(2).split('.')[1]}
                        </span>
                      </p>
                    </div>
                    <div className="w-[100%] h-auto flex items-center">
                      <p className="text-[0.9rem] text-[#ededed] ml-[5px]">
                        Total Expense
                      </p>
                    </div>
                  </div>
                  <div className="w-[40px] h-[100%] flex items-center justify-center">
                    <Icon
                      icon="bitcoin-icons:arrow-down-filled"
                      className="w-[30px] h-[30px] text-[#FC7173]"
                    />
                  </div>
                </div>
              </div>

              {/* Charts Section */}
              <div className="w-[100%] h-[calc(100%-150px)] flex p-[20px]">
                <div className="w-[100%] h-[100%] flex gap-4">
                  {/* Monthly Trend Line Chart */}
                  <TrendChart data={data} />

                  {/* Category Distribution Pie Charts */}
                  <CategoryDistribution data={data} />
                </div>
              </div>
            </div>
          </div>
          <div className="w-[25%] h-[100%] p-[20px]">
            <TransactionForm mode={activeForm} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
