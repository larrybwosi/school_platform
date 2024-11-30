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
  Pencil, 
  Trash, 
  Users, 
  FileSpreadsheet 
} from 'lucide-react';
import { Club } from '../types';
import { mockClubs, mockMembers } from '../mock-data';
import { ClubMembersDialog } from './club-members-dialog';

export function ClubList() {
  const [clubs, setClubs] = useState<Club[]>(mockClubs);
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const [showMembers, setShowMembers] = useState(false);

  const handleDelete = async (id: string) => {
    setClubs(clubs.filter(club => club.id !== id));
  };

  const handleEdit = (club: Club) => {
    // Implement edit club dialog
  };

  const handleViewMembers = (club: Club) => {
    setSelectedClub(club);
    setShowMembers(true);
  };

  const getClubHeads = (clubId: string) => {
    const members = mockMembers.filter(member => member.clubId === clubId);
    const teacherHead = members.find(member => member.role === 'TEACHER');
    const studentHead = members.find(member => member.role === 'MEMBER');
    return { teacherHead, studentHead };
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Teacher Head</TableHead>
              <TableHead>Student Head</TableHead>
              <TableHead>Meeting Schedule</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clubs.map((club) => {
              const { teacherHead, studentHead } = getClubHeads(club.id);
              return (
                <TableRow key={club.id}>
                  <TableCell className="font-medium">{club.name}</TableCell>
                  <TableCell>{club.category}</TableCell>
                  <TableCell>{teacherHead?.name || 'Not assigned'}</TableCell>
                  <TableCell>{studentHead?.name || 'Not assigned'}</TableCell>
                  <TableCell>{club.meetingSchedule || 'Not set'}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(club)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleViewMembers(club)}>
                          <Users className="mr-2 h-4 w-4" />
                          Members
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(club.id)}
                          className="text-red-600">
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {selectedClub && (
        <ClubMembersDialog
          club={selectedClub}
          open={showMembers}
          onOpenChange={setShowMembers}
        />
      )}
    </div>
  );
}
