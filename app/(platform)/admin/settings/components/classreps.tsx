import React, { useState } from "react";
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

interface ClassRep {
  grade: string;
  stream: string;
  name: string;
}

export function ClassRepresentatives() {
  const [classReps, setClassReps] = useState<ClassRep[]>([]);

  const handleAddClassRep = () => {
    setClassReps([...classReps, { grade: "", stream: "", name: "" }]);
  };

  const handleClassRepChange = (index: number, field: keyof ClassRep, value: string) => {
    const newClassReps = [...classReps];
    newClassReps[index][field] = value;
    setClassReps(newClassReps);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Class Representatives</CardTitle>
        <CardDescription>
          Assign class representatives for each grade and stream
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {classReps.map((rep, index) => (
          <div key={index} className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor={`grade-${index}`}>Grade</Label>
              <Select
                value={rep.grade}
                onValueChange={(value) => handleClassRepChange(index, "grade", value)}
              >
                <SelectTrigger id={`grade-${index}`}>
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  {mockData.grades.map((grade) => (
                    <SelectItem key={grade} value={grade}>
                      {grade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`stream-${index}`}>Stream</Label>
              <Select
                value={rep.stream}
                onValueChange={(value) => handleClassRepChange(index, "stream", value)}
              >
                <SelectTrigger id={`stream-${index}`}>
                  <SelectValue placeholder="Select stream" />
                </SelectTrigger>
                <SelectContent>
                  {mockData.streams.map((stream) => (
                    <SelectItem key={stream} value={stream}>
                      {stream}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`name-${index}`}>Representative Name</Label>
              <Input
                id={`name-${index}`}
                value={rep.name}
                onChange={(e) => handleClassRepChange(index, "name", e.target.value)}
                placeholder="Enter representative name"
              />
            </div>
          </div>
        ))}
        <Button onClick={handleAddClassRep} variant="outline">
          Add Class Representative
        </Button>
        <Button className="ml-2">Save Class Representatives</Button>
      </CardContent>
    </Card>
  );
}

