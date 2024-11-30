import { Club, ClubMember, ClubProject, ProjectMilestone, ProjectStatus } from './types';

const createRandomId = () => Math.random().toString(36).substring(2, 10);

export const mockMilestones: ProjectMilestone[] = [
  {
    id: createRandomId(),
    title: 'Project Planning',
    description: 'Initial project planning and scope definition',
    isCompleted: true,
    completedAt: new Date('2023-03-14'),
    customFields: [
      { name: 'start_date', value: '2023-03-01' },
      { name: 'end_date', value: '2023-05-01' },
    ],
    dueDate: new Date('2023-03-14'),
    status: 'COMPLETED',
    projectId: createRandomId(),
  },
  {
    id: createRandomId(),
    title: 'Resource Gathering',
    description: 'Collect all necessary resources and materials',
    isCompleted: false,
    dueDate: new Date('2023-04-01'),
    customFields: [
      { name: 'budget', value: '10000' },
      { name: 'participants', value: '20' },
    ],
    projectId: createRandomId(),
    status: 'IN_PROGRESS', 
    completedAt: new Date('2023-04-01'),
  },
  {
    id: createRandomId(),
    title: 'Implementation',
    description: 'Execute the project plan',
    isCompleted: false,
    dueDate: new Date('2023-05-01'),
    customFields: [
      { name: 'venue', value: 'School Auditorium' },
      { name: 'budget', value: '5000' },
      { name: 'participants', value: '50' },
    ],
    projectId: createRandomId(),
    status: 'IN_PROGRESS',
  },
];

export const mockProjects: ClubProject[] = [
  {
    id: createRandomId(),
    name: 'Annual Science Fair',
    description: 'Organizing and conducting the annual science fair',
    status: 'NOT_STARTED',
    startDate: new Date('2023-03-01'),
    endDate: new Date('2023-05-01'),
    customFields: [
      { name: 'venue', value: 'School Auditorium' },
      { name: 'budget', value: '5000' },
      { name: 'participants', value: '50' },
    ],
    milestones: mockMilestones,
    clubId: createRandomId(),
  },
];

export const mockMembers: ClubMember[] = [
  {
    id: createRandomId(),
    role: 'SECRETARY',
    userId: createRandomId(),
    clubId: createRandomId(),
    email: 'a@b.com',
    name: 'John Doe',
    joinedAt: new Date('2023-01-01'),

  },
  {
    id: createRandomId(),
    role: 'TEACHER',
    userId: createRandomId(),
    clubId: createRandomId(),
    email: 'a@b.com',
    name: 'John Doe',
    joinedAt: new Date('2023-01-01'),
  },
  {
    id: createRandomId(),
    role: 'PRESIDENT',
    userId: createRandomId(),
    clubId: createRandomId(),
    email: 'a@b.com',
    name: 'John Doe',
    joinedAt: new Date('2023-01-01'),
  },
];

export const mockClubs: Club[] = [
  {
    id: createRandomId(),
    name: 'Science Club',
    description: 'Exploring scientific discoveries and conducting experiments',
    members: mockMembers,
    projects: mockProjects,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
    category: 'Science',
    meetingSchedule: 'Every Wednesday at 2PM',
    president: 'John Doe',
    teacher: 'Jane Smith',
    secretary: 'Jane Doe',
  },
  {
    id: createRandomId(),
    name: 'Debate Club',
    description: 'Developing public speaking and argumentation skills',
    members: [],
    projects: [],
    createdAt: new Date('2023-01-02'),
    updatedAt: new Date('2023-01-02'),
    category: 'Social',
    meetingSchedule: 'Every Thursday at 3PM',
    president: 'John Doe',
    teacher: 'Jane Smith',
    secretary: 'Jane Doe',
  },
];
