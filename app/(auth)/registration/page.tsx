"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { UserTypeSelect } from "@/components/registration/UserTypeSelect"
import { BaseInfoFields } from "@/components/registration/BaseInfoFields"
import { StudentFields } from "@/components/registration/StudentFields"
import { TeacherFields } from "@/components/registration/TeacherFields"
import { StaffFields } from "@/components/registration/StaffFields"
import { baseSchema, studentSchema, teacherSchema, staffSchema } from "@/lib/validations"

type FormSchema = z.infer<typeof studentSchema> | z.infer<typeof teacherSchema> | z.infer<typeof staffSchema>

export default function RegistrationPage() {
  const [userType, setUserType] = useState<"Student" | "Teacher" | "Staff">("Student")

  const form = useForm<FormSchema>({
    resolver: zodResolver(
      userType === "Student"
        ? studentSchema
        : userType === "Teacher"
        ? teacherSchema
        : staffSchema
    ),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      dateOfBirth: "",
      address: "",
      emergencyContact: "",
      role: "Student",
    },
  })

  function onSubmit(values: FormSchema) {
    console.log(values)
    // Here you would typically send the data to your backend
    alert("Registration submitted successfully!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-blue-600 py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white text-center">Registration</h1>
        </div>
        <div className="p-6 sm:p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <UserTypeSelect userType={userType} setUserType={setUserType} />
              <BaseInfoFields />
              {userType === "Student" && <StudentFields />}
              {userType === "Teacher" && <TeacherFields />}
              {userType === "Staff" && <StaffFields />}
              <Button type="submit" className="w-full">Submit Registration</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
