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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"

type FormSchema = z.infer<typeof studentSchema> | z.infer<typeof teacherSchema> | z.infer<typeof staffSchema>

export default function RegistrationPage() {
  const [userType, setUserType] = useState<"Student" | "Teacher" | "Staff">("Student")
  const { toast } = useToast()

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
    
    toast({
      title: "Registration Submitted",
      description: "Your registration has been submitted successfully!",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br py-2 px-2 sm:px-2 lg:px-4 flex items-center justify-center">
      <Card className="w-full mx-auto">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardTitle className="text-3xl font-bold text-center">Registration</CardTitle>
          <CardDescription className="text-center text-blue-100">
            Join our educational community by completing the registration form below
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 sm:p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">User Type</h2>
                <p className="text-gray-600 dark:text-gray-400">Select your role in the educational system</p>
                <UserTypeSelect userType={userType} setUserType={setUserType} />
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Basic Information</h2>
                <p className="text-gray-600 dark:text-gray-400">Please provide your personal details</p>
                <BaseInfoFields />
              </div>

              {userType === "Student" && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-gray-800  dark:text-white">Student Information</h2>
                  <p className="text-gray-600 dark:text-gray-400">Additional details required for student registration</p>
                  <StudentFields />
                </div>
              )}

              {userType === "Teacher" && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Teacher Information</h2>
                  <p className="text-gray-600 dark:text-gray-400">Additional details required for teacher registration</p>
                  <TeacherFields />
                </div>
              )}

              {userType === "Staff" && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Staff Information</h2>
                  <p className="text-gray-600 dark:text-gray-400">Additional details required for staff registration</p>
                  <StaffFields />
                </div>
              )}

              <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
                Submit Registration
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  )
}

