
export interface Member {
  id: string;
  userId: string;
  clubId: string;
  name: string;
  email: string;
  role: string;
  joinedAt: Date;
  isStudent: boolean;
}

export interface Milestone {
  id: string;
  projectId: string;
  title: string;
  description: string;
  dueDate: Date;
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  completedAt?: Date;
  assignedTo: string;
  customFields: { name: string; value: string }[];
  isCompleted: boolean;
}

export interface ProjectMember {
  id: string;
  name: string;
  role: "LEAD" | "MEMBER";
  avatar: string;
}

export interface MediaItem {
  id: string;
  type: "IMAGE" | "VIDEO";
  url: string;
  caption: string;
}

export interface Highlight {
  id: string;
  title: string;
  description: string;
  date: Date;
}

export interface Project {
  id: string;
  clubId: string;
  name: string;
  description: string;
  status: "NOT_STARTED" | "IN_PROGRESS" | "ON_HOLD" | "COMPLETED" | "CANCELLED";
  startDate: Date;
  endDate: Date;
  leadStudent: string;
  budget: number;
  priority: "LOW" | "MEDIUM" | "HIGH";
  tags: string[];
  customFields: { name: string; value: string }[];
  milestones: Milestone[];
  coverImage: string;
  members: ProjectMember[];
  reputation: number;
  mediaGallery: MediaItem[];
  highlights: Highlight[];
  showcaseMode: boolean;
  gamifiedProgress: number;
  isPrivate: boolean;
}

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
  members: Member[];
  projects: Project[];
  icon: string;
  banner?: string;
}

export interface Club {
  id: string;
  name: string;
  category: string;
  description: string;
  memberCount: number;
  meetingSchedule: string;
  icon: string;
  achievements: string[];
  tags: string[];
  isPopular: boolean;
  activeProjects: number;
  teacherAdvisor: string;
  established: string;
}
