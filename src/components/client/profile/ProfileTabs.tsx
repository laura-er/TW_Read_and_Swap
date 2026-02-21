export const PROFILE_TABS = ['Favorites', 'My Books', 'Swap History'] as const;
export type ProfileTab = typeof PROFILE_TABS[number];

interface ProfileTabsProps {
    active: ProfileTab;
    onChange: (tab: ProfileTab) => void;
}

export function ProfileTabs({ active, onChange }: ProfileTabsProps) {
    return (
        <div className="flex items-center gap-1 border-b border-[var(--color-border)]">
            {PROFILE_TABS.map((tab) => (
                <button
                    key={tab}
                    onClick={() => onChange(tab)}
                    className={`relative px-5 py-3 text-sm font-medium transition-colors ${
                        active === tab
                            ? 'text-[var(--color-accent)]'
                            : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                    }`}
                >
                    {tab}
                    {active === tab && (
                        <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-[var(--color-accent)]" />
                    )}
                </button>
            ))}
        </div>
    );
}
