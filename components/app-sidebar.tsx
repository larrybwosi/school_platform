"use client"
import { DatePicker } from "@/components/date-picker"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { NavSecondary } from "@/components/nav-secondary"
import { NavProjects } from "@/components/nav-projects"
import { navigationConfig } from "@/lib/navigation"
import { NavMain } from "@/components/nav-main"
import { ModeToggle } from "./mode-toggle"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar> ) {
  return (
    <Sidebar {...props} className="w-fit sidebar-hide-scrollbar">
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <NavUser user={navigationConfig.user} />
      </SidebarHeader>
      <SidebarContent>
        <DatePicker />
        <SidebarSeparator className="mx-0" />

        <SidebarContent>
          <NavMain items={navigationConfig.navMain} />
          <NavProjects projects={navigationConfig.projects} />
          <NavSecondary items={navigationConfig.navSecondary} className="mt-auto" />
        </SidebarContent>
        <ModeToggle />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
