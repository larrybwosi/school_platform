"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
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

const advancedSettingsSchema = z.object({
  maxEventsPerClub: z.number().min(1).max(50),
  eventCapacityLimit: z.number().min(5).max(500),
  autoArchiveInactiveClubs: z.boolean(),
  inactivityThreshold: z.number().min(30).max(365),
  dataRetentionPeriod: z.string(),
  enableWaitlist: z.boolean(),
  waitlistLimit: z.number().min(5).max(100),
});

export function AdvancedSettings() {
  const form = useForm<z.infer<typeof advancedSettingsSchema>>({
    resolver: zodResolver(advancedSettingsSchema),
    defaultValues: {
      maxEventsPerClub: 10,
      eventCapacityLimit: 100,
      autoArchiveInactiveClubs: false,
      inactivityThreshold: 90,
      dataRetentionPeriod: "1-year",
      enableWaitlist: true,
      waitlistLimit: 20,
    },
  });

  function onSubmit(values: z.infer<typeof advancedSettingsSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="maxEventsPerClub"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maximum Events per Club</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormDescription>
                Maximum number of active events a club can have at once
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="eventCapacityLimit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Capacity Limit</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormDescription>
                Maximum number of participants per event
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dataRetentionPeriod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data Retention Period</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select retention period" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="6-months">6 Months</SelectItem>
                  <SelectItem value="1-year">1 Year</SelectItem>
                  <SelectItem value="2-years">2 Years</SelectItem>
                  <SelectItem value="indefinite">Indefinite</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                How long to keep historical data
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="autoArchiveInactiveClubs"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Auto-Archive Inactive Clubs</FormLabel>
                <FormDescription>
                  Automatically archive clubs with no activity
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="inactivityThreshold"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Inactivity Threshold (days)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormDescription>
                Days of inactivity before auto-archiving
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="enableWaitlist"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Enable Waitlist</FormLabel>
                <FormDescription>
                  Allow students to join waitlists for full clubs/events
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="waitlistLimit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Waitlist Limit</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormDescription>
                Maximum number of students on a waitlist
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Save Advanced Settings</Button>
      </form>
    </Form>
  );
}