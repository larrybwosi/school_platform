import { Book, ChevronRight, Filter } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export function UpcomingExams({ exams }) {
  return (
    <Card className="border-none shadow-md bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Upcoming Examinations</CardTitle>
          <CardDescription>
            Schedule and status of upcoming exams
          </CardDescription>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Filter className="h-4 w-4 text-gray-600" />
        </button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {exams.map((exam) => (
            <div
              key={exam.id}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100 hover:border-blue-200 transition-all duration-200 hover:shadow-md group"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <Book className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">{exam.subject}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>{exam.type}</span>
                    <span className="h-1 w-1 bg-gray-300 rounded-full"></span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs ${
                        exam.status === "Ready"
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {exam.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium">Scheduled Date</p>
                  <p className="text-sm text-gray-600">
                    {new Date(exam.date).toLocaleDateString()}
                  </p>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <ChevronRight className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

