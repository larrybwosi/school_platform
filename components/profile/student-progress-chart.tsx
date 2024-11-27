"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    average: 240,
    today: 300,
  },
  {
    average: 300,
    today: 320,
  },
  {
    average: 320,
    today: 350,
  },
  {
    average: 380,
    today: 390,
  },
  {
    average: 400,
    today: 380,
  },
  {
    average: 450,
    today: 480,
  },
  {
    average: 480,
    today: 500,
  },
  {
    average: 500,
    today: 520,
  },
  {
    average: 520,
    today: 540,
  },
  {
    average: 540,
    today: 560,
  },
]

export function StudentProgressChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="today"
          stroke="#8884d8"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="average" stroke="#82ca9d" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}
