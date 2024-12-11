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
import { motion, AnimatePresence } from "framer-motion"
import { Check, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

type FormSchema = z.infer<typeof studentSchema> | z.infer<typeof teacherSchema> | z.infer<typeof staffSchema>

const steps = [
  { id: 1, name: "User Type" },
  { id: 2, name: "Basic Info" },
  { id: 3, name: "Role Details" },
  { id: 4, name: "Review" }
]

export default function RegistrationPage() {
  const [userType, setUserType] = useState<"Student" | "Teacher" | "Staff">("Student")
  const [currentStep, setCurrentStep] = useState(1)
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

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground transition-colors">Choose Your Role</h2>
              <p className="text-muted-foreground transition-colors">Select your role in the educational system</p>
            </div>
            <div className="w-full">
              <UserTypeSelect userType={userType} setUserType={setUserType} />
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground transition-colors">Basic Information</h2>
              <p className="text-muted-foreground transition-colors">Please provide your personal details</p>
            </div>
            <div className="w-full">
              <BaseInfoFields />
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground transition-colors">{userType} Information</h2>
              <p className="text-muted-foreground transition-colors">
                Additional details required for {userType.toLowerCase()} registration
              </p>
            </div>
            <div className="w-full">
              {userType === "Student" && <StudentFields />}
              {userType === "Teacher" && <TeacherFields />}
              {userType === "Staff" && <StaffFields />}
            </div>
          </div>
        )
      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground transition-colors">Review Your Information</h2>
              <p className="text-muted-foreground transition-colors">Please review your information before submitting</p>
            </div>
            <div className="grid gap-6 p-6 rounded-lg border bg-card text-card-foreground shadow-sm transition-colors">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="font-medium text-foreground transition-colors">Full Name</h3>
                  <p className="text-muted-foreground transition-colors">
                    {form.getValues("firstName")} {form.getValues("lastName")}
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-foreground transition-colors">Email</h3>
                  <p className="text-muted-foreground transition-colors">{form.getValues("email")}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-foreground transition-colors">Phone</h3>
                  <p className="text-muted-foreground transition-colors">{form.getValues("phoneNumber")}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-foreground transition-colors">Role</h3>
                  <p className="text-muted-foreground transition-colors">{userType}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-foreground transition-colors">Date of Birth</h3>
                  <p className="text-muted-foreground transition-colors">{form.getValues("dateOfBirth")}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-foreground transition-colors">Address</h3>
                  <p className="text-muted-foreground transition-colors">{form.getValues("address")}</p>
                </div>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background transition-colors duration-300">
      {/* Left side - Image */}
      <div className="hidden lg:block relative overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070"
          alt="Registration background"
          fill
          className="object-cover transition-opacity duration-300"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/40 flex items-center justify-center text-white dark:text-gray-900 p-12 transition-colors duration-300">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">Welcome to Horizon Academy</h1>
            <p className="text-lg opacity-90">
              Join our vibrant educational community and embark on a journey of learning, growth, and achievement.
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex items-center justify-center p-4 lg:p-8">
        <Card className="w-full max-w-4xl mx-auto border-border/40 bg-card transition-colors duration-300">
          <CardHeader className="space-y-6 transition-colors duration-300">
            <div className="space-y-2">
              <CardTitle className="text-3xl font-bold text-foreground transition-colors">Registration</CardTitle>
              <CardDescription className="text-muted-foreground transition-colors">
                Complete the form below to create your account
              </CardDescription>
            </div>
            {/* Progress Steps */}
            <div className="flex justify-between items-center">
              {steps.map((step) => (
                <div key={step.id} className="flex items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300
                      ${currentStep >= step.id 
                        ? 'bg-primary text-primary-foreground border-primary' 
                        : 'border-muted text-muted-foreground'
                      }`}
                  >
                    {currentStep > step.id ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <span className="text-sm">{step.id}</span>
                    )}
                  </div>
                  {step.id !== steps.length && (
                    <div 
                      className={`h-1 flex-1 mx-2 rounded transition-all duration-300 ${
                        currentStep > step.id ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="min-h-[400px]"
                  >
                    {renderStepContent()}
                  </motion.div>
                </AnimatePresence>

                <div className="flex justify-between pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="transition-colors duration-300"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                  
                  {currentStep === steps.length ? (
                    <Button 
                      type="submit"
                      className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300"
                    >
                      Complete Registration
                      <Check className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button 
                      type="button" 
                      onClick={nextStep}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300"
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
