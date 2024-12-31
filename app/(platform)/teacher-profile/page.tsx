
import { Sidebar } from '@/components/profile/sidebar'
import { GradesTable } from '@/components/profile/grades-table'
import { StudentProgressChart } from '@/components/profile/student-progress-chart'
import { GenderTrendChart } from '@/components/profile/gender-trend-chart'
import { Search } from '@/components/profile/search'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { CalendarDateRangePicker } from "@/components/profile/date-range-picker"
import { MainNav } from "@/components/profile/main-nav"
import { UserNav } from "@/components/profile/user-nav"
import { Overview } from '@/components/profile/teacher.overview'
import { RecentActivity } from '@/components/dashboard/recent-activity'
import { getStudents } from '@/actions/students'
import { mockTeachers, Student } from '@/lib/mockData'
import { Suspense } from 'react'
import { StudentTable } from '@/components/shared/StudentTable'
import { canEditGrades, getEditableSubjects } from '@/actions/permisions'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
 
export default async function TeacherProfilePage(props: {
  searchParams: SearchParams;
}) {
  
  const searchParams = await props.searchParams;

  const searchTerm =
    typeof searchParams.search === "string" ? searchParams.search : "";
  const sortBy = searchParams?.sort || "name";
  const filterGrade = searchParams?.filterGrade || "all";

  const students = await getStudents({
    page: 1,
    sort: { key: sortBy as keyof Student, direction: "asc" },
  });
  const staffId = "1"; // This would normally come from the authenticated user's session
  const canEdit = await canEditGrades(staffId);
  const editableSubjects = await getEditableSubjects(staffId);

  const colorScheme =
    typeof searchParams.colorScheme === "string"
      ? searchParams.colorScheme
      : "default";
  const showSelectionCheckbox = searchParams.showSelection === "true";

  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Teacher Profile</h2>
          <div className="flex items-center space-x-2">
            <CalendarDateRangePicker />
            <Button>Download</Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <Overview />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Student Progress Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <StudentProgressChart />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Gender-based Grade Trends</CardTitle>
                  <CardDescription>
                    Average grades by gender over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <GenderTrendChart />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <RecentActivity />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Grade Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Add a grade distribution chart here */}
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Subject Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Add a subject performance chart here */}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="students" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Student List</CardTitle>
                <CardDescription>
                  Manage and view your students&apos; information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Search value={searchTerm} searchParams={searchParams} />
                  </div>
                  <Suspense fallback={<div>Loading...</div>}>
                    <StudentTable
                      initialStudents={students}
                      staff={mockTeachers[0]}
                      canEditGrades={canEdit}
                      editableSubjects={editableSubjects}
                      colorScheme={
                        colorScheme as
                          | "default"
                          | "blue"
                          | "green"
                          | "red"
                          | "purple"
                      }
                      showSelectionCheckbox={showSelectionCheckbox}
                      initialSearchTerm={searchTerm}
                    />
                  </Suspense>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
