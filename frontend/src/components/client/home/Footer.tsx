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
      <footer style={{
        background: 'var(--lib-footer)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid var(--lib-border)',
        // Extend past the bottom of the page so no gap ever shows
        paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 56px)',
      }}>
        <div className="mx-auto max-w-7xl px-4 pt-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2">
              <Link to="/"
                    className="font-['Playfair_Display'] text-2xl font-bold transition-colors hover:opacity-75"
                    style={{ color: 'var(--lib-text)' }}>
                Read & Swap
              </Link>
              <p className="text-sm mt-3 max-w-xs leading-relaxed"
                 style={{ color: 'var(--lib-text-muted)' }}>
                A community for book lovers. Pass on the stories you've loved
                and discover ones you haven't read yet.
              </p>
              <div className="flex items-center gap-1 mt-5">
                <span style={{ color: 'var(--color-accent)' }} className="text-lg">✦</span>
                <span className="text-xs italic font-['Playfair_Display']"
                      style={{ color: 'var(--lib-text-faint)' }}>
                Every book tells a story
              </span>
              </div>
            </div>

            {Object.entries(links).map(([title, items]) => (
                <div key={title}>
                  <h4 className="text-xs font-semibold uppercase tracking-widest mb-4"
                      style={{ color: 'var(--color-accent)' }}>{title}</h4>
                  <ul className="space-y-2.5">
                    {items.map(({ label, to }) => (
                        <li key={to}>
                          <Link to={to}
                                className="text-sm transition-colors hover:opacity-100"
                                style={{ color: 'var(--lib-text-muted)' }}>
                            {label}
                          </Link>
                        </li>
                    ))}
                  </ul>
                </div>
            ))}
          </div>

          <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-2"
               style={{ borderTop: '1px solid var(--lib-border)' }}>
            <p className="text-xs" style={{ color: 'var(--lib-text-faint)' }}>
              © {new Date().getFullYear()} Read & Swap. All rights reserved.
            </p>
            <p className="text-xs" style={{ color: 'var(--lib-text-faint)' }}>
              Made with ♥ for readers everywhere
            </p>
          </div>
        </div>
      </footer>
  );
}