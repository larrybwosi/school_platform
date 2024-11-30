'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Club, ClubMember } from '../types';
import { mockMembers } from '../mock-data';
import { Badge } from '@/components/ui/badge';

interface ClubMembersDialogProps {
  club: Club;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ClubMembersDialog({
  club,
  open,
  onOpenChange,
}: ClubMembersDialogProps) {
  const members = mockMembers.filter(member => member.clubId === club.id);

  const getRoleBadgeColor = (role: string) => {
    const colors = {
      'HEAD_TEACHER': 'bg-purple-500',
      'HEAD_STUDENT': 'bg-blue-500',
      'SECRETARY': 'bg-green-500',
      'TREASURER': 'bg-yellow-500',
      'EVENT_COORDINATOR': 'bg-pink-500',
      'PROJECT_LEAD': 'bg-orange-500',
      'MEMBER': 'bg-gray-500',
    };
    return colors[role] || 'bg-gray-500';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{club.name} - Members</DialogTitle>
        </DialogHeader>
        <div className="flex justify-between items-center my-4">
          <div>
            <p className="text-sm text-gray-500">
              Total Members: {members.length}
            </p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Member
          </Button>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Joined Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>
                    <Badge className={getRoleBadgeColor(member.role)}>
                      {member.role.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {member.isStudent ? 'Student' : 'Teacher'}
                  </TableCell>
                  <TableCell>{member.joinedAt.toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
