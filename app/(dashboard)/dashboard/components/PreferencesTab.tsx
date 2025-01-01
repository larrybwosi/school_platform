import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function PreferencesTab({ studentId }: { studentId: string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Display Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3">Theme Preferences</h3>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="radio" name="theme" defaultChecked />
                  <span>Light Mode</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="theme" />
                  <span>Dark Mode</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="theme" />
                  <span>System Default</span>
                </label>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Layout Options</h3>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded"
                  />
                  <span>Compact View</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded"
                  />
                  <span>Show Quick Actions</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded"
                  />
                  <span>Enable Animations</span>
                </label>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Calendar View</h3>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="radio" name="calendar" defaultChecked />
                  <span>Week View</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="calendar" />
                  <span>Month View</span>
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3">Email Notifications</h3>
              <div className="space-y-2">
                {[
                  "Grade Updates",
                  "Assignment Reminders",
                  "Event Announcements",
                  "Club Updates",
                  "Course Changes",
                ].map((setting, index) => (
                  <label
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span>{setting}</span>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded"
                    />
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Push Notifications</h3>
              <div className="space-y-2">
                {[
                  "Due Date Reminders",
                  "Grade Posting Alerts",
                  "Meeting Notifications",
                  "Schedule Changes",
                ].map((setting, index) => (
                  <label
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span>{setting}</span>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded"
                    />
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">
                Notification Schedule
              </h3>
              <div className="space-y-2">
                <label className="flex items-center justify-between">
                  <span>Quiet Hours</span>
                  <select className="rounded border-input bg-background">
                    <option>10 PM - 7 AM</option>
                    <option>11 PM - 8 AM</option>
                    <option>Custom</option>
                  </select>
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

