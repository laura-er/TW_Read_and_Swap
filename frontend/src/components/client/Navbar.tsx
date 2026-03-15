import { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { Avatar } from '@/components/ui/Avatar';

const publicLinks = [
  { to: '/', label: 'Home' },
  { to: '/books', label: 'Browse Books' },
];

const authLinks = [
  { to: '/', label: 'Home' },
  { to: '/books', label: 'Browse Books' },
  { to: '/swaps', label: 'My Swaps' },
];

const adminLinks = [
  { to: '/', label: 'Home' },
  { to: '/books', label: 'Browse Books' },
];

export function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { toggleTheme, isDark } = useTheme();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleLogout() {
    logout();
    setDropdownOpen(false);
    navigate('/');
  }

  const navLinks = isAdmin ? adminLinks : isAuthenticated ? authLinks : publicLinks;

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

          {/* Nav links */}
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
              {isDark ? '☀️' : '🌙'}
            </button>

            {isAuthenticated && user ? (
                <div className="flex items-center gap-3">
                  {!isAdmin && (
                      <Link
                          to="/books/add"
                          className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] transition-all shadow-sm"
                      >
                        + Add Book
                      </Link>
                  )}

                  <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setDropdownOpen((prev) => !prev)}
                        className="rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40"
                    >
                      <Avatar src={user.avatarUrl} name={user.name} size="sm" />
                    </button>

                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-52 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-xl py-1 z-50">
                          <div className="px-4 py-3 border-b border-[var(--color-border)]">
                            <p className="text-sm font-semibold text-[var(--color-text)] truncate">
                              {user.name}
                            </p>
                            <p className="text-xs text-[var(--color-text-muted)] truncate">
                              @{user.username}
                            </p>
                            {isAdmin && (
                                <span className="mt-1 inline-block text-xs bg-[var(--color-accent)] text-white px-1.5 py-0.5 rounded font-medium">
                          Admin
                        </span>
                            )}
                          </div>

                          <div className="py-1">
                            <Link
                                to="/profile"
                                onClick={() => setDropdownOpen(false)}
                                className="flex items-center gap-3 px-4 py-2 text-sm text-[var(--color-text)] hover:bg-[var(--color-surface-alt)] transition-colors"
                            >
                              <span>👤</span> My Profile
                            </Link>
                            <Link
                                to="/profile/edit"
                                onClick={() => setDropdownOpen(false)}
                                className="flex items-center gap-3 px-4 py-2 text-sm text-[var(--color-text)] hover:bg-[var(--color-surface-alt)] transition-colors"
                            >
                              <span>✏️</span> Edit Profile
                            </Link>

                            {!isAdmin && (
                                <>
                                  <Link
                                      to="/profile?tab=favorites#favorites-section"
                                      onClick={() => setDropdownOpen(false)}
                                      className="flex items-center gap-3 px-4 py-2 text-sm text-[var(--color-text)] hover:bg-[var(--color-surface-alt)] transition-colors"
                                  >
                                    <span>❤️</span> Favorites
                                  </Link>
                                  <Link
                                      to="/swaps"
                                      onClick={() => setDropdownOpen(false)}
                                      className="flex items-center gap-3 px-4 py-2 text-sm text-[var(--color-text)] hover:bg-[var(--color-surface-alt)] transition-colors"
                                  >
                                    <span>🔄</span> My Swaps
                                  </Link>
                                  <Link
                                      to="/profile/share"
                                      onClick={() => setDropdownOpen(false)}
                                      className="flex items-center gap-3 px-4 py-2 text-sm text-[var(--color-text)] hover:bg-[var(--color-surface-alt)] transition-colors"
                                  >
                                    <span>🔗</span> Share Profile
                                  </Link>
                                </>
                            )}

                            {isAdmin && (
                                <Link
                                    to="/admin"
                                    onClick={() => setDropdownOpen(false)}
                                    className="flex items-center gap-3 px-4 py-2 text-sm text-[var(--color-accent)] font-medium hover:bg-[var(--color-surface-alt)] transition-colors"
                                >
                                  <span>🔧</span> Admin Dashboard
                                </Link>
                            )}
                          </div>

                          <div className="border-t border-[var(--color-border)] py-1">
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-[var(--color-surface-alt)] transition-colors"
                            >
                              <span>⏻</span> Logout
                            </button>
                          </div>
                        </div>
                    )}
                  </div>
                </div>
            ) : (
                <div className="flex items-center gap-2">
                  <Link
                      to="/sign-in"
                      className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium bg-transparent text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-all"
                  >
                    Sign In
                  </Link>
                  <Link
                      to="/sign-up"
                      className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] transition-all shadow-sm"
                  >
                    Sign Up
                  </Link>
                </div>
            )}
          </div>
        </div>
      </header>
  );
}
