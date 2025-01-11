import { Book, ChevronRight, Filter } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from '@/components/ui/badge';


interface Exam {
  id: string | number;
  subject: string;
  type: string;
  status: "Ready" | "Pending";
  date: string;
}

export function UpcomingExams({ exams }: { exams: Exam[] }) {
  return (
    <Card className="border-none shadow-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Upcoming Examinations
          </CardTitle>
          <CardDescription>
            Schedule and status of upcoming exams
          </CardDescription>
        </div>
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
          <Filter className="h-4 w-4 text-gray-600 dark:text-gray-400" />
        </button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {exams.map((exam) => (
            <div
              key={exam.id}
              className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-300 hover:shadow-md group"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
                  <Book className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {exam.subject}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {exam.type}
                    </span>
                    <span className="h-1 w-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
                    <Badge
                      variant={exam.status === "Ready" ? "default" : "destructive"}
                    >
                      {exam.status}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Scheduled Date
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(exam.date).toLocaleDateString()}
                  </p>
                </div>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
