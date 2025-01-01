import { Suspense } from 'react'
import { getStudentData } from '../actions'
import { SubjectPerformance } from './SubjectPerformance'
import { GradeDistribution } from './GradeDistribution'
import { AcademicAchievements } from './AcademicAchievements'

export async function AcademicRecordsTab({ studentId }: { studentId: string }) {
  const studentData = await getStudentData()

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2 space-y-4">
        {Object.entries(studentData.subjects).map(([subject, details]) => (
          <Suspense key={subject} fallback={<div>Loading subject data...</div>}>
            <SubjectPerformance subject={subject} details={details} />
          </Suspense>
        ))}
      </div>

      <div className="space-y-4">
        <Suspense fallback={<div>Loading grade distribution...</div>}>
          <GradeDistribution />
        </Suspense>
        <Suspense fallback={<div>Loading academic achievements...</div>}>
          <AcademicAchievements />
        </Suspense>
      </div>
    </div>
  )
}

