import { Suspense } from "react";
import { connection } from "next/server";

import { QuickStats } from "./components/QuickStats";
import { UpcomingExams } from "./components/UpcomingExams";
import { SubjectList } from "./components/SubjectList";
import { QuickActions } from "./components/QuickActions";
import { RecentActivity } from "./components/RecentActivity";
import { AnalyticsSummary } from "./components/AnalyticsSummary";
import { NavigationTabs } from "./components/NavigationTabs";
import { InvigilationAssignment } from "./components/InvigilationAssignment";
import { CoursesTab } from "./components/CoursesTab";
import { TeachersTab } from "./components/TeachersTab";
import { AnalyticsTab } from "./components/AnalyticsTab";
import { getDepartmentData } from "./lib/actions";
import { loadSearchParams } from "@/lib/searchParam";

import type { SearchParams } from "nuqs/server";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface QuickStats {
  title: string;
  value: number;
  icon: string;
  trend: string;
  trendUp: boolean;
}
[];

type PageProps = {
  searchParams: Promise<SearchParams>;
};
 

// Loading component for suspense fallback
const LoadingSkeleton = () => (
  <div className="space-y-8 animate-pulse">
    <div className="h-20 bg-gray-200 rounded-lg dark:bg-gray-700" />
    <div className="h-12 bg-gray-200 rounded-lg dark:bg-gray-700 w-full max-w-2xl" />
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <div className="h-96 bg-gray-200 rounded-lg dark:bg-gray-700" />
        <div className="h-96 bg-gray-200 rounded-lg dark:bg-gray-700" />
      </div>
      <div className="space-y-8">
        <div className="h-64 bg-gray-200 rounded-lg dark:bg-gray-700" />
        <div className="h-64 bg-gray-200 rounded-lg dark:bg-gray-700" />
        <div className="h-64 bg-gray-200 rounded-lg dark:bg-gray-700" />
      </div>
    </div>
  </div>
);

// Error component
const ErrorDisplay = ({ message }: { message: string }) => (
  <Alert variant="destructive" className="my-8">
    <AlertCircle className="h-4 w-4" />
    <AlertDescription>{message}</AlertDescription>
  </Alert>
);
export default async function Page(props: PageProps) {
  await connection()
  const { selectedTab } = await loadSearchParams(props.searchParams);
  const { id } = await props.searchParams;
  const { upcomingExams, subjects, recentActivities, analyticsSummary } =
    await getDepartmentData(id as string);

    // if (!id) {
    //   throw new Error("Department ID is required");
    // }

  return (
     <Suspense fallback={<LoadingSkeleton />}>
        <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800">
          <div className="container mx-auto space-y-8 p-4 sm:p-6 lg:p-8">
            {/* Header Section */}
            <div className="fade-in">
              <QuickStats />
            </div>

            {/* Navigation */}
            <div className="sticky top-0 z-10 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg rounded-lg shadow-sm fade-in">
              <NavigationTabs
                selectedTab={selectedTab as string}
                searchParams={await props.searchParams}
              />
            </div>

            {/* Main Content */}
            <div className="fade-in">
              {selectedTab === "overview" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                  {/* Main Content Column */}
                  <div className="lg:col-span-2 space-y-6 md:space-y-8">
                    <div className="transform hover:-translate-y-1 transition-transform duration-300">
                      <UpcomingExams exams={upcomingExams} />
                    </div>
                    <div className="transform hover:-translate-y-1 transition-transform duration-300">
                      <SubjectList subjects={subjects} />
                    </div>
                  </div>

                  {/* Sidebar Column */}
                  <div className="space-y-6 md:space-y-8">
                    <div className="transform hover:-translate-y-1 transition-transform duration-300">
                      <QuickActions />
                    </div>
                    <div className="transform hover:-translate-y-1 transition-transform duration-300">
                      <RecentActivity activities={recentActivities} />
                    </div>
                    <div className="transform hover:-translate-y-1 transition-transform duration-300">
                      <AnalyticsSummary stats={analyticsSummary} />
                    </div>
                  </div>
                </div>
              )}

              {/* Other Tabs */}
              {selectedTab === "exams" && (
                <div className="fade-in">
                  <InvigilationAssignment />
                </div>
              )}
              {selectedTab === "courses" && (
                <div className="fade-in">
                  <CoursesTab />
                </div>
              )}
              {selectedTab === "faculty" && (
                <div className="fade-in">
                  <TeachersTab />
                </div>
              )}
              {selectedTab === "analytics" && (
                <div className="fade-in">
                  <AnalyticsTab />
                </div>
              )}
            </div>
          </div>
        </div>
      </Suspense>
    );
  } 