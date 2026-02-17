// useBooks.ts — hook for fetching and managing books
// TODO: implement with your preferred data-fetching library (React Query recommended)

import type { Book } from '@/types';

export function useBooks() {
  // TODO: fetch books list with filters (genre, condition, search, page)
  return {
    books: [] as Book[],
    isLoading: false,
    error: null as string | null,
    totalPages: 0,
  };
}

export function useBook(id: string) {
  // TODO: fetch single book by id + reviews
  return {
    book: null as Book | null,
    isLoading: false,
    error: null as string | null,
  };
}
