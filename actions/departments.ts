
import { Department, mockDepartments } from '@/lib/mockData'
import { revalidatePath } from 'next/cache'
import { connection } from 'next/server'

// Mock database operations
let departments: Department[] = []

export async function getDepartments(): Promise<Department[]> {
  await connection();
  return mockDepartments
}

export async function getDepartmentById(id: number): Promise<Department | undefined> {
  await connection();
  return mockDepartments.find(dept => dept.id === id)
}

export async function addDepartment(department: Omit<Department, 'id' | 'createdAt' | 'updatedAt'>): Promise<Department> {
  await connection();
  const newDepartment: Department = {
    ...department,
    id: mockDepartments.length + 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  departments.push(newDepartment)
  revalidatePath('/departments')
  return newDepartment
}

export async function updateDepartment(id: number, departmentData: Partial<Department>): Promise<Department | null> {
  await connection();
  const index = departments.findIndex(dept => dept.id === id)
  if (index === -1) return null

  const updatedDepartment: Department = {
    ...departments[index],
    ...departmentData,
    updatedAt: new Date(),
  }
  departments[index] = updatedDepartment
  revalidatePath('/departments')
  return updatedDepartment
}

export async function deleteDepartment(id: number): Promise<boolean> {
  await connection();
  const initialLength = departments.length
  departments = departments.filter(dept => dept.id !== id)
  revalidatePath('/departments')
  return initialLength > departments.length
}

