'use client'

import React, { useState, useEffect } from 'react'
import { Layout } from './Layout'
import { QuickStats } from './QuickStats'
import { UpcomingExams } from './UpcomingExams'
import { SubjectList } from './SubjectList'
import { QuickActions } from './QuickActions'
import { RecentActivity } from './RecentActivity'
import { AnalyticsSummary } from './AnalyticsSummary'
import { ExamSubmissionModal } from './ExamSubmissionModal'
import { NavigationTabs } from './NavigationTabs'
import { InvigilationAssignment } from './InvigilationAssignment'
import { CoursesTab } from './CoursesTab'
import { TeachersTab } from './TeachersTab'
import { AnalyticsTab } from './AnalyticsTab'
import { fetchQuickStats, fetchUpcomingExams, fetchSubjects, fetchRecentActivities, fetchAnalyticsSummary } from '@/lib/actions'

interface QuickStats {
  title: string;
  value: number;
  icon: string;
  trend: string;
  trendUp: boolean;
}
[];
interface Exam {
  id: number;
  subject: string;
  type: string;
  date: string;
  status: string;
}
[];

interface Subject {
  id: number;
  name: string;
  semester: number;
  faculty: string;
  progress: number;
}
[];

export default function DepartmentDashboard() {
  const [showExamModal, setShowExamModal] = useState(false)
  const [selectedTab, setSelectedTab] = useState("overview")
  const [quickStats, setQuickStats] = useState<QuickStats[]>([])
  const [upcomingExams, setUpcomingExams] = useState<Exam[]>([])
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [recentActivities, setRecentActivities] = useState([])
  const [analyticsSummary, setAnalyticsSummary] = useState([])

  useEffect(() => {
    const loadData = async () => {
      const [quickStatsData, upcomingExamsData, subjectsData, recentActivitiesData, analyticsSummaryData] = await Promise.all([
        fetchQuickStats(),
        fetchUpcomingExams(),
        fetchSubjects(),
        fetchRecentActivities(),
        fetchAnalyticsSummary()
      ])
      setQuickStats(quickStatsData)
      setUpcomingExams(upcomingExamsData)
      setSubjects(subjectsData)
      setRecentActivities(recentActivitiesData)
      setAnalyticsSummary(analyticsSummaryData)
    }
    loadData()
  }, [])

  return (
    <Layout>
      <div className="space-y-8 p-4 sm:p-8 max-w-7xl mx-auto">
        <QuickStats stats={quickStats} />
        <NavigationTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        
        {selectedTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <UpcomingExams exams={upcomingExams} />
              <SubjectList subjects={subjects} />
            </div>
            <div className="space-y-8">
              <QuickActions onSubmitExam={() => setShowExamModal(true)} />
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
      
      <ExamSubmissionModal 
        showModal={showExamModal} 
        setShowModal={setShowExamModal} 
      />
    </Layout>
  )
}

