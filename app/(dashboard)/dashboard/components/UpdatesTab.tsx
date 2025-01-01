import { Suspense } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Calendar, Clock, ChevronRight } from 'lucide-react'
import { getNotifications, getUpcomingEvents } from '../actions'

export async function UpdatesTab({ studentId }: { studentId: string }) {
  const notifications = await getNotifications(studentId)
  const upcomingEvents = await getUpcomingEvents(studentId)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>
              Institution events and important dates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="bg-muted p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{event.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {event.description}
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{event.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{event.time}</span>
                        </div>
                      </div>
                    </div>
                    <button className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      Add to Calendar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Announcements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <Alert
                  key={notification.id}
                  className="border-l-4 border-blue-500"
                >
                  <AlertTitle className="flex items-center space-x-2">
                    <span>{notification.title}</span>
                    {notification.priority === "high" && (
                      <span className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100 px-2 py-1 rounded-full text-xs">
                        High Priority
                      </span>
                    )}
                  </AlertTitle>
                  <AlertDescription>
                    <p>{notification.description}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Date: {notification.date}
                    </p>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                "Event Reminders",
                "Academic Updates",
                "Club Activities",
                "Assignment Deadlines",
                "Exam Schedules",
              ].map((pref, index) => (
                <label
                  key={index}
                  className="flex items-center justify-between"
                >
                  <span>{pref}</span>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded"
                  />
                </label>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                "Academic Calendar",
                "Event Schedule",
                "Campus News",
                "Student Portal",
                "Resources",
              ].map((link, index) => (
                <button
                  key={index}
                  className="w-full text-left px-4 py-2 hover:bg-accent hover:text-accent-foreground rounded-lg flex items-center justify-between"
                >
                  <span>{link}</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

