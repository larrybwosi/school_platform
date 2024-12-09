"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { School } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const routes = [
    {
      href: "/clubs",
      label: "Clubs",
    },
    {
      href: "/events",
      label: "Events",
    },
    {
      href: "/dashboard",
      label: "Dashboard",
    },
  ];

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2">
          <School className="h-8 w-8" />
          <span className="font-bold text-xl">School Clubs</span>
        </Link>
        <div className="flex items-center space-x-6 ml-8">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === route.href
                  ? "text-black dark:text-white"
                  : "text-muted-foreground"
              )}
            >
              {route.label}
            </Link>
          ))}
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </nav>
  );
}