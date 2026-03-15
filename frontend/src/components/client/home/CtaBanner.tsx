import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';

export function CtaBanner() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="relative overflow-hidden rounded-3xl bg-[var(--color-accent)] px-8 py-14 text-center">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white" />
        </div>
        <h2 className="relative font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-white mb-3">
          Ready to start swapping?
        </h2>
        <p className="relative text-white/80 mb-8 max-w-md mx-auto">
          Create a free account, list your first book, and find your next great read today.
        </p>
        <div className="relative flex items-center justify-center gap-3">
          <Link to="/sign-up">
            <Button
              size="lg"
              className="bg-white text-[var(--color-accent)] hover:bg-white/90 shadow-lg"
            >
              Create Free Account
            </Button>
          </Link>
          <Link to="/books">
            <Button size="lg" className="bg-transparent border border-white/50 text-white hover:bg-white/10">
              Browse First
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
