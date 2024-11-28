import { AdminDashboard } from "@/components/dashboard/admin-dashboard";
import { TeacherDashboard } from "@/components/dashboard/teacher-dashboard";
import { StudentDashboard } from "@/components/dashboard/student-dashboard";

export default async function DashboardPage() {
  const dashboardComponents = {
    admin: AdminDashboard,
    teacher: TeacherDashboard,
    student: StudentDashboard,
  };

  // const DashboardComponent = dashboardComponents[session.user.role as keyof typeof dashboardComponents];
  const DashboardComponent = dashboardComponents['admin'];

  return <DashboardComponent user={{}} />;
}