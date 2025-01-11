import { Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


interface Activity {
  icon: React.ElementType;
  text: string;
  desc: string;
  time: string;
  color: string;
}

export function RecentActivity({ activities }: { activities: Activity[] }) {
  return (
    <Card className="border-none shadow-md bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="flex items-start gap-3 group cursor-pointer"
            >
              <div
                className={`h-8 w-8 bg-${activity.color}-50 rounded-full flex items-center justify-center group-hover:bg-${activity.color}-100 transition-colors`}
              >
                <activity.icon
                  className={`h-4 w-4 text-${activity.color}-600`}
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium group-hover:text-blue-600 transition-colors">
                  {activity.text}
                </p>
                <p className="text-xs text-gray-500">{activity.desc}</p>
                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

