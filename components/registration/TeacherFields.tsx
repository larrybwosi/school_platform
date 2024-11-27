import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { mockData } from "@/lib/mockData"

export function TeacherFields() {
  return (
    <>
      <FormField
        name="subjects"
        render={() => (
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-base">Subjects</FormLabel>
              <FormDescription>
                Select the subjects you can teach.
              </FormDescription>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {[...mockData.subjects.core, ...mockData.subjects.optional].map((item) => (
                <FormField
                  key={item}
                  name="subjects"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...(field.value || []), item])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item
                                    )
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="qualifications"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Qualifications</FormLabel>
            <FormControl>
              <Textarea placeholder="B.Ed., M.Ed., Ph.D. in Education" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="yearsOfExperience"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Years of Experience</FormLabel>
            <FormControl>
              <Input type="number" {...field} onChange={e => field.onChange(+e.target.value)} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}

