import { Link } from 'react-router-dom';

const links = {
  Explore: [
    { label: 'Browse Books', to: '/books' },
    { label: 'My Swaps', to: '/swaps' },
    { label: 'Favorites', to: '/profile?tab=favorites' },
  ],
  Account: [
    { label: 'Sign In', to: '/sign-in' },
    { label: 'Create Account', to: '/sign-up' },
    { label: 'My Profile', to: '/profile' },
  ],
};

export function Footer() {
  return (
      <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)] mt-8">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div className="col-span-2 md:col-span-2">
              <Link
                  to="/"
                  className="font-['Playfair_Display'] text-xl font-bold text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors"
              >
                Read & Swap
              </Link>
              <p className="text-sm text-[var(--color-text-muted)] mt-3 max-w-xs leading-relaxed">
                A community for book lovers. Pass on the stories you've loved and discover ones you haven't read yet.
              </p>
            </div>

            {/* Link columns */}
            {Object.entries(links).map(([title, items]) => (
                <div key={title}>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
                    {title}
                  </h4>
                  <ul className="space-y-2">
                    {items.map(({ label, to }) => (
                        <li key={to}>
                          <Link
                              to={to}
                              className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
                          >
                            {label}
                          </Link>
                        </li>
                    ))}
                  </ul>
                </div>
            ))}
          </div>

          <div className="border-t border-[var(--color-border)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-[var(--color-text-muted)]">
              © {new Date().getFullYear()} Read & Swap. All rights reserved.
            </p>
            <p className="text-xs text-[var(--color-text-muted)]">
              Made with ♥ for readers everywhere
            </p>
          </div>
        </div>
      </footer>
  );
}