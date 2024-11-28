import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFormContext } from "react-hook-form"

export function TeacherFields() {
  const { control } = useFormContext()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={control}
        name="subject"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Subject</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {["Mathematics", "Science", "English", "History", "Art"].map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="yearsOfExperience"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Years of Experience</FormLabel>
            <FormControl>
              <Input type="number" placeholder="5" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="qualifications"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Qualifications</FormLabel>
            <FormControl>
              <Input placeholder="B.Ed., M.Ed." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="teacherId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Teacher ID</FormLabel>
            <FormControl>
              <Input placeholder="T12345" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

