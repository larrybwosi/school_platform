import Image from 'next/image'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function FeaturedBooks({ books }) {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-8">Featured Books</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <Card key={book._id} className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
            <Image
              src={book.coverImage || "https://source.unsplash.com/random/800x600?book"}
              alt={book.title}
              width={800}
              height={600}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <CardHeader>
              <CardTitle className="text-lg line-clamp-1">{book.title}</CardTitle>
              <CardDescription className="line-clamp-1">{book.author}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-semibold">Category:</span> {book.category}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">ISBN:</span> {book.isbn}
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View Details</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}

