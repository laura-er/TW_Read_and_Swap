import { useNotifications } from '@/context/NotificationsContext';

export const PROFILE_TABS = ['Favorites', 'My Books', 'Swap History', 'Messages'] as const;
export type ProfileTab = typeof PROFILE_TABS[number];

interface ProfileTabsProps {
    active: ProfileTab;
    onChange: (tab: ProfileTab) => void;
    userId: string;
}

export function ProfileTabs({ active, onChange, userId }: ProfileTabsProps) {
    const { getUnreadCount } = useNotifications();
    const unread = getUnreadCount(userId);

    return (
        <div className="flex items-center gap-1 border-b border-[var(--color-border)]">
            {PROFILE_TABS.map((tab) => (
                <button
                    key={tab}
                    onClick={() => onChange(tab)}
                    className={`relative flex items-center gap-1.5 px-5 py-3 text-sm font-medium transition-colors ${
                        active === tab
                            ? 'text-[var(--color-accent)]'
                            : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                    }`}
                >
                    {tab}
                    {tab === 'Messages' && unread > 0 && (
                        <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[var(--color-accent)] text-white text-[10px] font-bold">
                            {unread}
                        </span>
                    )}
                    {active === tab && (
                        <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-[var(--color-accent)]" />
                    )}
                </button>
            ))}
        </div>
    );
}
