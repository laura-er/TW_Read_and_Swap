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
    searchTerm, selectedGenre, selectedCondition, availableOnly,
    filteredBooks, setSearchTerm, setSelectedGenre, setSelectedCondition,
    toggleAvailableOnly, clearFilters,
  } = useBooksFilter(books);

  useEffect(() => { setPage(0); }, [searchTerm, selectedGenre, selectedCondition, availableOnly]);

  const totalPages = Math.ceil(filteredBooks.length / PAGE_SIZE);
  const paginatedBooks = filteredBooks.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
      <main className="min-h-screen px-4 sm:px-6 py-10" style={{ background: 'transparent' }}>
        <div className="mx-auto max-w-7xl">
          <CatalogHeader totalBooks={books.length} />
          <CatalogFilters
              searchTerm={searchTerm} selectedGenre={selectedGenre}
              selectedCondition={selectedCondition} availableOnly={availableOnly}
              onSearchChange={setSearchTerm} onGenreChange={setSelectedGenre}
              onConditionChange={setSelectedCondition} onAvailableToggle={toggleAvailableOnly}
              onClearFilters={() => { clearFilters(); setPage(0); }}
          />
          <CatalogResultsBar filtered={filteredBooks.length} total={books.length} allBooks={books} />
          <BooksGrid books={paginatedBooks} onClearFilters={() => { clearFilters(); setPage(0); }} />
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      </main>
  );
}