import { BookCard } from '@/components/client/BookCard';
import { Button } from '@/components/ui/Button';
import type { Book } from '@/types';

interface BooksGridProps {
    books: Book[];
    onClearFilters: () => void;
}

export function BooksGrid({ books, onClearFilters }: BooksGridProps) {
    if (books.length === 0) {
        return (
            <div className="text-center py-24 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl">
                <div className="text-7xl mb-5">📚</div>
                <h3 className="text-2xl font-bold text-[var(--color-text)] mb-3">No Books Found</h3>
                <p className="text-[var(--color-text-muted)] mb-8 max-w-sm mx-auto">
                    We couldn't find any books matching your criteria. Try adjusting your filters!
                </p>
                <Button onClick={onClearFilters} size="lg">
                    Clear All Filters
                </Button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {books.map((book) => (
                <BookCard key={book.id} book={book} />
            ))}
        </div>
    );
}