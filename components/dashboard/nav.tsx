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
    </nav>
  );
}