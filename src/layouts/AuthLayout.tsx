import { Link, Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-bg)] px-4">
      {/* Logo */}
      <Link
        to="/"
        className="font-['Playfair_Display'] text-2xl font-bold text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors mb-8"
      >
        Read & Swap
      </Link>

      {/* Card */}
      <div className="w-full max-w-md rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-lg">
        <Outlet />
      </div>

      {/* Footer link */}
      <p className="mt-6 text-sm text-[var(--color-text-muted)]">
        <Link to="/" className="hover:text-[var(--color-accent)] transition-colors">
          ← Back to home
        </Link>
      </p>
    </div>
  );
}
