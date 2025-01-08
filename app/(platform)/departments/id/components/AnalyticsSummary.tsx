import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  { label: "Average Attendance", value: "87%", trend: "+2.5%" },
  { label: "Pass Rate", value: "92%", trend: "+4.3%" },
  { label: "Course Completion", value: "78%", trend: "+1.2%" },
]

export function AnalyticsSummary() {
  return (
    <Card className="border-none shadow-md bg-white/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Quick Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex items-center justify-between"
            >
              <span className="text-sm text-gray-600">
                {stat.label}
              </span>
              <div className="flex items-center gap-2">
                <span className="font-medium">{stat.value}</span>
                <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                  {stat.trend}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

