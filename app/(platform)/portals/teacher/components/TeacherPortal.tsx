'use client'

import { useState } from 'react'
import TopBar from './TopBar'
import QuickStats from './QuickStats'
import TodaySchedule from './TodaySchedule'
import SubmissionsOverview from './SubmissionsOverview'
import AlertsNotifications from './AlertsNotifications'
import PerformanceAnalytics from './PerformanceAnalytics'
import ResourceManagement from './ResourceManagement'
import ChatBot from './ChatBot'
import { TooltipProvider } from "@/components/ui/tooltip"
import { useTheme } from 'next-themes'

interface TeacherPortalProps {
  teacherInfo: any;
  upcomingClasses: any;
  submissions: any;
  alerts: any;
  performanceMetrics: any;
  timetable: any;
}
export default function TeacherPortal({
  teacherInfo,
  upcomingClasses,
  submissions,
  alerts,
  performanceMetrics,
  timetable,
}: TeacherPortalProps) {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <TooltipProvider>
      <div
        className={`min-h-screen p-4 md:p-6 dark:bg-gray-900 dark:text-white bg-slate-50 text-slate-900 transition-colors duration-300`}
      >
        <TopBar teacherInfo={teacherInfo} />
        <QuickStats teacherInfo={teacherInfo} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <TodaySchedule upcomingClasses={upcomingClasses} isDark={isDark} />
          <SubmissionsOverview submissions={submissions} isDark={isDark} />
          <AlertsNotifications alerts={alerts} isDark={isDark} />
          <PerformanceAnalytics
            performanceMetrics={performanceMetrics}
            isDark={isDark}
          />
          <ResourceManagement teacherInfo={teacherInfo} isDark={isDark} />
          <ChatBot timetable={timetable} />
        </div>
      </div>
    </TooltipProvider>
  );
}

