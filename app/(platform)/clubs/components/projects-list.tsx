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
  ListTodo,
  Plus,
} from 'lucide-react';
import { ClubProject } from '../types';
import { mockProjects, mockClubs } from '../mock-data';
import { ProjectMilestonesDialog } from './project-milestones-dialog';
import { Badge } from '@/components/ui/badge';

export function ProjectsList() {
  const [projects, setProjects] = useState<ClubProject[]>(mockProjects);
  const [selectedProject, setSelectedProject] = useState<ClubProject | null>(null);
  const [showMilestones, setShowMilestones] = useState(false);

  const handleDelete = async (id: string) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  const handleEdit = (project: ClubProject) => {
    // Implement edit project dialog
  };

  const handleViewMilestones = (project: ClubProject) => {
    setSelectedProject(project);
    setShowMilestones(true);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'NOT_STARTED': 'bg-gray-500',
      'IN_PROGRESS': 'bg-blue-500',
      'ON_HOLD': 'bg-yellow-500',
      'COMPLETED': 'bg-green-500',
      'CANCELLED': 'bg-red-500',
    };
    return colors[status] || 'bg-gray-500';
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Club Projects</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project Name</TableHead>
              <TableHead>Club</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => {
              const club = mockClubs.find(c => c.id === project.clubId);
              return (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell>{club?.name || 'Unknown Club'}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>{project.startDate.toLocaleDateString()}</TableCell>
                  <TableCell>
                    {project.endDate?.toLocaleDateString() || 'Ongoing'}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(project)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleViewMilestones(project)}>
                          <ListTodo className="mr-2 h-4 w-4" />
                          Milestones
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDelete(project.id)}
                          className="text-red-600"
                        >
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

      {selectedProject && (
        <ProjectMilestonesDialog
          project={selectedProject}
          open={showMilestones}
          onOpenChange={setShowMilestones}
        />
      )}
    </div>
  );
}
