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
import { Calendar } from "lucide-react";

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
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Weekly Schedule</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-4">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
              (day) => (
                <div key={day} className="space-y-2">
                  <h3 className="font-semibold">{day}</h3>
                  <div className="space-y-2">
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="text-sm font-medium">Mathematics</p>
                      <p className="text-xs text-gray-600">8:00 - 9:30</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="text-sm font-medium">Physics</p>
                      <p className="text-xs text-gray-600">9:45 - 11:15</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="text-sm font-medium">Chemistry</p>
                      <p className="text-xs text-gray-600">11:30 - 1:00</p>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </CardContent>
      </Card>
  );
}

