import { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useSwaps } from '@/context/SwapContext';
import { useNotifications } from '@/context/NotificationsContext';
import { Avatar } from '@/components/ui/Avatar';

export function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { toggleTheme, isDark } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { incoming } = useSwaps();
  const pendingCount = incoming.filter(s => s.status === 'pending').length;
  const { getUnreadCount, getUserNotifications } = useNotifications();
  const hasUnreadMessages = user ? getUnreadCount(user.id) > 0 : false;
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const publicLinks = [
    { to: '/', label: t.nav.home },
    { to: '/books', label: t.nav.browseBooks },
  ];
  const authLinks = [
    { to: '/', label: t.nav.home },
    { to: '/books', label: t.nav.browseBooks },
    { to: '/swaps', label: t.nav.mySwaps },
  ];
  const adminLinks = [
    { to: '/', label: t.nav.home },
    { to: '/books', label: t.nav.browseBooks },
  ];

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
      <header className="sticky top-0 z-40 px-4 sm:px-6 pt-4 pb-2">
        <div className="mx-auto max-w-7xl">
          <div
              className="flex h-14 items-center justify-between px-5 rounded-[20px] shadow-lg"
              style={{
                background: 'var(--navbar-bg)',
                border: '1px solid var(--navbar-border)',
                backdropFilter: 'blur(20px)',
              }}
          >
            <Link to="/" className="font-['Playfair_Display'] text-xl font-bold transition-colors" style={{ color: 'var(--navbar-text)' }}>
              Read & Swap
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map(({ to, label }) => (
                  <NavLink key={to} to={to} end={to === '/'}
                           className={({ isActive }) => ['px-3 py-1.5 rounded-2xl text-sm font-medium transition-all', isActive ? 'text-white' : 'hover:bg-white/10 transition-all'].join(' ')}
                           style={({ isActive }) => ({ background: isActive ? 'var(--color-accent)' : 'transparent', color: isActive ? 'white' : 'var(--navbar-text-muted)' })}
                  >
                    <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      {label}
                      {to === '/swaps' && pendingCount > 0 && (
                          <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: '18px', height: '18px', borderRadius: '9px', background: '#e05030', color: 'white', fontSize: '11px', fontWeight: 700, padding: '0 5px', lineHeight: 1 }}>
                          {pendingCount}
                        </span>
                      )}
                    </span>
                  </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              {/* Language switcher */}
              <button
                  onClick={() => setLanguage(language === 'en' ? 'ro' : 'en')}
                  className="w-9 h-9 rounded-2xl flex items-center justify-center transition-all text-xs font-bold hover:bg-white/10"
                  style={{ color: 'var(--navbar-text-muted)', border: '1px solid var(--navbar-border)' }}
                  aria-label="Toggle language"
                  title={language === 'en' ? 'Switch to Romanian' : 'Switch to English'}
              >
                {language === 'en' ? 'RO' : 'EN'}
              </button>

              {/* Theme toggle */}
              <button onClick={toggleTheme} className="w-9 h-9 rounded-2xl flex items-center justify-center transition-all text-base hover:bg-white/10" style={{ color: 'var(--navbar-text-muted)' }} aria-label="Toggle theme">
                {isDark ? '☀️' : '🌙'}
              </button>

              {isAuthenticated && user ? (
                  <div className="flex items-center gap-2">
                    {!isAdmin && (
                        <Link to="/books/add" className="inline-flex items-center gap-1.5 rounded-2xl px-4 py-1.5 text-sm font-medium bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] transition-all shadow-sm">
                          {t.nav.addBook}
                        </Link>
                    )}
                    <div className="relative" ref={dropdownRef}>
                      <button onClick={() => setDropdownOpen((p) => !p)} className="rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40" style={{ position: 'relative' }}>
                        <Avatar src={user.avatarUrl} name={user.name} size="sm" />
                        {!isAdmin && hasUnreadMessages && (
                            <span style={{ position: 'absolute', top: '0', right: '0', width: '9px', height: '9px', borderRadius: '50%', background: '#c0392b', border: '2px solid var(--navbar-bg)' }} />
                        )}
                      </button>
                      {dropdownOpen && (
                          <div className="absolute right-0 mt-3 w-52 rounded-3xl overflow-hidden z-50 shadow-2xl" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                            <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--color-border)' }}>
                              <p className="text-sm font-semibold text-[var(--color-text)] truncate">{user.name}</p>
                              <p className="text-xs text-[var(--color-text-muted)] truncate">@{user.username}</p>
                              {isAdmin && <span className="mt-1 inline-block text-xs bg-[var(--color-accent)] text-white px-2 py-0.5 rounded-xl font-medium">Admin</span>}
                            </div>
                            <div className="py-1.5 px-1.5">
                              {[
                                { to: '/profile?tab=Favorites', icon: '👤', label: t.nav.myProfile, dot: hasUnreadMessages },
                                ...(!isAdmin ? [{ to: '/swaps', icon: '🔄', label: t.nav.mySwaps, dot: false }] : []),
                                { to: '/profile/edit', icon: '✏️', label: t.nav.editProfile, dot: false },
                                ...(!isAdmin ? [{ to: '/profile/share', icon: '🔗', label: t.nav.shareProfile, dot: false }] : []),
                                ...(isAdmin ? [{ to: '/admin', icon: '🔧', label: t.nav.adminDashboard, accent: true, dot: false }] : []),
                              ].map(({ to, icon, label, accent, dot }) => (
                                  <Link key={to} to={to} onClick={() => setDropdownOpen(false)}
                                        className={`flex items-center gap-3 px-3 py-2 text-sm rounded-2xl hover:bg-[var(--color-surface-alt)] transition-colors ${accent ? 'font-medium' : ''}`}
                                        style={{ color: accent ? 'var(--color-accent)' : 'var(--color-text)' }}>
                                    <span>{icon}</span>
                                    {label}
                                    {dot && <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#c0392b', marginLeft: 'auto', flexShrink: 0 }} />}
                                  </Link>
                              ))}
                            </div>
                            <div className="px-1.5 pb-1.5" style={{ borderTop: '1px solid var(--color-border)' }}>
                              <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-500 hover:bg-[var(--color-surface-alt)] transition-colors rounded-2xl mt-1">
                                <span>⏻</span> {t.nav.logout}
                              </button>
                            </div>
                          </div>
                      )}
                    </div>
                  </div>
              ) : (
                  <div className="flex items-center gap-2">
                    <Link to="/sign-in" className="inline-flex items-center rounded-2xl px-4 py-1.5 text-sm font-medium transition-all hover:bg-white/10" style={{ color: 'var(--navbar-text-muted)' }}>
                      {t.nav.signIn}
                    </Link>
                    <Link to="/sign-up" className="inline-flex items-center rounded-2xl px-4 py-1.5 text-sm font-medium bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] transition-all shadow-sm">
                      {t.nav.signUp}
                    </Link>
                  </div>
              )}
            </div>
          </div>
        </div>
      </header>
  );
}