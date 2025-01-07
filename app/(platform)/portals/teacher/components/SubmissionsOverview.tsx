import { FileText } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SubmissionsOverview({ submissions, isDark }: { submissions: any[], isDark: boolean }) {
  return (
    <Card className={isDark ? "bg-gray-800 border-gray-700" : ""}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Pending Submissions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {submissions.map((sub) => (
            <div
              key={sub.id}
              className={`p-3 ${
                isDark ? "bg-gray-700 hover:bg-gray-600" : "bg-slate-50 hover:bg-slate-100"
              } rounded-lg transition-colors duration-300`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{sub.title}</span>
                <span className="text-sm opacity-75">{sub.class}</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{
                    width: `${(sub.submitted / (sub.submitted + sub.pending)) * 100}%`,
                  }}
                />
              </div>
              <div className="flex justify-between mt-2 text-sm">
                <span className="text-green-600">
                  {sub.submitted} Submitted
                </span>
                <span className="text-red-600">{sub.pending} Pending</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

