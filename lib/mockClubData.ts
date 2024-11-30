import { Club, ClubMember, ClubProject, ClubRole, ProjectStatus } from '@/app/(platform)/clubs/types'

const generateMockMembers = (count: number, clubId: string): ClubMember[] => {
  const roles: ClubRole[] = ['TEACHER', 'PRESIDENT', 'SECRETARY', 'MEMBER']
  return Array.from({ length: count }, (_, i) => ({
    id: `member-${i + 1}`,
    userId: `user-${i + 1}`,
    clubId,
    name: `Member ${i + 1}`,
    email: `member${i + 1}@example.com`,
    role: roles[Math.floor(Math.random() * roles.length)],
    joinedAt: new Date(Date.now() - Math.random() * 10000000000),
    isStudent: Math.random() > 0.2,
  }))
}

const generateMockProjects = (count: number, clubId: string): ClubProject[] => {
  const statuses: ProjectStatus[] = ['NOT_STARTED', 'IN_PROGRESS', 'ON_HOLD', 'COMPLETED', 'CANCELLED']
  return Array.from({ length: count }, (_, i) => ({
    id: `project-${i + 1}`,
    clubId,
    name: `Project ${i + 1}`,
    description: `This is a description for Project ${i + 1}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    startDate: new Date(Date.now() - Math.random() * 10000000000),
    endDate: Math.random() > 0.5 ? new Date(Date.now() + Math.random() * 10000000000) : undefined,
    leadStudent: Math.random() > 0.5 ? `member-${Math.floor(Math.random() * 5) + 1}` : undefined,
    customFields: [
      { name: 'Budget', value: `$${Math.floor(Math.random() * 10000)}` },
      { name: 'Location', value: ['Online', 'School Hall', 'Community Center'][Math.floor(Math.random() * 3)] },
    ],
    milestones: Array.from({ length: 3 }, (_, j) => ({
      id: `milestone-${i + 1}-${j + 1}`,
      projectId: `project-${i + 1}`,
      title: `Milestone ${j + 1}`,
      description: `This is a description for Milestone ${j + 1}`,
      dueDate: new Date(Date.now() + Math.random() * 10000000000),
      status: statuses[Math.floor(Math.random() * statuses.length)] as ProjectStatus,
      completedAt: Math.random() > 0.5 ? new Date(Date.now() - Math.random() * 10000000000) : undefined,
      customFields: [
        { name: 'Assigned To', value: `Member ${Math.floor(Math.random() * 10) + 1}` },
      ],
      isCompleted: Math.random() > 0.5,
    })),
  }))
}

export const mockClubs: Club[] = [
  {
    id: '1',
    name: 'Science Club',
    description: 'Explore the wonders of science through experiments and discussions.',
    teacher: 'Dr. Smith',
    president: 'Alice Johnson',
    secretary: 'Bob Williams',
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-05-20'),
    category: 'Academic',
    meetingSchedule: 'Every Tuesday, 3:30 PM - 5:00 PM',
    members: generateMockMembers(15, '1'),
    projects: generateMockProjects(5, '1'),
  },
  {
    id: '2',
    name: 'Drama Club',
    description: 'Unleash your creativity through theatrical performances and workshops.',
    teacher: 'Ms. Davis',
    president: 'Tom Wilson',
    secretary: 'Emma Brown',
    createdAt: new Date('2023-02-01'),
    updatedAt: new Date('2023-06-10'),
    category: 'Arts',
    meetingSchedule: 'Every Wednesday and Friday, 4:00 PM - 6:00 PM',
    members: generateMockMembers(20, '2'),
    projects: generateMockProjects(3, '2'),
  },
  {
    id: '3',
    name: 'Debate Club',
    description: 'Sharpen your critical thinking and public speaking skills through debates.',
    teacher: 'Mr. Thompson',
    president: 'Emily Brown',
    secretary: 'David Lee',
    createdAt: new Date('2023-03-10'),
    updatedAt: new Date('2023-07-05'),
    category: 'Academic',
    meetingSchedule: 'Every Monday, 3:00 PM - 4:30 PM',
    members: generateMockMembers(12, '3'),
    projects: generateMockProjects(4, '3'),
  },
  {
    id: '4',
    name: 'Environmental Club',
    description: 'Work together to promote sustainability and environmental awareness.',
    teacher: 'Mrs. Green',
    president: 'Michael Lee',
    secretary: 'Sarah Johnson',
    createdAt: new Date('2023-04-05'),
    updatedAt: new Date('2023-08-15'),
    category: 'Service',
    meetingSchedule: 'Every Thursday, 3:30 PM - 5:00 PM',
    members: generateMockMembers(18, '4'),
    projects: generateMockProjects(6, '4'),
  },
  {
    id: '5',
    name: 'Robotics Club',
    description: 'Design, build, and program robots for competitions and exhibitions.',
    teacher: 'Dr. Rodriguez',
    president: 'Sarah Chen',
    secretary: 'James Wilson',
    createdAt: new Date('2023-05-20'),
    updatedAt: new Date('2023-09-01'),
    category: 'Technology',
    meetingSchedule: 'Every Tuesday and Thursday, 4:00 PM - 6:00 PM',
    members: generateMockMembers(25, '5'),
    projects: generateMockProjects(4, '5'),
  },
]

