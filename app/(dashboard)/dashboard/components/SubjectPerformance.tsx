'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BookOpen } from 'lucide-react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

interface SubjectDetails {
  currentGrade: number
  pastGrades: number[]
  lastAssessment: {
    name: string
    score: number
    date: string
  }
}

export function SubjectPerformance({ subject, details }: { subject: string, details: SubjectDetails }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="bg-muted">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5" />
            <span>{subject}</span>
          </CardTitle>
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              details.currentGrade >= 90
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                : details.currentGrade >= 80
                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
            }`}
          >
            Grade: {details.currentGrade}%
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-2">Performance Breakdown</h4>
            <div className="space-y-2">
              <div>
                <p className="text-sm text-muted-foreground">Assignments</p>
                <Progress value={85} className="mt-1" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tests</p>
                <Progress value={78} className="mt-1" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Class Participation</p>
                <Progress value={92} className="mt-1" />
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Recent Assessments</h4>
            <div className="space-y-2">
              <div className="bg-muted p-2 rounded">
                <p className="text-sm font-medium">{details.lastAssessment.name}</p>
                <p className="text-xs text-muted-foreground">Score: {details.lastAssessment.score}%</p>
                <p className="text-xs text-muted-foreground">Date: {details.lastAssessment.date}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Grade History</h4>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={details.pastGrades.map((grade, index) => ({
                  month: index + 1,
                  grade,
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" label="Month" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="grade" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

