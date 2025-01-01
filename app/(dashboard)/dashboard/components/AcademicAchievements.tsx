import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Award } from 'lucide-react'

const achievements = [
  { title: "Honor Roll", term: "Fall 2023" },
  { title: "Science Competition Winner", term: "October 2023" },
  { title: "Perfect Attendance", term: "September 2023" },
]

export function AcademicAchievements() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Academic Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="font-medium">{achievement.title}</p>
                <p className="text-sm text-muted-foreground">{achievement.term}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

