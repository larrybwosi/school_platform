import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Bell, Settings } from 'lucide-react'
import { Student } from '@/lib/types'

export function DashboardHeader({ student }: { student: Student }) {
  return (
    <div className="flex items-center justify-between bg-card p-6 rounded-lg shadow-sm">
      <div className="flex items-center space-x-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src={student.avatar} alt={student.name} />
          <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold">{student.name}</h1>
          <p className="text-muted-foreground text-lg">
            Grade {student.grade} • {student.stream}
          </p>
          <div className="flex items-center space-x-2 mt-2">
            <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-2 py-1 rounded-full text-sm">
              Active Student
            </span>
            <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 px-2 py-1 rounded-full text-sm">
              Honor Roll
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Bell className="h-6 w-6 text-muted-foreground cursor-pointer" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
            3
          </span>
        </div>
        <Settings className="h-6 w-6 text-muted-foreground cursor-pointer" />
      </div>
    </div>
  )
}

