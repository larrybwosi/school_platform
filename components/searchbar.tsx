'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useTransition } from 'react'
import { Input } from "@/components/ui/input"
import { useDebouncedCallback } from 'use-debounce'

export function SearchBar({ defaultValue = '' }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set('search', term)
    } else {
      params.delete('search')
    }
    params.set('page', '1') // Reset to first page on new search
    startTransition(() => {
      router.push(`?${params.toString()}`)
    })
  }, 300)

  return (
    <Input
      type="text"
      placeholder="Search books..."
      defaultValue={defaultValue}
      onChange={(e) => handleSearch(e.target.value)}
      className="max-w-xs"
    />
  )
}

