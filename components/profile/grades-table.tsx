import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const students = [
  {
    id: 1,
    name: "John Doe",
    grade: 9,
    subject: "Math",
    score: 85,
    gender: "Male",
  },
  {
    id: 2,
    name: "Jane Smith",
    grade: 10,
    subject: "Physics",
    score: 92,
    gender: "Female",
  },
  {
    id: 3,
    name: "Bob Johnson",
    grade: 9,
    subject: "Chemistry",
    score: 78,
    gender: "Male",
  },
  {
    id: 4,
    name: "Alice Brown",
    grade: 11,
    subject: "Biology",
    score: 88,
    gender: "Female",
  },
  {
    id: 5,
    name: "Charlie Wilson",
    grade: 10,
    subject: "Math",
    score: 95,
    gender: "Male",
  },
]

export function GradesTable({ searchTerm, sortBy, filterGrade }) {
  const filteredStudents = students
    .filter((student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((student) =>
      filterGrade === "all" ? true : student.grade.toString() === filterGrade
    )
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name)
      } else if (sortBy === "grade") {
        return a.grade - b.grade
      } else if (sortBy === "score") {
        return b.score - a.score
      }
      return 0
    })

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
        {filteredStudents.map((student) => (
          <TableRow key={student.id}>
            <TableCell>{student.name}</TableCell>
            <TableCell>{student.grade}</TableCell>
            <TableCell>{student.subject}</TableCell>
            <TableCell>{student.score}</TableCell>
            <TableCell>{student.gender}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
