import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useReports } from '@/context/ReportsContext';

export function Sidebar() {
    const { toggleTheme, isDark } = useTheme();
    const { logout } = useAuth();
    const { t, language, setLanguage } = useLanguage();
    const navigate = useNavigate();
    const { reports } = useReports();
    const openReportsCount = reports.filter(r => r.status === 'open').length;

    const adminLinks = [
        { to: '/admin',              label: t.admin.dashboard,     icon: '▦',  badge: 0 },
        { to: '/admin/books-users',  label: t.admin.booksAndUsers, icon: '📚', badge: 0 },
        { to: '/admin/reports',      label: t.admin.reports,       icon: '⚑',  badge: openReportsCount },
    ];

    function handleLogout() { logout(); navigate('/'); }

    return (
        <aside className="fixed inset-y-0 left-0 z-40 flex w-60 flex-col bg-[var(--color-sidebar)] border-r border-[var(--color-border)]">
            <div className="flex h-16 items-center px-5 border-b border-white/10">
                <Link to="/" className="font-['Playfair_Display'] text-lg font-bold text-[var(--color-sidebar-text)]">Read & Swap</Link>
                <span className="ml-2 text-xs bg-[var(--color-accent)] text-white px-1.5 py-0.5 rounded font-medium">Admin</span>
            </div>
            <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
                {adminLinks.map(({ to, label, icon, badge }) => (
                    <NavLink key={to} to={to} end={to === '/admin'}
                             className={({ isActive }) => ['flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors', isActive ? 'bg-[var(--color-sidebar-active)] text-white' : 'text-[var(--color-sidebar-muted)] hover:bg-white/8 hover:text-[var(--color-sidebar-text)]'].join(' ')}>
                        <span className="relative">
                            {icon}
                        </span>
                        {label}
                        {badge > 0 && (
                            <span className="ml-auto flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold">
                                {badge}
                            </span>
                        )}
                    </NavLink>
                ))}
            </nav>
            <div className="p-3 border-t border-white/10 space-y-1">
                {/* Language switcher */}
                <button onClick={() => setLanguage(language === 'en' ? 'ro' : 'en')}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[var(--color-sidebar-muted)] hover:bg-white/8 hover:text-[var(--color-sidebar-text)] transition-colors">
                    <span>🌐</span>{language === 'en' ? 'Română' : 'English'}
                </button>
                <button onClick={toggleTheme} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[var(--color-sidebar-muted)] hover:bg-white/8 hover:text-[var(--color-sidebar-text)] transition-colors">
                    <span>{isDark ? '☀' : '☾'}</span>{isDark ? t.admin.lightMode : t.admin.darkMode}
                </button>
                <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[var(--color-sidebar-muted)] hover:bg-white/8 hover:text-[var(--color-sidebar-text)] transition-colors">
                    <span>←</span>{t.admin.backToSite}
                </Link>
                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-white/8 hover:text-red-300 transition-colors">
                    <span>⏻</span>{t.nav.logout}
                </button>
            </div>
        </aside>
    );
}