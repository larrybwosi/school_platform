"use client"

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockTeachers, Teacher } from '@/lib/mockData'
import { motion } from 'framer-motion'
import { Plus, Edit, Save } from 'lucide-react'

export default function TeacherManagement() {
  const [teachers, setTeachers] = useState<Teacher[]>(mockTeachers)
  const [newTeacher, setNewTeacher] = useState<Partial<Teacher>>({ name: '', email: '', subjects: [] })
  const [editingId, setEditingId] = useState<string | null>(null)

  const handleAddTeacher = () => {
    if (newTeacher.name && newTeacher.email) {
      setTeachers([...teachers, { ...newTeacher, id: `T${teachers.length + 1}`, performanceIncrease: 0 } as Teacher])
      setNewTeacher({ name: '', email: '', subjects: [] })
    }
  }

  const handleUpdateTeacher = (id: string, field: keyof Teacher, value: string) => {
    setTeachers(teachers.map(teacher => 
      teacher.id === id ? { ...teacher, [field]: field === 'subjects' ? value.split(',') : value } : teacher
    ))
  }

  const handleEdit = (id: string) => {
    setEditingId(id)
  }

  const handleSave = () => {
    setEditingId(null)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Teacher Management</CardTitle>
          <CardDescription>Add, edit, and manage teacher information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              placeholder="Name"
              value={newTeacher.name}
              onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
            />
            <Input
              placeholder="Email"
              value={newTeacher.email}
              onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
            />
            <Input
              placeholder="Subjects (comma-separated)"
              value={newTeacher.subjects?.join(',')}
              onChange={(e) => setNewTeacher({ ...newTeacher, subjects: e.target.value.split(',') })}
            />
          
</div>
          <Button onClick={handleAddTeacher} className="mb-4 w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" /> Add Teacher
          </Button>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Subjects</TableHead>
                <TableHead>Performance Increase</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell>
                    {editingId === teacher.id ? (
                      <Input
                        value={teacher.name}
                        onChange={(e) => handleUpdateTeacher(teacher.id, 'name', e.target.value)}
                      />
                    ) : (
                      teacher.name
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === teacher.id ? (
                      <Input
                        value={teacher.email}
                        onChange={(e) => handleUpdateTeacher(teacher.id, 'email', e.target.value)}
                      />
                    ) : (
                      teacher.email
                    )}
                  </TableCell>
                  <TableCell>
                    {editingId === teacher.id ? (
                      <Input
                        value={teacher.subjects.join(',')}
                        onChange={(e) => handleUpdateTeacher(teacher.id, 'subjects', e.target.value)}
                      />
                    ) : (
                      teacher.subjects.join(', ')
                    )}
                  </TableCell>
                  <TableCell>{teacher.performanceIncrease}%</TableCell>
                  <TableCell>
                    {editingId === teacher.id ? (
                      <Button onClick={handleSave} size="sm" variant="outline">
                        <Save className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button onClick={() => handleEdit(teacher.id)} size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  )
}
