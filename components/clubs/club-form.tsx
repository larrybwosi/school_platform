"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
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

const clubSchema = z.object({
  name: z.string().min(2).max(50),
  category: z.enum(["Academic", "Arts", "Sports", "Technical", "Cultural"]),
  capacity: z.number().min(5).max(200),
  description: z.string().min(10).max(500),
  meetingFrequency: z.string().min(2),
  requirements: z.string(),
});

export function ClubForm() {
  const form = useForm<z.infer<typeof clubSchema>>({
    resolver: zodResolver(clubSchema),
    defaultValues: {
      name: "",
      description: "",
      capacity: 30,
      meetingFrequency: "",
      requirements: "",
    },
  });

  async function onSubmit(values: z.infer<typeof clubSchema>) {
    try {
      // TODO: Implement club creation logic
      console.log(values);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Club Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter club name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Academic">Academic</SelectItem>
                  <SelectItem value="Arts">Arts</SelectItem>
                  <SelectItem value="Sports">Sports</SelectItem>
                  <SelectItem value="Technical">Technical</SelectItem>
                  <SelectItem value="Cultural">Cultural</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="capacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maximum Capacity</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter maximum members"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter club description"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="meetingFrequency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meeting Frequency</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Every Monday at 3 PM" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="requirements"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Requirements</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter membership requirements"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          <Button type="submit">Create Club</Button>
        </div>
      </form>
    </Form>
  );
}