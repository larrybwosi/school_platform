import { Input } from "@/components/ui/input"

export function Search({ value, onChange }) {
  return (
    <div>
      <Input
        type="search"
        placeholder="Search students..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="md:w-[100px] lg:w-[300px]"
      />
    </div>
  )
}
