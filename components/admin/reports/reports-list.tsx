"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Eye } from "lucide-react";
import { format } from "date-fns";

const reports = [
  {
    id: "1",
    name: "Monthly Activity Summary",
    type: "Activity",
    generated: new Date("2024-03-01"),
    status: "ready",
  },
  {
    id: "2",
    name: "Member Engagement Report",
    type: "Engagement",
    generated: new Date("2024-03-05"),
    status: "ready",
  },
  {
    id: "3",
    name: "Club Performance Analysis",
    type: "Performance",
    generated: new Date("2024-03-10"),
    status: "processing",
  },
];

export function ReportsList() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Report Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Generated</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reports.map((report) => (
          <TableRow key={report.id}>
            <TableCell>{report.name}</TableCell>
            <TableCell>{report.type}</TableCell>
            <TableCell>{format(report.generated, "MMM d, yyyy")}</TableCell>
            <TableCell>
              <Badge variant={report.status === "ready" ? "default" : "secondary"}>
                {report.status}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" disabled={report.status !== "ready"}>
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}