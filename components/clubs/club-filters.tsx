"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function ClubFilters() {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search clubs..."
          className="pl-9"
        />
      </div>
      <Select>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="academic">Academic</SelectItem>
          <SelectItem value="arts">Arts</SelectItem>
          <SelectItem value="sports">Sports</SelectItem>
          <SelectItem value="technical">Technical</SelectItem>
          <SelectItem value="cultural">Cultural</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}