import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';

export function HeroSection() {
  const { isAuthenticated } = useAuth();

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[var(--color-accent)]/5 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[var(--color-accent)]/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 text-center">
        <h1 className="font-['Playfair_Display'] text-4xl md:text-6xl font-bold text-[var(--color-text)] mb-6 leading-tight">
          Share Books,{' '}
          <span className="text-[var(--color-accent)]">Discover Stories</span>
        </h1>
        <p className="text-lg text-[var(--color-text-muted)] mb-10 max-w-xl mx-auto leading-relaxed">
          Every book deserves a second life. Find your next favourite read from real people in your community — no fees, no fuss.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {isAuthenticated ? (
            <>
              <Link to="/books">
                <Button size="lg">Browse Books</Button>
              </Link>
              <Link to="/books/add">
                <Button size="lg" variant="secondary">Add a Book</Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/sign-up">
                <Button size="lg">Get Started Free</Button>
              </Link>
              <Link to="/books">
                <Button size="lg" variant="secondary">Browse Catalog</Button>
              </Link>
            </>
          )}
        </div>
        <p className="mt-6 text-sm text-[var(--color-text-muted)]">
          Join thousands of readers already swapping books
        </p>
      </div>
    </section>
  );
}
