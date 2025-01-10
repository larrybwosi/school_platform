'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { addCourse } from '@/lib/actions'

interface Teacher {
  id: number;
  name: string;
}

interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  teachers: Teacher[];
}

export function AddCourseModal({ isOpen, onClose, teachers = [] }: AddCourseModalProps) {
  const [courseData, setCourseData] = useState({
    name: '',
    code: '',
    semester: '',
    credits: '',
    teacher: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await addCourse(courseData)
      onClose()
      // You might want to refresh the courses list here
    } catch (error) {
      console.error('Error adding course:', error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] w-[95vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Course</DialogTitle>
          <DialogDescription>
            Enter the details for the new course.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {['name', 'code', 'semester', 'credits', 'teacher'].map((field) => (
              <div key={field} className="grid sm:grid-cols-4 items-center gap-4">
                <Label htmlFor={field} className="sm:text-right">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </Label>
                {field === 'teacher' ? (
                  <Select
                    onValueChange={(value) => setCourseData({ ...courseData, teacher: value })}
                  >
                    <SelectTrigger className="sm:col-span-3">
                      <SelectValue placeholder="Select a teacher" />
                    </SelectTrigger>
                    <SelectContent>
                      {teachers && teachers.length > 0 ? (
                        teachers.map((teacher) => (
                          <SelectItem key={teacher.id} value={teacher.id.toString()}>
                            {teacher.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="no-teachers">No teachers available</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id={field}
                    value={courseData[field]}
                    onChange={(e) => setCourseData({ ...courseData, [field]: e.target.value })}
                    className="sm:col-span-3"
                    type={field === 'semester' || field === 'credits' ? 'number' : 'text'}
                  />
                )}
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button type="submit">Add Course</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

