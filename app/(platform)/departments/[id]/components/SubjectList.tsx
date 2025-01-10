import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Laptop } from 'lucide-react'

export function SubjectList({ subjects }) {
  return (
    <Card className="border-none shadow-md bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Department Subjects</CardTitle>
        <CardDescription>
          Current semester subjects and progress
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              className="p-4 bg-white rounded-lg border border-gray-100 hover:border-purple-200 transition-all duration-200 hover:shadow-md group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-purple-50 rounded-lg flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                    <Laptop className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{subject.name}</h3>
                    <p className="text-sm text-gray-600">
                      Semester {subject.semester}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">Faculty</p>
                  <p className="text-sm text-gray-600">
                    {subject.faculty}
                  </p>
                </div>
              </div>
              <div className="mt-2">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Course Progress</span>
                  <span className="font-medium">
                    {subject.progress}%
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-500 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${subject.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

