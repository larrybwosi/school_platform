import TeacherPortal from "./components/TeacherPortal";
import {
  getTeacherInfo,
  getUpcomingClasses,
  getSubmissions,
  getAlerts,
  getPerformanceMetrics,
  getTimetable,
} from "./actions/data";

export default async function Page() {
  const teacherInfo = await getTeacherInfo();
  const upcomingClasses = await getUpcomingClasses();
  const submissions = await getSubmissions();
  const alerts = await getAlerts();
  const performanceMetrics = await getPerformanceMetrics();
  const timetable = await getTimetable();

  return (
    <TeacherPortal
      teacherInfo={teacherInfo}
      upcomingClasses={upcomingClasses}
      submissions={submissions}
      alerts={alerts}
      performanceMetrics={performanceMetrics}
      timetable={timetable}
    />
  );
}
