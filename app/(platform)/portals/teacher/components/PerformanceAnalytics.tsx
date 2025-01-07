import { TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PerformanceAnalytics({ performanceMetrics, isDark }) {
  return (
    <Card className={`${isDark ? "bg-gray-800 border-gray-700" : ""} lg:col-span-2`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Class Performance Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(performanceMetrics).map(([subject, metrics], idx) => (
            <div key={idx} className={`p-4 ${isDark ? "bg-gray-700" : "bg-slate-50"} rounded-lg`}>
              <h3 className="font-medium mb-2">{subject}</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="opacity-75">Average Score</span>
                  <span>{metrics.averageScore}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="opacity-75">Attendance</span>
                  <span>{metrics.attendance}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="opacity-75">Submissions</span>
                  <span>{metrics.submissions}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="opacity-75">Improvement</span>
                  <span className="text-green-500">+{metrics.improvement}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

