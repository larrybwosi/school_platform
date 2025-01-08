'use client'

import React, { useState } from 'react'
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

export default function DepartmentDashboard() {
  const [showExamModal, setShowExamModal] = useState(false)
  const [selectedTab, setSelectedTab] = useState("overview")

  return (
    <Layout>
      <div className="space-y-8">
        <QuickStats />
        <NavigationTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        
        {selectedTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <UpcomingExams />
              <SubjectList />
            </div>
            <div className="space-y-8">
              <QuickActions onSubmitExam={() => setShowExamModal(true)} />
              <RecentActivity />
              <AnalyticsSummary />
            </div>
          </div>
        )}
        
        {selectedTab === "exams" && <InvigilationAssignment />}
        {selectedTab === "courses" && <CoursesTab />}
        {selectedTab === "faculty" && <TeachersTab />}
        
      </div>
      
      <ExamSubmissionModal 
        showModal={showExamModal} 
        setShowModal={setShowExamModal} 
      />
    </Layout>
  )
}

