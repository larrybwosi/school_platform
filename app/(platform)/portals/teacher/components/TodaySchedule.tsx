import { Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Class {
  id: number;
  subject: string;
  time: string;
  class: string;
  room: string;
  students: number;
  topic: string;
  materialsReady: boolean;
}

export default function TodaySchedule({ upcomingClasses, isDark }: { upcomingClasses: Class[], isDark: boolean }) {
  return (
    <Card className={`dark:bg-zinc-800 border-zinc-700`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Today&apos;s Schedule
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {upcomingClasses.map((cls) => (
            <div
              key={cls.id}
              className={`flex flex-col gap-2 p-3 ${
                isDark
                  ? "bg-zinc-700 hover:bg-zinc-600"
                  : "bg-slate-50 hover:bg-slate-100"
              } rounded-lg transition-colors duration-300`}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{cls.subject}</span>
                <span className="text-sm opacity-75">{cls.time}</span>
              </div>
              <div className="flex justify-between text-sm opacity-75">
                <span>
                  {cls.class} • {cls.room}
                </span>
                <span>{cls.students} students</span>
              </div>
              <div className="text-sm mt-1">
                <span className="text-indigo-500">Topic: {cls.topic}</span>
                <span
                  className={`ml-2 px-2 py-1 rounded text-xs ${
                    cls.materialsReady
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {cls.materialsReady
                    ? "Materials Ready"
                    : "Preparation Needed"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

