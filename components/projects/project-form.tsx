"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createProject } from "@/lib/actions/projects";
import { useRouter } from "next/navigation";

const projectSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10).max(1000),
  type: z.enum(['research', 'development', 'creative']),
  visibility: z.enum(['public', 'private', 'team-only']),
  priority: z.enum(['low', 'medium', 'high', 'critical']),
  startDate: z.string(),
  endDate: z.string(),
  budget: z.number().min(0),
  objectives: z.array(z.string()),
});

export function ProjectForm() {
  const { toast } = useToast();
  const router = useRouter();
  
  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "development",
      visibility: "team-only",
      priority: "medium",
      startDate: "",
      endDate: "",
      budget: 0,
      objectives: [],
    },
  });

  async function onSubmit(values: z.infer<typeof projectSchema>) {
    try {
      const result = await createProject(values);
      
      if (result.success) {
        toast({
          title: "Success",
          description: "Project created successfully",
        });
        router.push('/projects');
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  }

  // Rest of the form JSX remains the same
}