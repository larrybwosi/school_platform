import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHead,
  TableBody,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Edit2,
  MoreVertical,
  FileText,
  Mail,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { EntityRowProps, StudentTableProps, TableFiltersProps, TableWrapperProps } from "@/types/row";


const ROLES = ["teacher", "admin", "head_of_department"];
const SUBJECTS = [
  "Mathematics",
  "English",
  "Science",
  "History",
  "Geography",
  "Physics",
  "Chemistry",
  "Biology",
];
const STREAMS = ["Science", "Arts", "Commerce"];
const STATUSES = ["active", "inactive", "suspended"];
const GRADES = Array.from({ length: 12 }, (_, i) => `${i + 1}`);
const DEPARTMENTS = ["Science", "Languages", "Humanities", "Arts"];

const TableFilters: React.FC<TableFiltersProps> = ({
  onSearch,
  onGroupBy,
  groupByOptions,
  showSelectionToggle,
  onToggleSelection,
}) => {
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 flex-1">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search..."
                onChange={(e) => onSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select onValueChange={onGroupBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Group by..." />
              </SelectTrigger>
              <SelectContent>
                {/* {groupByOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))} */}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Checkbox
                id="show-selection"
                checked={showSelectionToggle}
                onCheckedChange={onToggleSelection}
              />
              <Label htmlFor="show-selection">Enable Selection</Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
const TableWrapper : React.FC<TableWrapperProps> = ({ title, description, children }) => {
  return (
    <Card className="dark:bg-zinc-900">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

const EntityRow: React.FC<EntityRowProps> = ({
  data,
  type,
  onEdit,
  onToggleSelection,
  isSelected,
  showCheckbox = false,
  colorScheme = "default",
  editableFields = [],
  canEdit = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedData, setEditedData] = useState({});

  const getColorScheme = () => {
    const baseStyle = "transition-colors duration-200  dark:bg-zinc-900";
    switch (colorScheme) {
      case "blue":
        return cn(baseStyle, "hover:bg-blue-50/80 dark:hover:bg-blue-900/20");
      case "green":
        return cn(baseStyle, "hover:bg-green-50/80 dark:hover:bg-green-900/20");
      case "red":
        return cn(baseStyle, "hover:bg-red-50/80 dark:hover:bg-red-900/20");
      case "purple":
        return cn(
          baseStyle,
          "hover:bg-purple-50/80 dark:hover:bg-purple-900/20"
        );
      default:
        return cn(baseStyle, "hover:bg-muted/50");
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      case "suspended":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getMetricColor = (value) => {
    const num = parseFloat(value);
    if (num >= 90) return "text-green-600 dark:text-green-400";
    if (num >= 80) return "text-blue-600 dark:text-blue-400";
    if (num >= 70) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const handleEditSubmit = () => {
    onEdit(data.id, editedData);
    setIsEditDialogOpen(false);
    setEditedData({});
  };

  return (
    <>
      <TableRow
        className={cn(
          "group",
          getColorScheme(),
          isExpanded && "bg-muted/50  mb-2"
        )}
      >
        {showCheckbox && (
          <TableCell className="w-[50px]">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onToggleSelection(data.id)}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
          </TableCell>
        )}

        <TableCell>
          <div className="flex items-center mb-2 gap-3 space-y-1">
            <Avatar className="h-10 w-10 border-2 border-primary/10">
              <AvatarImage src={data.avatar} alt={data.name} />
              <AvatarFallback className="font-medium">
                {data.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold text-sm">{data.name}</p>
              <p className="text-sm text-muted-foreground">{data.email}</p>
            </div>
          </div>
        </TableCell>

        {type === "student" ? (
          <>
            <TableCell className="hidden sm:table-cell">
              <Badge variant="outline" className="font-medium">
                Grade {data.grade}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "font-medium",
                    getMetricColor(data.averageGrade)
                  )}
                >
                  {typeof data.averageGrade === "number"
                    ? `${data.averageGrade.toFixed(1)}%`
                    : "N/A"}
                </span>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </div>
            </TableCell>
            <TableCell className="hidden lg:table-cell">
              {data.stream}
            </TableCell>
          </>
        ) : (
          <>
            <TableCell className="hidden md:table-cell">
              <Badge
                variant="outline"
                className={cn(
                  "capitalize font-medium",
                  data.role === "admin" &&
                    "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                )}
              >
                {data.role}
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <div className="flex flex-wrap gap-1">
                {data.subjects?.map((subject, index) => (
                  <Badge key={index} variant="outline" className="font-medium">
                    {subject}
                  </Badge>
                ))}
              </div>
            </TableCell>
          </>
        )}

        <TableCell className="hidden xl:table-cell">
          <Badge className={cn("capitalize", getStatusColor(data.status))}>
            {data.status}
          </Badge>
        </TableCell>

        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              {canEdit && (
                <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                  <Edit2 className="mr-2 h-4 w-4" />
                  Edit {type === "student" ? "Student" : "Teacher"}
                </DropdownMenuItem>
              )}
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" />
                View Report
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Mail className="mr-2 h-4 w-4" />
                Send Message
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Edit {type === "student" ? "Student" : "Teacher"}
            </DialogTitle>
            <DialogDescription>
              Make changes to the information below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {editableFields.map((field) => (
              <div key={field} className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor={field} className="text-right capitalize">
                  {field}
                </Label>
                <Input
                  id={field}
                  value={editedData[field] || data[field] || ""}
                  onChange={(e) =>
                    setEditedData({ ...editedData, [field]: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button onClick={handleEditSubmit}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

// Student Table Component
const StudentTable: React.FC<StudentTableProps> = ({
  students,
  onEdit,
  colorScheme = "default",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [groupBy, setGroupBy] = useState("");
  const [showCheckbox, setShowCheckbox] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  const filteredStudents = useMemo(() => {
    return students.filter((student) =>
      Object.values(student).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [students, searchTerm]);

  const groupedStudents = useMemo(() => {
    if (!groupBy) return { "All Students": filteredStudents };

    return filteredStudents.reduce((acc, student) => {
      const key = student[groupBy] || "Unspecified";
      if (!acc[key]) acc[key] = [];
      acc[key].push(student);
      return acc;
    }, {});
  }, [filteredStudents, groupBy]);

  const groupByOptions = [
    { value: "", label: "No Grouping" },
    { value: "grade", label: "Grade" },
    { value: "stream", label: "Stream" },
    { value: "status", label: "Status" },
  ];

  return (
    <div className="space-y-4 dark:bg-zinc-900">
      <TableFilters
        onSearch={setSearchTerm}
        onGroupBy={setGroupBy}
        groupByOptions={groupByOptions}
        showSelectionToggle={showCheckbox}
        onToggleSelection={setShowCheckbox}
      />
      {Object.entries(groupedStudents).map(([group, groupStudents]) => (
        <TableWrapper
          key={group}
          title={group}
          description={`${groupStudents.length} student${
            groupStudents.length === 1 ? "" : "s"
          }`}
        >
          <Table>
            <TableHeader>
              <TableRow>
                {showCheckbox && (
                  <TableHead className="w-[50px]">Select</TableHead>
                )}
                <TableHead>Student</TableHead>
                <TableHead className="hidden sm:table-cell">Grade</TableHead>
                <TableHead>Average</TableHead>
                <TableHead className="hidden lg:table-cell">Stream</TableHead>
                <TableHead className="hidden xl:table-cell">Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {groupStudents.map((student, index) => (
                <EntityRow
                  key={student.id}
                  data={student}
                  type="student"
                  onEdit={onEdit}
                  colorScheme={colorScheme}
                  showCheckbox={showCheckbox}
                  isSelected={selectedIds.includes(student.id)}
                  onToggleSelection={(id) => {
                    setSelectedIds((prev) =>
                      prev.includes(id)
                        ? prev.filter((item) => item !== id)
                        : [...prev, id]
                    );
                  }}
                  editableFields={[
                    "name",
                    "email",
                    "grade",
                    "stream",
                    "status",
                  ]}
                  index={index}
                />
              ))}
            </TableBody>
          </Table>
        </TableWrapper>
      ))}
    </div>
  );
};


const TeacherTable = ({
  teachers,
  onEdit,
  colorScheme = "default",
  showCheckbox = false,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {showCheckbox && <TableHead className="w-[50px]">Select</TableHead>}
          <TableHead>Teacher</TableHead>
          <TableHead className="hidden md:table-cell">Role</TableHead>
          <TableHead className="hidden md:table-cell">Subjects</TableHead>
          <TableHead className="hidden xl:table-cell">Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {teachers.map((teacher) => (
          <EntityRow
            key={teacher.id}
            data={teacher}
            type="teacher"
            onEdit={onEdit}
            colorScheme={colorScheme}
            showCheckbox={showCheckbox}
            editableFields={["name", "email", "role", "department", "subjects"]}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export { StudentTable, TeacherTable, EntityRow };
