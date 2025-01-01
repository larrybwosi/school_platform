import { getBooks } from './mock-data'
import { LibraryHero } from '@/components/library-hero'
import { FeaturedBooks } from '@/components/featured-books'
import { BookCatalog } from '@/components/book-catalog'
import { LibraryInfo } from '@/components/library-info'
import { ThemeProvider } from '@/components/theme-provider'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
 
export default async function LibraryPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;

  const currentPage = Number(searchParams?.page) || 1;
  const searchTerm =
    typeof searchParams.search === "string" ? searchParams.search : "";
  const orderBy =
    typeof searchParams.search === "string" ? searchParams.search : "title";
  const pageSize = 30;

  const { books, pagination } = getBooks(currentPage, pageSize, orderBy);
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
        <LibraryHero />
        <div className="container mx-auto px-4 py-8">
          <FeaturedBooks books={books.slice(0, 4)} />
          <BookCatalog
            books={filteredBooks}
            searchTerm={searchTerm}
            orderBy={orderBy}
            pagination={pagination}
          />
          <LibraryInfo />
        </div>
      </div>
    </ThemeProvider>
  );
}

