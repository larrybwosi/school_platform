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
import {
  MoreHorizontal,
  UserPlus,
  Trash,
  UserCog,
} from 'lucide-react';
import { DepartmentMember } from '../types';
import { mockMembers, mockDepartments } from '../mock-data';

export function MembersList() {
  const [members, setMembers] = useState<DepartmentMember[]>(mockMembers);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');

  const handleRemoveMember = async (id: string) => {
    setMembers(members.filter(member => member.id !== id));
  };

  const handleAddMember = () => {
    // Implement add member dialog
  };

  const handleUpdateRole = (member: DepartmentMember) => {
    // Implement update role dialog
  };

  const filteredMembers = selectedDepartment === 'all'
    ? members
    : members.filter(member => member.departmentId === selectedDepartment);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">Department Members</h2>
          <select
            className="border rounded-md p-1"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="all">All Departments</option>
            {mockDepartments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>
        <Button onClick={handleAddMember}>
          <UserPlus className="w-4 h-4 mr-2" />
          Add Member
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead className="w-[70px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="font-medium">{member.name}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>
                  {mockDepartments.find(d => d.id === member.departmentId)?.name || 'Unknown'}
                </TableCell>
                <TableCell>{member.role}</TableCell>
                <TableCell>{member.joinedAt.toLocaleDateString()}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleUpdateRole(member)}>
                        <UserCog className="mr-2 h-4 w-4" />
                        Update Role
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleRemoveMember(member.id)}
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
