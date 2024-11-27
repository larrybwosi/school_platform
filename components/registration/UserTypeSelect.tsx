import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function UserTypeSelect({ userType, setUserType }) {
  return (
    <FormField
      name="role"
      render={({ field }) => (
        <FormItem>
          <FormLabel>User Type</FormLabel>
          <Select
            onValueChange={(value) => {
              field.onChange(value)
              setUserType(value as "Student" | "Teacher" | "Staff")
            }}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select user type" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="Student">Student</SelectItem>
              <SelectItem value="Teacher">Teacher</SelectItem>
              <SelectItem value="Administrative Staff">Administrative Staff</SelectItem>
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  )
}

