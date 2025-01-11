
export interface Teacher {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  department: string;
  subjects: string[];
  status: string;
}

export type EntityType = "student" | "teacher";

export interface TableFiltersProps {
  onSearch: (term: string) => void;
  onGroupBy: (value: string) => void;
  groupByOptions: { value: string; label: string }[];
  showSelectionToggle: boolean;
  onToggleSelection: (value: boolean) => void;
}

export interface EntityRowProps {
  data: Student | Teacher;
  type: EntityType;
  onEdit: (id: string, data: Partial<Student | Teacher>) => void;
  onToggleSelection: (id: string) => void;
  isSelected: boolean;
  showCheckbox: boolean;
  colorScheme?: string;
  editableFields: string[];
  canEdit?: boolean;
  index: number;
}

export interface TableWrapperProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export interface StudentTableProps {
  students: Student[];
  onEdit: (id: string, data: Partial<Student>) => void;
  colorScheme?: string;
}

export interface TeacherTableProps {
  teachers: Teacher[];
  onEdit: (id: string, data: Partial<Teacher>) => void;
  colorScheme?: string;
}
