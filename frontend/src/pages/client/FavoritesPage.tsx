import { Link } from 'react-router-dom';
import { useFavorites } from '@/context/FavoritesContext';
import { useBooks } from '@/hooks/useBooks';
import { BookCard } from '@/components/client/BookCard';

export function FavoritesPage() {
    const { favorites } = useFavorites();
    const { books, isLoading } = useBooks();

    const favoriteBooks = books.filter(b => favorites.includes(b.id));

    if (isLoading) return (
        <main className="mx-auto max-w-7xl px-4 py-10">
            <p className="text-[var(--color-text-muted)]">Loading...</p>
        </main>
    );

    return (
        <main className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
            <div className="mb-8">
                <h1 className="font-['Playfair_Display'] text-3xl font-bold text-[var(--color-text)] mb-1">
                    My Favorites
                </h1>
                <p className="text-sm text-[var(--color-text-muted)]">
                    {favoriteBooks.length} book{favoriteBooks.length !== 1 ? 's' : ''} saved
                </p>
            </div>

            {favoriteBooks.length === 0 ? (
                <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-12 text-center">
                    <p className="text-4xl mb-4">📚</p>
                    <h3 className="font-['Playfair_Display'] font-bold text-[var(--color-text)] mb-2">
                        No favorites yet
                    </h3>
                    <p className="text-sm text-[var(--color-text-muted)] mb-6">
                        Browse books and add some to your favorites!
                    </p>
                    <Link
                        to="/books"
                        className="inline-flex items-center justify-center rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-accent-hover)] transition-all"
                    >
                        Browse Books
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {favoriteBooks.map(book => (
                        <BookCard key={book.id} book={book} />
                    ))}
                </div>
            )}
        </main>
    );
}