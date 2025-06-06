'use client'

import React, { useState } from 'react'
import type { DashboardData } from '@/types/dashboard'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import * as Select from '@radix-ui/react-select'
import { Icon } from '@iconify/react/dist/iconify.js'

const CHART_COLORS = {
  income: '#7CFD9D',
  expense: '#FC7173',
  text: '#EDEDED',
  grid: '#4E4E4E',
}

interface TrendChartProps {
  data: DashboardData
}

const TrendChart: React.FC<TrendChartProps> = ({ data }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'weekly' | 'monthly'>(
    'monthly',
  )

  // Select data based on the period
  const chartData =
    selectedPeriod === 'weekly' ? data.trend.weekly : data.trend.monthly

  return (
    <div className="w-[50%] h-[100%] rounded-lg p-4">
      <div className="flex items-center justify-between h-[40px]">
        <h3 className="text-[#EDEDED]">
          {selectedPeriod === 'weekly' ? 'Weekly' : 'Monthly'} Trend
        </h3>
        <Select.Root
          value={selectedPeriod}
          onValueChange={(val) =>
            setSelectedPeriod(val as 'weekly' | 'monthly')
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
                  value="weekly"
                  className="cursor-pointer px-3 py-1.5 hover:bg-[#444] rounded-sm text-sm"
                >
                  <Select.ItemText>Weekly</Select.ItemText>
                </Select.Item>
                <Select.Item
                  value="monthly"
                  className="cursor-pointer px-3 py-1.5 hover:bg-[#444] rounded-sm text-sm"
                >
                  <Select.ItemText>Monthly</Select.ItemText>
                </Select.Item>
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
          <XAxis
            dataKey="date"
            stroke={CHART_COLORS.text}
            tickFormatter={(value) => {
              const date = new Date(value)
              return `${date.getMonth() + 1}/${date.getDate()}`
            }}
          />
          <YAxis stroke={CHART_COLORS.text} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#4E4E4E',
              borderColor: CHART_COLORS.grid,
            }}
            formatter={(value) => [`₹${value}`, 'Amount']}
            labelFormatter={(label) => {
              const date = new Date(label)
              return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="income"
            stroke={CHART_COLORS.income}
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke={CHART_COLORS.expense}
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default TrendChart
