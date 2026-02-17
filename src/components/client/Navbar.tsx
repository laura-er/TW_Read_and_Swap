import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/books', label: 'Browse Books' },
  { to: '/swaps', label: 'My Swaps' },
  { to: '/favorites', label: 'Favorites' },
];

export function Navbar() {
  const { user, isAuthenticated } = useAuth();
  const { toggleTheme, isDark } = useTheme();

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-bg)]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link
          to="/"
          className="font-['Playfair_Display'] text-xl font-bold text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors"
        >
          Read & Swap
        </Link>

        {/* Nav links - desktop */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                [
                  'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'text-[var(--color-accent)] bg-[var(--color-accent)]/8'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)]',
                ].join(' ')
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Right area */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? '☀' : '☾'}
          </button>

          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              <Button variant="primary" size="sm" as={Link} to="/books/add">
                + Add Book
              </Button>
              <Link to="/profile">
                <Avatar src={user.avatarUrl} name={user.name} size="sm" />
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" as={Link} to="/sign-in">
                Sign In
              </Button>
              <Button variant="primary" size="sm" as={Link} to="/sign-up">
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
