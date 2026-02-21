import React from 'react';
import { useBooks } from '@/hooks/useBooks';
import { useBooksFilter } from '@/hooks/useBooksFilter';
import { CatalogHeader } from '@/components/client/CatalogHeader';
import { CatalogFilters } from '@/components/client/CatalogFilters';
import { CatalogResultsBar } from '@/components/client/CatalogResultsBar';
import { BooksGrid } from '@/components/client/BooksGrid';

export function BookCatalogPage() {
  const { books } = useBooks();

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

  return (
      <main className="min-h-screen bg-[var(--color-bg)] px-6 py-12 pt-10">
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
              onClearFilters={clearFilters}
          />
          <CatalogResultsBar
              filtered={filteredBooks.length}
              total={books.length}
              allBooks={books}
          />
          <BooksGrid books={filteredBooks} onClearFilters={clearFilters} />
        </div>
      </main>
  );
}