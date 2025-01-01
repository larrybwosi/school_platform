import { Suspense } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { getAssignments } from '../actions'
import { PerformanceChart } from './PerformanceChart'

export async function OverviewTab({ studentId }: { studentId: string }) {
  const assignments = await getAssignments(studentId)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Academic Performance Overview</CardTitle>
          <CardDescription>
            Current semester progress and achievements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                <p className="text-sm text-muted-foreground">Current GPA</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-300">3.8</p>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900 rounded-lg">
                <p className="text-sm text-muted-foreground">Attendance</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-300">95%</p>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900 rounded-lg">
                <p className="text-sm text-muted-foreground">Class Rank</p>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-300">
                  5/120
                </p>
              </div>
            </div>
            <Suspense fallback={<div>Loading chart...</div>}>
              <PerformanceChart studentId={studentId} />
            </Suspense>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Assignments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assignments.map((assignment) => (
              <div
                key={assignment.id}
                className="bg-muted p-4 rounded-lg"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{assignment.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {assignment.subject}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">Due: {assignment.dueDate}</p>
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs ${
                        assignment.status === "completed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                      }`}
                    >
                      {assignment.status}
                    </span>
                  </div>
                </div>
                <Progress value={assignment.progress} className="mt-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

