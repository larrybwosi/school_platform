import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Laptop } from 'lucide-react'


interface Subject {
  id: string | number;
  name: string;
  semester: number;
  faculty: string;
  progress: number;
}

export function SubjectList({ subjects }: { subjects: Subject[] }) {
  return (
    <Card className="border-none shadow-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Department Subjects
        </CardTitle>
        <CardDescription>
          Current semester subjects and progress
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-700 transition-all duration-300 hover:shadow-md group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-purple-50 dark:bg-purple-900/20 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
                    <Laptop className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {subject.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Semester {subject.semester}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Faculty
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {subject.faculty}
                  </p>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600 dark:text-gray-400">
                    Course Progress
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {subject.progress}%
                  </span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-500 dark:bg-purple-400 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${subject.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}