'use client'
import { StudentTable, TeacherTable } from "@/components/shared/unified";
import { mockStudents, mockTeachers } from "@/lib/mockData";

export default function TestPage() {
  return (
    <div>
      <TeacherTable
        teachers={mockTeachers}
        onEdit={() => {}}
        colorScheme="blue"
        showCheckbox={false}
      />
      <StudentTable
        students={mockStudents}
        onEdit={() => {}}
        colorScheme="green"
        showCheckbox={true}
      />
    </div>
  );
}