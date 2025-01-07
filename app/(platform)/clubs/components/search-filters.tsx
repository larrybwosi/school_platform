"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Book, Camera, Code, Globe, Heart, Microscope, Music, Palette, Radio, Search, Trophy } from "lucide-react";

const categories = [
  { name: "All Categories", icon: Globe },
  { name: "Technology", icon: Code },
  { name: "Arts", icon: Palette },
  { name: "Science", icon: Microscope },
  { name: "Music", icon: Music },
  { name: "Literature", icon: Book },
  { name: "Sports", icon: Trophy },
  { name: "Photography", icon: Camera },
  { name: "Broadcasting", icon: Radio },
  { name: "Volunteering", icon: Heart },
];

export function SearchFilters({ searchParams }:any) {

  const router = useRouter();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search clubs..."
          className="pl-10"
          value={searchParams.search ?? ""}
          onChange={(e) =>
            router.push(`/clubs?${createQueryString("search", e.target.value)}`)
          }
        />
      </div>

      <Select
        value={searchParams.category ?? "All Categories"}
        onValueChange={(value) =>
          router.push(`/clubs?${createQueryString("category", value)}`)
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <SelectItem key={category.name} value={category.name}>
                <div className="flex items-center gap-2">
                  <Icon />
                  <span>{category.name}</span>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>

      <Select
        value={searchParams.sort ?? "popular"}
        onValueChange={(value) =>
          router.push(`/clubs?${createQueryString("sort", value)}`)
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="popular">Most Popular</SelectItem>
          <SelectItem value="newest">Newest First</SelectItem>
          <SelectItem value="oldest">Oldest First</SelectItem>
          <SelectItem value="members">Most Members</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
