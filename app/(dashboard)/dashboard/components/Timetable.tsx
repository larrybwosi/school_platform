import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const timetableData = [
  { day: "Monday", periods: ["Math", "Physics", "Chemistry", "English", "P.E."] },
  { day: "Tuesday", periods: ["Biology", "History", "Math", "Physics", "Art"] },
  { day: "Wednesday", periods: ["Chemistry", "English", "Math", "Computer Science", "Music"] },
  { day: "Thursday", periods: ["Physics", "Math", "Biology", "History", "Geography"] },
  { day: "Friday", periods: ["English", "Chemistry", "Math", "Physics", "Literature"] },
]

export function Timetable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Timetable</CardTitle>
        <CardDescription>Your class schedule for the week</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Day</TableHead>
                {[1, 2, 3, 4, 5].map((period) => (
                  <TableHead key={period}>Period {period}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {timetableData.map((day) => (
                <TableRow key={day.day}>
                  <TableCell className="font-medium">{day.day}</TableCell>
                  {day.periods.map((subject, index) => (
                    <TableCell key={index}>{subject}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

