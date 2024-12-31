'use client'

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const orderOptions = [
  { value: "title", label: "Title" },
  { value: "author", label: "Author" },
  { value: "category", label: "Category" },
];

export function OrderBySelect({ defaultValue = "title" }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleOrderChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("orderBy", value);
    params.set("page", "1"); // Reset to first page on order change
    router.push(`?${params.toString()}`);
  };

  return (
    <Select defaultValue={defaultValue} onValueChange={handleOrderChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Order by" />
      </SelectTrigger>
      <SelectContent>
        {orderOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

