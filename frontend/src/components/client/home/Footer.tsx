import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  const links = {
    [t.footer.explore]: [
      { label: t.footer.browseBooks, to: '/books' },
      { label: t.footer.mySwaps, to: '/swaps' },
      { label: t.footer.favorites, to: '/profile?tab=favorites' },
    ],
    [t.footer.account]: [
      { label: t.footer.signIn, to: '/sign-in' },
      { label: t.footer.createAccount, to: '/sign-up' },
      { label: t.footer.myProfile, to: '/profile' },
    ],
  };

  return (
      <footer style={{ background: 'var(--lib-footer)', backdropFilter: 'blur(20px)', borderTop: '1px solid var(--lib-border)', paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 56px)' }}>
        <div className="mx-auto max-w-7xl px-4 pt-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2">
              <Link to="/" className="font-['Playfair_Display'] text-2xl font-bold transition-colors hover:opacity-75" style={{ color: 'var(--lib-text)' }}>Read & Swap</Link>
              <p className="text-sm mt-3 max-w-xs leading-relaxed" style={{ color: 'var(--lib-text-muted)' }}>{t.footer.description}</p>
              <div className="flex items-center gap-1 mt-5">
                <span style={{ color: 'var(--color-accent)' }} className="text-lg">✦</span>
                <span className="text-xs italic font-['Playfair_Display']" style={{ color: 'var(--lib-text-faint)' }}>{t.footer.tagline}</span>
              </div>
            </div>
            {Object.entries(links).map(([title, items]) => (
                <div key={title}>
                  <h4 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--color-accent)' }}>{title}</h4>
                  <ul className="space-y-2.5">
                    {items.map(({ label, to }) => (
                        <li key={to}><Link to={to} className="text-sm transition-colors hover:opacity-100" style={{ color: 'var(--lib-text-muted)' }}>{label}</Link></li>
                    ))}
                  </ul>
                </div>
            ))}
          </div>
          <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-2" style={{ borderTop: '1px solid var(--lib-border)' }}>
            <p className="text-xs" style={{ color: 'var(--lib-text-faint)' }}>© {new Date().getFullYear()} Read & Swap. {t.footer.rights}</p>
            <p className="text-xs" style={{ color: 'var(--lib-text-faint)' }}>{t.footer.madeWith}</p>
          </div>
        </div>
      </footer>
  );
}
