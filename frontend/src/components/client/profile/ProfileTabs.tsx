import { useNotifications } from '@/context/NotificationsContext';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

export const PROFILE_TABS = ['Favorites', 'My Books', 'Swap History', 'Messages'] as const;
export type ProfileTab = typeof PROFILE_TABS[number];

interface ProfileTabsProps { active: ProfileTab; onChange: (tab: ProfileTab) => void; }

export function ProfileTabs({ active, onChange }: ProfileTabsProps) {
    const { user } = useAuth();
    const { t } = useLanguage();
    const { getUnreadCount } = useNotifications();
    const unread = getUnreadCount(user?.id ?? 'user1');
    const isAdmin = user?.role === 'admin';
    if (isAdmin) return null;

    const tabLabels: Record<typeof PROFILE_TABS[number], string> = {
        'Favorites': t.profile.favorites,
        'My Books': t.profile.myBooks,
        'Swap History': t.profile.swapHistory,
        'Messages': t.profile.messages,
    };

    return (
        <div style={{ display: 'flex', padding: '4px', gap: '2px' }}>
            {PROFILE_TABS.map((tab) => (
                <button key={tab} onClick={() => onChange(tab)} style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', padding: '8px 12px', borderRadius: '14px', fontSize: '12px', fontWeight: 600, border: 'none', cursor: 'pointer', transition: 'all 0.15s', background: active === tab ? 'var(--color-accent)' : 'transparent', color: active === tab ? 'white' : 'var(--lib-text-muted)' }}>
                    {tabLabels[tab]}
                    {tab === 'Messages' && unread > 0 && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '16px', height: '16px', borderRadius: '50%', background: active === tab ? 'white' : 'var(--color-accent)', color: active === tab ? 'var(--color-accent)' : 'white', fontSize: '9px', fontWeight: 700 }}>{unread}</span>
                    )}
                </button>
            ))}
        </div>
    );
}
