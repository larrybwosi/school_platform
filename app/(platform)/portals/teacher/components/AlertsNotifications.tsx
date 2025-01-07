import { AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AlertsNotifications({ alerts, isDark }) {
  return (
    <Card className={isDark ? "bg-gray-800 border-gray-700" : ""}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Important Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-3 ${
                isDark ? "bg-gray-700" : "bg-slate-50"
              } rounded-lg border-l-4 border-yellow-500 transition-colors duration-300`}
            >
              <p className="text-sm font-medium">{alert.message}</p>
              <p className="text-xs opacity-75 mt-1">Tap to view details</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

