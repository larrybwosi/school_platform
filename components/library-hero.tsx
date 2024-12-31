import { Button } from "@/components/ui/button"
import Link from 'next/link'

export function LibraryHero() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Our School Library</h1>
        <p className="text-xl md:text-2xl mb-8">Explore our vast collection of books and resources</p>
        <Link href="/library/catalog">
          <Button size="lg" variant="secondary">Browse Catalog</Button>
        </Link>
      </div>
    </div>
  )
}

