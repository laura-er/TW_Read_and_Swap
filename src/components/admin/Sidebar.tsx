import { NavLink, Link } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';

const adminLinks = [
  { to: '/admin', label: 'Dashboard', icon: '▦' },
  { to: '/admin/books', label: 'Books', icon: '📚' },
  { to: '/admin/users', label: 'Users', icon: '👥' },
  { to: '/admin/swaps', label: 'Swap Requests', icon: '🔄' },
  { to: '/admin/reports', label: 'Reports', icon: '⚑' },
];

export function Sidebar() {
  const { toggleTheme, isDark } = useTheme();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-60 flex-col bg-[var(--color-sidebar)] border-r border-[var(--color-border)]">
      {/* Logo */}
      <div className="flex h-16 items-center px-5 border-b border-white/10">
        <Link
          to="/"
          className="font-['Playfair_Display'] text-lg font-bold text-[var(--color-sidebar-text)]"
        >
          Read & Swap
        </Link>
        <span className="ml-2 text-xs bg-[var(--color-accent)] text-white px-1.5 py-0.5 rounded font-medium">
          Admin
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
        {adminLinks.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/admin'}
            className={({ isActive }) =>
              [
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-[var(--color-sidebar-active)] text-white'
                  : 'text-[var(--color-sidebar-muted)] hover:bg-white/8 hover:text-[var(--color-sidebar-text)]',
              ].join(' ')
            }
          >
            <span>{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom area */}
      <div className="p-3 border-t border-white/10 space-y-1">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[var(--color-sidebar-muted)] hover:bg-white/8 hover:text-[var(--color-sidebar-text)] transition-colors"
        >
          <span>{isDark ? '☀' : '☾'}</span>
          {isDark ? 'Light mode' : 'Dark mode'}
        </button>
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[var(--color-sidebar-muted)] hover:bg-white/8 hover:text-[var(--color-sidebar-text)] transition-colors"
        >
          <span>←</span>
          Back to site
        </Link>
      </div>
    </aside>
  );
}
