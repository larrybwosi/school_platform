import { Department, DepartmentLeader, DepartmentMember } from './types';

export const mockDepartments: Department[] = [
  {
    id: '1',
    name: 'Computer Science',
    description: 'Department focused on computer science and programming',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  },
  {
    id: '2',
    name: 'Mathematics',
    description: 'Department for mathematical sciences and research',
    createdAt: new Date('2023-01-02'),
    updatedAt: new Date('2023-01-02'),
  },
  {
    id: '3',
    name: 'Physics',
    description: 'Department dedicated to physics and physical sciences',
    createdAt: new Date('2023-01-03'),
    updatedAt: new Date('2023-01-03'),
  },
];

export const mockLeaders: DepartmentLeader[] = [
  {
    id: '1',
    userId: 'user1',
    departmentId: '1',
    name: 'Dr. John Smith',
    email: 'john.smith@school.edu',
    appointedAt: new Date('2023-01-01'),
  },
  {
    id: '2',
    userId: 'user2',
    departmentId: '2',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@school.edu',
    appointedAt: new Date('2023-01-02'),
  },
  {
    id: '3',
    userId: 'user3',
    departmentId: '3',
    name: 'Dr. Michael Brown',
    email: 'michael.brown@school.edu',
    appointedAt: new Date('2023-01-03'),
  },
];

export const mockMembers: DepartmentMember[] = [
  {
    id: '1',
    userId: 'user4',
    departmentId: '1',
    name: 'Alice Wilson',
    email: 'alice.wilson@school.edu',
    role: 'Professor',
    joinedAt: new Date('2023-02-01'),
  },
  {
    id: '2',
    userId: 'user5',
    departmentId: '1',
    name: 'Bob Anderson',
    email: 'bob.anderson@school.edu',
    role: 'Assistant Professor',
    joinedAt: new Date('2023-02-02'),
  },
  {
    id: '3',
    userId: 'user6',
    departmentId: '2',
    name: 'Carol Martinez',
    email: 'carol.martinez@school.edu',
    role: 'Professor',
    joinedAt: new Date('2023-02-03'),
  },
  {
    id: '4',
    userId: 'user7',
    departmentId: '3',
    name: 'David Lee',
    email: 'david.lee@school.edu',
    role: 'Associate Professor',
    joinedAt: new Date('2023-02-04'),
  },
];
