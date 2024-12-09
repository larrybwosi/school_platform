"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ReportFilters() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search reports..." className="pl-9" />
      </div>
      <Select>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Report Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="activity">Activity</SelectItem>
          <SelectItem value="engagement">Engagement</SelectItem>
          <SelectItem value="performance">Performance</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ready">Ready</SelectItem>
          <SelectItem value="processing">Processing</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}