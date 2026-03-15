import { Link } from 'react-router-dom';
import { mockBooks } from '@/data/mockBooks';
import { BookCard } from '@/components/client/BookCard';
import { Button } from '@/components/ui/Button';

export function FeaturedBooks() {
  const featured = mockBooks.filter((b) => b.isAvailable).slice(0, 4);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold text-[var(--color-text)]">
            Recently Added
          </h2>
          <p className="text-[var(--color-text-muted)] text-sm mt-1">
            Fresh books ready to swap
          </p>
        </div>
        <Link to="/books">
          <Button variant="ghost" size="sm">View all →</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {featured.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}
