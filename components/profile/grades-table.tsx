import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Student } from "@/lib/mockData"
import StudentRow from "../shared/student-row"

interface GradesTableProps {
  students: Student[]
  searchTerm: string
  sortBy: string
  filterGrade: string
}
export function GradesTable({
  students,
  searchTerm,
  sortBy,
  filterGrade,
}: GradesTableProps) {
  const filteredStudents = students
    ?.filter((student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((student) =>
      filterGrade === "all" ? true : student.grade.toString() === filterGrade
    )
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "grade") {
        return a.grade - b.grade;
      } else if (sortBy === "score") {
        return b.score - a.score;
      }
      return 0;
    });


  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Grade</TableHead>
          <TableHead>Subject</TableHead>
          <TableHead>Score</TableHead>
          <TableHead>Gender</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((student) => (
          <StudentRow
            key={student.id}
            student={student}
          />
        ))}
      </TableBody>
    </Table>
  );
}
