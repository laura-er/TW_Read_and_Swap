import { BookCard } from '@/components/client/BookCard';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/context/LanguageContext';
import type { Book } from '@/types';

interface BooksGridProps { books: Book[]; onClearFilters: () => void; isLoading?: boolean; }

export function BooksGrid({ books, onClearFilters, isLoading = false }: BooksGridProps) {
    const { t } = useLanguage();

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 items-stretch">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="rounded-[24px] border border-(--color-border) bg-(--color-surface) min-h-[160px] animate-pulse" />
                ))}
            </div>
        );
    }

    if (books.length === 0) {
        return (
            <div className="text-center py-24 bg-(--color-surface) border border-(--color-border) rounded-2xl">
                <div className="text-7xl mb-5">📚</div>
                <h3 className="text-2xl font-bold text-(--color-text) mb-3">{t.books.noResults}</h3>
                <p className="text-(--color-text-muted) mb-8 max-w-sm mx-auto">{t.books.noResultsDesc}</p>
                <Button onClick={onClearFilters} size="lg">Clear All Filters</Button>
            </div>
        );
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 items-stretch">
            {books.map((book) => <BookCard key={book.id} book={book} />)}
        </div>
    );
}
