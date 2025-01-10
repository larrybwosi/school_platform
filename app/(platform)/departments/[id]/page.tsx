import { Suspense } from "react";
import { connection } from "next/server";

import { QuickStats } from "./components/QuickStats";
import { UpcomingExams } from "./components/UpcomingExams";
import { SubjectList } from "./components/SubjectList";
import { QuickActions } from "./components/QuickActions";
import { RecentActivity } from "./components/RecentActivity";
import { AnalyticsSummary } from "./components/AnalyticsSummary";
import { ExamSubmissionModal } from "./components/ExamSubmissionModal";
import { NavigationTabs } from "./components/NavigationTabs";
import { InvigilationAssignment } from "./components/InvigilationAssignment";
import { CoursesTab } from "./components/CoursesTab";
import { TeachersTab } from "./components/TeachersTab";
import { AnalyticsTab } from "./components/AnalyticsTab";
import { getDepartmentData } from "./lib/actions";

interface QuickStats {
  title: string;
  value: number;
  icon: string;
  trend: string;
  trendUp: boolean;
}
[];

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
export default async function DepartmentDashboard(props: {
  searchParams: SearchParams;
}) {
  await connection();
  const { selectedTab = "overview", id } = await props.searchParams;
  const { upcomingExams, subjects, recentActivities, analyticsSummary } =
    await getDepartmentData(id as string);

  return (
    <Suspense fallback={<p>Loading ...</p>}>
      <div className="space-y-8 p-4 sm:p-8 max-w-7xl mx-auto">
        <QuickStats />
        <NavigationTabs
          selectedTab={selectedTab as string}
          searchParams={await props.searchParams}
        />

        {selectedTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <UpcomingExams exams={upcomingExams} />
              <SubjectList subjects={subjects} />
            </div>
            <div className="space-y-8">
              <QuickActions />
              <RecentActivity activities={recentActivities} />
              <AnalyticsSummary stats={analyticsSummary} />
            </div>
          </div>
        )}

        {selectedTab === "exams" && <InvigilationAssignment />}
        {selectedTab === "courses" && <CoursesTab />}
        {selectedTab === "faculty" && <TeachersTab />}
        {selectedTab === "analytics" && <AnalyticsTab />}
      </div>

      {/* <ExamSubmissionModal
        showModal={showExamModal}
        setShowModal={setShowExamModal}
      /> */}
    </Suspense>
  );
}
