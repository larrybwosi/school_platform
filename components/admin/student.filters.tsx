import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select"

interface StudentFiltersProps {
  filters: {
    grade: string
    stream: string
    status: string
  }
  setFilters: (filters: {
    grade: string
    stream: string
    status: string
  }) => void
}

export default function StudentFilters({ filters, setFilters }: StudentFiltersProps) {
  return (
    <div className="flex flex-wrap gap-4">
      <Select
        value={filters.grade}
        onValueChange={(value) => setFilters({ ...filters, grade: value })}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Grade" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Grades</SelectItem>
          {[9, 10, 11, 12].map((grade) => (
            <SelectItem key={grade} value={grade.toString()}>
              Grade {grade}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={filters.stream}
        onValueChange={(value) => setFilters({ ...filters, stream: value })}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Stream" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Streams</SelectItem>
          <SelectItem value="science">Science</SelectItem>
          <SelectItem value="commerce">Commerce</SelectItem>
          <SelectItem value="arts">Arts</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={filters.status}
        onValueChange={(value) => setFilters({ ...filters, status: value })}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Statuses</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
          <SelectItem value="suspended">Suspended</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

