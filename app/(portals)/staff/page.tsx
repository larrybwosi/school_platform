import StaffDashboard from "@/components/shared/staffDashboard";

export default function StaffPage() {
  return (
    <div>
      <StaffDashboard loggedInStaff={{ name: "John Doe", role: "admin", id: "1", email: "a@b.com" }} />
    </div>
  );
}