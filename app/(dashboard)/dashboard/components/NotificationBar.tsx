import { AlertTriangle } from 'lucide-react'

export function NotificationBar() {
  return (
    <div className="bg-yellow-50 dark:bg-yellow-900 border-l-4 border-yellow-400 p-4 rounded">
      <div className="flex items-center">
        <AlertTriangle className="h-5 w-5 text-yellow-400 mr-2" />
        <p className="text-sm text-yellow-700 dark:text-yellow-200">
          <span className="font-bold">Upcoming: </span>
          Mid-term examinations starting from January 20th, 2024
        </p>
      </div>
    </div>
  )
}

