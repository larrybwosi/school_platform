'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, UserPlus, Trash } from 'lucide-react';
import { DepartmentLeader } from '../types';
import { mockLeaders } from '../mock-data';

export function LeadersList() {
  const [leaders, setLeaders] = useState<DepartmentLeader[]>(mockLeaders);

  const handleRemoveLeader = async (id: string) => {
    setLeaders(leaders.filter(leader => leader.id !== id));
  };

  const handleAddLeader = () => {
    // Implement add leader dialog
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Department Leaders</h2>
        <Button onClick={handleAddLeader}>
          <UserPlus className="w-4 h-4 mr-2" />
          Add Leader
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Appointed Date</TableHead>
              <TableHead className="w-[70px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaders.map((leader) => (
              <TableRow key={leader.id}>
                <TableCell className="font-medium">{leader.name}</TableCell>
                <TableCell>{leader.email}</TableCell>
                <TableCell>
                  {mockLeaders.find(d => d.id === leader.departmentId)?.name || 'Unknown'}
                </TableCell>
                <TableCell>{leader.appointedAt.toLocaleDateString()}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem 
                        onClick={() => handleRemoveLeader(leader.id)}
                        className="text-red-600"
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
