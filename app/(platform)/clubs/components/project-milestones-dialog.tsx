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
import { ClubProject } from '../types';
import { Badge } from '@/components/ui/badge';

interface ProjectMilestonesDialogProps {
  project: ClubProject;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectMilestonesDialog({
  project,
  open,
  onOpenChange,
}: ProjectMilestonesDialogProps) {
  const getStatusColor = (status: string) => {
    const colors = {
      'PENDING': 'bg-yellow-500',
      'IN_PROGRESS': 'bg-blue-500',
      'COMPLETED': 'bg-green-500',
      'DELAYED': 'bg-red-500',
    };
    return colors[status] || 'bg-gray-500';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{project.name} - Milestones</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Project Details</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Status:</span> {project.status}</p>
                <p><span className="font-medium">Start Date:</span> {project.startDate.toLocaleDateString()}</p>
                <p><span className="font-medium">End Date:</span> {project.endDate?.toLocaleDateString() || 'Ongoing'}</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Custom Fields</h3>
              <div className="space-y-2 text-sm">
                {Object.entries(project.customFields).map(([key, value]) => (
                  <p key={key}>
                    <span className="font-medium capitalize">{key}:</span> {value}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Milestones</h3>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Milestone
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Completed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {project.milestones.map((milestone) => (
                  <TableRow key={milestone.id}>
                    <TableCell className="font-medium">
                      {milestone.title}
                    </TableCell>
                    <TableCell>{milestone.description}</TableCell>
                    <TableCell>{milestone.dueDate.toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(milestone.status)}>
                        {milestone.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {milestone.completedAt
                        ? milestone.completedAt.toLocaleDateString()
                        : '-'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
