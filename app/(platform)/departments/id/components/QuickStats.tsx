import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, Book, Calendar, User, Users } from 'lucide-react'

const quickStats = [
  {
    title: "Faculty Members",
    value: 24,
    icon: User,
    trend: "+2 this semester",
    trendUp: true,
  },
  {
    title: "Total Students",
    value: 450,
    icon: Users,
    trend: "+45 from last year",
    trendUp: true,
  },
  {
    title: "Active Courses",
    value: 3,
    icon: Book,
    trend: "All running",
    trendUp: true,
  },
  {
    title: "Upcoming Exams",
    value: 2,
    icon: Calendar,
    trend: "Next in 3 days",
    trendUp: false,
  },
]

export function QuickStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {quickStats.map((stat, index) => (
        <Card
          key={index}
          className="transform transition-all duration-200 hover:scale-105 hover:shadow-lg border-none bg-white/50 backdrop-blur-sm"
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center">
              <stat.icon className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stat.value}</div>
            <div
              className={`text-xs ${stat.trendUp ? "text-green-600" : "text-amber-600"} font-medium mt-1 flex items-center gap-1`}
            >
              <ArrowUpRight className="h-3 w-3" />
              {stat.trend}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

