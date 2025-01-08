'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { addCourse } from '../lib/actions'

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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Course</DialogTitle>
          <DialogDescription>
            Enter the details for the new course.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={courseData.name}
                onChange={(e) => setCourseData({ ...courseData, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="code" className="text-right">
                Code
              </Label>
              <Input
                id="code"
                value={courseData.code}
                onChange={(e) => setCourseData({ ...courseData, code: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="semester" className="text-right">
                Semester
              </Label>
              <Input
                id="semester"
                type="number"
                value={courseData.semester}
                onChange={(e) => setCourseData({ ...courseData, semester: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="credits" className="text-right">
                Credits
              </Label>
              <Input
                id="credits"
                type="number"
                value={courseData.credits}
                onChange={(e) => setCourseData({ ...courseData, credits: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="teacher" className="text-right">
                Teacher
              </Label>
              <Select
                onValueChange={(value) => setCourseData({ ...courseData, teacher: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a teacher" />
                </SelectTrigger>
                <SelectContent>
                  {teachers.map((teacher) => (
                    <SelectItem key={teacher.id} value={teacher.id.toString()}>
                      {teacher.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Course</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

