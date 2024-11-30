export interface Department {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DepartmentLeader {
  id: string;
  userId: string;
  departmentId: string;
  name: string;
  email: string;
  appointedAt: Date;
}

export interface DepartmentMember {
  id: string;
  userId: string;
  departmentId: string;
  name: string;
  email: string;
  role: string;
  joinedAt: Date;
}
