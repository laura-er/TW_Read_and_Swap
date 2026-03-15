import { useState, useEffect } from 'react';
import { useBooks } from '@/hooks/useBooks';
import { useBooksFilter } from '@/hooks/useBooksFilter';
import { CatalogHeader } from '@/components/client/CatalogHeader';
import { CatalogFilters } from '@/components/client/CatalogFilters';
import { CatalogResultsBar } from '@/components/client/CatalogResultsBar';
import { BooksGrid } from '@/components/client/BooksGrid';
import { Pagination } from '@/components/client/Pagination';

const PAGE_SIZE = 9;

export function BookCatalogPage() {
  const { books } = useBooks();
  const [page, setPage] = useState(0);

  const {
    searchTerm,
    selectedGenre,
    selectedCondition,
    availableOnly,
    filteredBooks,
    setSearchTerm,
    setSelectedGenre,
    setSelectedCondition,
    toggleAvailableOnly,
    clearFilters,
  } = useBooksFilter(books);

  // Reset to page 0 when filters change
  useEffect(() => {
    setPage(0);
  }, [searchTerm, selectedGenre, selectedCondition, availableOnly]);

  const totalPages = Math.ceil(filteredBooks.length / PAGE_SIZE);
  const paginatedBooks = filteredBooks.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  function handleClearFilters() {
    clearFilters();
    setPage(0);
  }

  return (
      <main className="min-h-screen bg-(--color-bg) px-6 py-12 pt-10">
        <div className="container mx-auto max-w-7xl">
          <CatalogHeader totalBooks={books.length} />
          <CatalogFilters
              searchTerm={searchTerm}
              selectedGenre={selectedGenre}
              selectedCondition={selectedCondition}
              availableOnly={availableOnly}
              onSearchChange={setSearchTerm}
              onGenreChange={setSelectedGenre}
              onConditionChange={setSelectedCondition}
              onAvailableToggle={toggleAvailableOnly}
              onClearFilters={handleClearFilters}
          />
          <CatalogResultsBar
              filtered={filteredBooks.length}
              total={books.length}
              allBooks={books}
          />
          <BooksGrid books={paginatedBooks} onClearFilters={handleClearFilters} />
          <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
          />
        </div>
      </main>
  );
}
