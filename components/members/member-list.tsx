"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Member } from "@/types";
import { format } from "date-fns";

const members: Member[] = [
  {
    id: "1",
    role: "leader",
    skills: ["Programming", "Public Speaking"],
    joinDate: new Date("2024-01-15"),
    status: "active",
  },
  {
    id: "2",
    role: "member",
    skills: ["Design", "Writing"],
    joinDate: new Date("2024-02-01"),
    status: "active",
  },
];

export function MemberList() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Member ID</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Skills</TableHead>
            <TableHead>Join Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id}>
              <TableCell>{member.id}</TableCell>
              <TableCell className="capitalize">{member.role}</TableCell>
              <TableCell>
                <div className="flex gap-1">
                  {member.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>{format(member.joinDate, "MMM d, yyyy")}</TableCell>
              <TableCell>
                <Badge
                  variant={member.status === "active" ? "default" : "secondary"}
                >
                  {member.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}