'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Department } from '@/lib/mockData'
import { getDepartmentById, updateDepartment, deleteDepartment } from '@/actions/departments'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'

export default function DepartmentPage() {
  const params = useParams()
  const router = useRouter()
  const [department, setDepartment] = useState<Department | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const fetchDepartment = async () => {
      const dept = await getDepartmentById(Number(params.id))
      setDepartment(dept || null)
    }
    fetchDepartment()
  }, [params.id])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setDepartment(prev => prev ? { ...prev, [name]: value } : null)
  }

  const handleArrayInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'subjects' | 'teachers') => {
    const values = e.target.value.split(',').map(item => item.trim())
    setDepartment(prev => prev ? { ...prev, [field]: values } : null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (department) {
      const updated = await updateDepartment(department.id, department)
      if (updated) {
        setIsEditing(false)
        toast({
          title: "Department Updated",
          description: "The department has been successfully updated.",
        })
      }
    }
  }

  const handleDelete = async () => {
    if (department && window.confirm('Are you sure you want to delete this department?')) {
      const deleted = await deleteDepartment(department.id)
      if (deleted) {
        router.push('/departments')
        toast({
          title: "Department Deleted",
          description: "The department has been successfully deleted.",
        })
      }
    }
  }

  if (!department) return <div>Loading...</div>

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? 'Edit Department' : department.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={department.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={department.description}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="head">Head</Label>
                <Input
                  id="head"
                  name="head"
                  value={department.head}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="assistant">Assistant</Label>
                <Input
                  id="assistant"
                  name="assistant"
                  value={department.assistant}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="subjects">Subjects (comma-separated)</Label>
                <Input
                  id="subjects"
                  name="subjects"
                  value={department.subjects.join(', ')}
                  onChange={(e) => handleArrayInputChange(e, 'subjects')}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="teachers">Teachers (comma-separated)</Label>
                <Input
                  id="teachers"
                  name="teachers"
                  value={department.teachers.join(', ')}
                  onChange={(e) => handleArrayInputChange(e, 'teachers')}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="budget">Budget</Label>
                <Input
                  id="budget"
                  name="budget"
                  type="number"
                  value={department.budget}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={department.location}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  value={department.contactEmail}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  value={''}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
            </div>
            {isEditing && (
              <Button type="submit" className="mt-4">Save Changes</Button>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)}>Edit</Button>
          )}
          <Button variant="destructive" onClick={handleDelete}>Delete Department</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

