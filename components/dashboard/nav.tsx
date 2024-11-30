import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";

interface NavProps {
  setOpen?: (open: boolean) => void;
}

export function DashboardNav({ setOpen }: NavProps) {
  const pathname = usePathname();

  const routes = [
    {
      href: "/dashboard",
      label: "Overview",
      icon: LayoutDashboard,
    },
    {
      href: "/dashboard/students",
      label: "Students",
      icon: GraduationCap,
    },
    {
      href: "/dashboard/teachers",
      label: "Teachers",
      icon: Users,
    },
    {
      href: "/dashboard/courses",
      label: "Courses",
      icon: BookOpen,
    },
    {
      href: "/dashboard/reports",
      label: "Reports",
      icon: BarChart3,
    },
    {
      href: "/dashboard/settings",
      label: "Settings",
      icon: Settings,
    },
  ];

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <div className="hidden lg:flex">
        {routes.map((route) => {
          const Icon = route.icon;
          return (
            <Link
              key={route.href}
              href={route.href}
              onClick={() => {
                if (setOpen) setOpen(false);
              }}
              className={cn(
                "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
                pathname === route.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{route.label}</span>
            </Link>
          );
        })}
      </div>
      <div className="flex lg:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-44">
            {routes.map((route) => {
              const Icon = route.icon;
              return (
                <DropdownMenuItem
                  key={route.href}
                  onClick={() => {
                    if (setOpen) setOpen(false);
                  }}
                >
                  <Link href={route.href}>
                    <Icon className="h-4 w-4" />
                    <span>{route.label}</span>
                  </Link>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}