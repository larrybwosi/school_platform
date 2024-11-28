"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getStudents } from "@/actions/students"
import { Student } from "@/lib/mockData"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search } from 'lucide-react'
import AdminHeader from "@/components/admin/student.header"
import StudentFilters from "@/components/admin/student.filters"
import StudentTable from "@/components/admin/student.table"

export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortConfig, setSortConfig] = useState<{ key: keyof Student; direction: 'asc' | 'desc' } | null>(null)
  const [filters, setFilters] = useState({
    grade: '',
    stream: '',
    status: '',
  })

  const { data: students, isLoading, error } = useQuery<Student[]>({
    queryKey: ["students", currentPage, sortConfig, filters],
    queryFn: () => getStudents({ page: currentPage, sort: sortConfig, filters }),
  })

  const filteredStudents = students?.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {(error as Error).message}</div>

  return (
    <div className="space-y-4">
      <Card className="">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Student Management</CardTitle>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Student
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {/* <StudentFilters filters={filters} setFilters={setFilters} /> */}
          </div>
          <StudentTable 
            students={filteredStudents || []}
            sortConfig={sortConfig}
            setSortConfig={setSortConfig}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={10} // Replace with actual total pages
          />
        </CardContent>
      </Card>
    </div>
  )
}

