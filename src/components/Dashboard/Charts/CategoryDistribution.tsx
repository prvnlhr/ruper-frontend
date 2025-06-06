'use client'

import { useState } from 'react'
import type { DashboardData } from '@/types/dashboard'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import * as Select from '@radix-ui/react-select'
import { Icon } from '@iconify/react/dist/iconify.js'

const CHART_COLORS = {
  income: '#7CFD9D',
  expense: '#FC7173',
  text: '#EDEDED',
  grid: '#4E4E4E',
}

interface CategoryDistributionProps {
  data: DashboardData
}

const CategoryDistribution: React.FC<CategoryDistributionProps> = ({
  data,
}) => {
  const [selectedType, setSelectedType] = useState<'income' | 'expense'>(
    'income',
  )

  const chartData =
    selectedType === 'income'
      ? data.categoryDistribution.income.slice(0, 5)
      : data.categoryDistribution.expense.slice(0, 5)

  return (
    <div className="w-[50%] h-full flex flex-col gap-4">
      <div className="h-full rounded-[15px] px-[10px] py-[10px] flex flex-col">
        {/* Dropdown Selector */}
        <div className="flex items-center justify-between h-[40px]">
          <h3 className="text-[#EDEDED]">
            Top {selectedType === 'income' ? 'Income' : 'Expense'} Categories
          </h3>

          <Select.Root
            value={selectedType}
            onValueChange={(val) =>
              setSelectedType(val as 'income' | 'expense')
            }
          >
            <Select.Trigger className="inline-flex items-center gap-2 px-3 py-1 bg-[#2A2C2D] text-white text-sm rounded-md">
              <Select.Value />
              <Select.Icon>
                <Icon icon="jam:chevron-down" width="24" height="24" />
              </Select.Icon>
            </Select.Trigger>

            <Select.Portal>
              <Select.Content className="z-50 overflow-hidden bg-[#2A2C2D] rounded-md text-white shadow-lg">
                <Select.Viewport className="p-1">
                  <Select.Item
                    value="income"
                    className="cursor-pointer px-3 py-1.5 hover:bg-[#444] rounded-sm text-sm"
                  >
                    <Select.ItemText>Income</Select.ItemText>
                  </Select.Item>
                  <Select.Item
                    value="expense"
                    className="cursor-pointer px-3 py-1.5 hover:bg-[#444] rounded-sm text-sm"
                  >
                    <Select.ItemText>Expense</Select.ItemText>
                  </Select.Item>
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>

        {/* Pie Chart */}
        <div className="w-full flex-1 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius="60%"
                fill="#8884d8"
                dataKey="amount"
                nameKey="category"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`${selectedType}-cell-${index}`}
                    fill={
                      selectedType === 'income'
                        ? CHART_COLORS.income
                        : CHART_COLORS.expense
                    }
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`₹${value}`, 'Amount']}
                contentStyle={{
                  backgroundColor: 'white',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default CategoryDistribution
