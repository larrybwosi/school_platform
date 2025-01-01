import { Suspense } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DashboardHeader } from './components/DashboardHeader'
import { QuickActions } from './components/QuickActions'
import { NotificationBar } from './components/NotificationBar'
import { OverviewTab } from './components/OverviewTab'
import { AcademicRecordsTab } from './components/AcademicRecordsTab'
import { UpdatesTab } from './components/UpdatesTab'
import { PreferencesTab } from './components/PreferencesTab'
import { Timetable } from './components/Timetable'
import { getStudentData } from './actions'

export default async function StudentDashboard() {
  const studentData = await getStudentData()

  return (
    <div className="container mx-auto p-4 space-y-6">
      <DashboardHeader student={studentData} />
      <NotificationBar />
      <QuickActions />

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="academic">Academic Records</TabsTrigger>
          <TabsTrigger value="timetable">Timetable</TabsTrigger>
          <TabsTrigger value="clubs">Club Activities</TabsTrigger>
          <TabsTrigger value="updates">Updates</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <Suspense fallback={<div>Loading...</div>}>
          <TabsContent value="overview">
            <OverviewTab studentId={studentData.id} />
          </TabsContent>
          <TabsContent value="academic">
            <AcademicRecordsTab studentId={studentData.id} />
          </TabsContent>
          <TabsContent value="timetable">
            <Timetable />
          </TabsContent>
          <TabsContent value="updates">
            <UpdatesTab studentId={studentData.id} />
          </TabsContent>
          <TabsContent value="preferences">
            <PreferencesTab studentId={studentData.id} />
          </TabsContent>
        </Suspense>
      </Tabs>
    </div>
  )
}

