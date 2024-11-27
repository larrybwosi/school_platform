"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    male: 80,
    female: 85,
  },
  {
    name: "Feb",
    male: 82,
    female: 87,
  },
  {
    name: "Mar",
    male: 85,
    female: 88,
  },
  {
    name: "Apr",
    male: 83,
    female: 90,
  },
  {
    name: "May",
    male: 86,
    female: 89,
  },
  {
    name: "Jun",
    male: 88,
    female: 91,
  },
]

export function GenderTrendChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
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
          tickFormatter={(value) => `${value}%`}
        />
        <Bar dataKey="male" fill="#8884d8" radius={[4, 4, 0, 0]} />
        <Bar dataKey="female" fill="#82ca9d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
