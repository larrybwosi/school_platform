import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { DatePickerWithRange } from "@/components/ui/date-picker"
import { mockData } from "@/lib/mockData"
import { Separator } from "@/components/ui/separator"

export function StudentFields() {
  return (
    <div className="space-y-6">
      {/* Personal Information Section */}
      <div>
        <h3 className="text-lg font-medium">Personal Information</h3>
        <Separator className="my-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            name="personalInfo.dateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <DatePickerWithRange {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            name="personalInfo.gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="personalInfo.bloodGroup"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blood Group</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood group" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {mockData.bloodGroups.map((group) => (
                      <SelectItem key={group} value={group}>
                        {group}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="personalInfo.religion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Religion (Optional)</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select religion" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {mockData.religions.map((religion) => (
                      <SelectItem key={religion} value={religion}>
                        {religion}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="personalInfo.address"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Enter your address" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="personalInfo.healthConditions"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Health Conditions (Optional)</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="List any health conditions or allergies" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Academic Information Section */}
      <div>
        <h3 className="text-lg font-medium">Academic Information</h3>
        <Separator className="my-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            name="academicInfo.grade"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Grade</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a grade" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {mockData.grades.map((grade) => (
                      <SelectItem key={grade} value={grade}>
                        {grade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="academicInfo.previousInstitution"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Previous Institution</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter previous school name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Core Subjects */}
        <div className="mt-4">
          <FormField
            name="academicInfo.subjects.core"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Core Subjects</FormLabel>
                  <FormDescription>
                    These subjects are mandatory for all students.
                  </FormDescription>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {mockData.subjects.core.map((subject) => (
                    <FormItem
                      key={subject}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox checked disabled />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {subject}
                      </FormLabel>
                    </FormItem>
                  ))}
                </div>
              </FormItem>
            )}
          />
        </div>

        {/* Optional Subjects */}
        <div className="mt-4">
          <FormField
            name="academicInfo.subjects.optional"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Optional Subjects</FormLabel>
                  <FormDescription>
                    Select additional subjects you would like to study.
                  </FormDescription>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {mockData.subjects.optional.map((subject) => (
                    <FormField
                      key={subject}
                      name="academicInfo.subjects.optional"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={subject}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(subject)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...(field.value || []), subject])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value: string) => value !== subject
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {subject}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Guardian Information Section */}
      <div>
        <h3 className="text-lg font-medium">Guardian Information</h3>
        <Separator className="my-4" />
        <div className="space-y-4">
          {/* Primary Guardian */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              name="guardianInfo.primary.name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary Guardian Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter guardian's full name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="guardianInfo.primary.relationship"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Relationship</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select relationship" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {mockData.relationships.map((rel) => (
                        <SelectItem key={rel} value={rel}>
                          {rel}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="guardianInfo.primary.phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input {...field} type="tel" placeholder="Enter phone number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="guardianInfo.primary.email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" placeholder="Enter email address" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="guardianInfo.primary.occupation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Occupation</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter occupation" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="guardianInfo.primary.address"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Enter guardian's address" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
