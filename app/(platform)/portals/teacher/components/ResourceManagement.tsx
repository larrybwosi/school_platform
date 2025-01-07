import { Folder } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function  ResourceManagement({ teacherInfo, isDark }: { teacherInfo: any, isDark: boolean }) {
  return (
    <Card className={isDark ? "bg-gray-800 border-gray-700" : ""}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Folder className="h-5 w-5" />
          Course Resources
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {teacherInfo.subjects.map((subject, idx) => (
            <div
              key={idx}
              className={`p-3 ${
                isDark ? "bg-gray-700 hover:bg-gray-600" : "bg-slate-50 hover:bg-slate-100"
              } rounded-lg cursor-pointer transition-colors duration-300`}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{subject}</span>
                <span className="text-sm opacity-75">12 files</span>
              </div>
              <div className="flex gap-2 mt-2">
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                  Slides
                </span>
                <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                  Notes
                </span>
                <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">
                  Labs
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

