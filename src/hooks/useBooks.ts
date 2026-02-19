import { mockBooks } from '@/data/mockBooks';
import type { Book } from '@/types';

export function useBooks() {
  return {
    books: mockBooks as Book[],
    isLoading: false,
    error: null as string | null,
    totalPages: 1,
  };
}

export function useBook(id: string) {
  const book = mockBooks.find((b) => b.id === id) ?? null;
  return {
    book,
    isLoading: false,
    error: null as string | null,
  };
}
