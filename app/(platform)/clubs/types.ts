export interface Club {
  id: string;
  name: string;
  description: string;
  teacher: string;
  president: string;
  secretary: string;
  createdAt: Date;
  updatedAt: Date;
  category: string;
  meetingSchedule: string;
  members: ClubMember[];
  projects: ClubProject[];
}

export interface ClubFormData {
  name: string;
  description: string;
  teacher: string;
  president: string;
  secretary: string;
  category: string;
  meetingSchedule: string;
}

export interface ClubMember {
  id: string;
  userId: string;
  clubId: string;
  name: string;
  email: string;
  role: ClubRole;
  joinedAt: Date;
  isStudent?: boolean;
}

export interface ClubProject {
  id: string;
  clubId: string;
  name: string;
  description: string;
  status: ProjectStatus;
  startDate: Date;
  endDate?: Date;
  leadStudent?: string;
  customFields: { name: string; value: string }[];
  milestones: ProjectMilestone[];
}

export interface ProjectMilestone {
  id: string;
  projectId: string;
  title: string;
  description: string;
  dueDate: Date;
  status: MilestoneStatus;
  completedAt?: Date;
  customFields: { name: string; value: string }[];
  isCompleted: boolean;
}

export type ClubRole = 'TEACHER' | 'PRESIDENT' | 'SECRETARY' | 'MEMBER';
export type ProjectStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'ON_HOLD' | 'COMPLETED' | 'CANCELLED';
export type MilestoneStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';

