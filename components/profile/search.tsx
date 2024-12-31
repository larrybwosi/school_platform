'use client';
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation";

export function Search({ value, searchParams }) {
  const router = useRouter();
  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams);
    console.log(params)
    params.set("search", value);
    router.push(`?${params.toString()}`);
  };
  return (
    <div>
      <Input
        type="search"
        placeholder="Search students..."
        value={value}
        onChange={(e) => handleSearch(e.target.value)}
        className="md:w-[100px] lg:w-[300px]"
      />
    </div>
  );
}
