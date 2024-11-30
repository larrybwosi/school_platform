import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockData } from "@/lib/mockData";

interface AcademicSettingsProps {
  academicYear: string;
  setAcademicYear: (year: string) => void;
  gradingSystem: string;
  setGradingSystem: (system: string) => void;
}

export function AcademicSettings({
  academicYear,
  setAcademicYear,
  gradingSystem,
  setGradingSystem,
}: AcademicSettingsProps) {
  const [grades, setGrades] = useState<string[]>(mockData.grades);
  const [streams, setStreams] = useState<string[]>(mockData.streams);

  const handleAddGrade = () => {
    setGrades([...grades, ""]);
  };

  const handleAddStream = () => {
    setStreams([...streams, ""]);
  };

  const handleGradeChange = (index: number, value: string) => {
    const newGrades = [...grades];
    newGrades[index] = value;
    setGrades(newGrades);
  };

  const handleStreamChange = (index: number, value: string) => {
    const newStreams = [...streams];
    newStreams[index] = value;
    setStreams(newStreams);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Academic Settings</CardTitle>
        <CardDescription>
          Configure academic year, grading system, grades, and streams
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="academicYear">Current Academic Year</Label>
            <Select value={academicYear} onValueChange={setAcademicYear}>
              <SelectTrigger id="academicYear">
                <SelectValue placeholder="Select academic year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024-2025</SelectItem>
                <SelectItem value="2023">2023-2024</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="gradingSystem">Grading System</Label>
            <Select value={gradingSystem} onValueChange={setGradingSystem}>
              <SelectTrigger id="gradingSystem">
                <SelectValue placeholder="Select grading system" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="letter">Letter Grades (A-F)</SelectItem>
                <SelectItem value="percentage">Percentage</SelectItem>
                <SelectItem value="gpa">GPA (4.0 Scale)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Grades</Label>
          {grades.map((grade, index) => (
            <Input
              key={index}
              value={grade}
              onChange={(e) => handleGradeChange(index, e.target.value)}
              placeholder={`Grade ${index + 1}`}
              className="mb-2"
            />
          ))}
          <Button onClick={handleAddGrade} variant="outline">
            Add Grade
          </Button>
        </div>

        <div className="space-y-2">
          <Label>Streams</Label>
          {streams.map((stream, index) => (
            <Input
              key={index}
              value={stream}
              onChange={(e) => handleStreamChange(index, e.target.value)}
              placeholder={`Stream ${index + 1}`}
              className="mb-2"
            />
          ))}
          <Button onClick={handleAddStream} variant="outline">
            Add Stream
          </Button>
        </div>

        <Button>Save Academic Settings</Button>
      </CardContent>
    </Card>
  );
}

