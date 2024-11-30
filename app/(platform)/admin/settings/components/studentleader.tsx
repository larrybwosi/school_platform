import React from "react";
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
import { useState } from "react";

export function StudentLeader() {
  const [leaderName, setLeaderName] = useState("");
  const [leaderGrade, setLeaderGrade] = useState("");
  const [leaderStream, setLeaderStream] = useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Leader</CardTitle>
        <CardDescription>
          Assign the overall student leader for the school
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="leaderName">Student Leader Name</Label>
            <Input
              id="leaderName"
              value={leaderName}
              onChange={(e) => setLeaderName(e.target.value)}
              placeholder="Enter student leader name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="leaderGrade">Grade</Label>
            <Select value={leaderGrade} onValueChange={setLeaderGrade}>
              <SelectTrigger id="leaderGrade">
                <SelectValue placeholder="Select grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="9">Grade 9</SelectItem>
                <SelectItem value="10">Grade 10</SelectItem>
                <SelectItem value="11">Grade 11</SelectItem>
                <SelectItem value="12">Grade 12</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="leaderStream">Stream</Label>
            <Select value={leaderStream} onValueChange={setLeaderStream}>
              <SelectTrigger id="leaderStream">
                <SelectValue placeholder="Select stream" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Science">Science</SelectItem>
                <SelectItem value="Commerce">Commerce</SelectItem>
                <SelectItem value="Arts">Arts</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button>Save Student Leader</Button>
      </CardContent>
    </Card>
  );
}

