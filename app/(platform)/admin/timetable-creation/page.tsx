'use client'
import { useState } from "react";
import { Plus, Trash2, Save, Edit2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mockGrades, mockTeachers, mockTimeSlots } from "@/lib/timetable/types";

const TimetableCreator = () => {
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedStream, setSelectedStream] = useState("");
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");

  // States for managing teachers
  const [teachers, setTeachers] = useState(mockTeachers);
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  const [newTeacher, setNewTeacher] = useState({
    name: "",
    subjects: [],
    maxHours: 20,
  });

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const handleAddTeacher = () => {
    // Add validation logic here
    setTeachers([
      ...teachers,
      {
        id: String(teachers.length + 1),
        ...newTeacher,
        availability: {},
      },
    ]);
    setIsTeacherModalOpen(false);
    setNewTeacher({ name: "", subjects: [], maxHours: 20 });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Teacher Management Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Teacher Management</span>
            <Dialog
              open={isTeacherModalOpen}
              onOpenChange={setIsTeacherModalOpen}
            >
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Teacher
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Teacher</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Name</Label>
                    <Input
                      value={newTeacher.name}
                      onChange={(e) =>
                        setNewTeacher({ ...newTeacher, name: e.target.value })
                      }
                      placeholder="Teacher name"
                    />
                  </div>
                  <div>
                    <Label>Max Hours per Week</Label>
                    <Input
                      type="number"
                      value={newTeacher.maxHours}
                      onChange={(e) =>
                        setNewTeacher({
                          ...newTeacher,
                          maxHours: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                  <Button onClick={handleAddTeacher}>Add Teacher</Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teachers.map((teacher) => (
              <Card key={teacher.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{teacher.name}</h3>
                      <p className="text-sm text-gray-500">
                        Subjects: {teacher.subjects.join(", ")}
                      </p>
                      <p className="text-sm text-gray-500">
                        Max Hours: {teacher.maxHours}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Timetable Creation Section */}
      <Card>
        <CardHeader>
          <CardTitle>Create Timetable</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label>Select Grade</Label>
              <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                <SelectTrigger>
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  {mockGrades.map((grade) => (
                    <SelectItem key={grade.id} value={grade.id}>
                      {grade.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Select Stream</Label>
              <Select value={selectedStream} onValueChange={setSelectedStream}>
                <SelectTrigger>
                  <SelectValue placeholder="Select stream" />
                </SelectTrigger>
                <SelectContent>
                  {selectedGrade &&
                    mockGrades
                      .find((g) => g.id === selectedGrade)
                      ?.streams.map((stream) => (
                        <SelectItem key={stream} value={stream}>
                          Stream {stream}
                        </SelectItem>
                      ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Select Teacher</Label>
              <Select
                value={selectedTeacher}
                onValueChange={setSelectedTeacher}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select teacher" />
                </SelectTrigger>
                <SelectContent>
                  {teachers.map((teacher) => (
                    <SelectItem key={teacher.id} value={teacher.id}>
                      {teacher.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Select Subject</Label>
              <Select
                value={selectedSubject}
                onValueChange={setSelectedSubject}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {selectedTeacher &&
                    teachers
                      .find((t) => t.id === selectedTeacher)
                      ?.subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Select Day</Label>
              <Select value={selectedDay} onValueChange={setSelectedDay}>
                <SelectTrigger>
                  <SelectValue placeholder="Select day" />
                </SelectTrigger>
                <SelectContent>
                  {days.map((day) => (
                    <SelectItem key={day} value={day}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Select Time Slot</Label>
              <Select
                value={selectedTimeSlot}
                onValueChange={setSelectedTimeSlot}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select time slot" />
                </SelectTrigger>
                <SelectContent>
                  {mockTimeSlots.map((slot) => (
                    <SelectItem key={slot.id} value={slot.id}>
                      {slot.startTime} - {slot.endTime}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button className="w-full md:w-auto">
              <Save className="h-4 w-4 mr-2" />
              Save Timetable
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimetableCreator;
