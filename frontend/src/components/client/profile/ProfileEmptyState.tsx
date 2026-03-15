import type { ReactNode } from 'react';

interface ProfileEmptyStateProps {
    icon: ReactNode;
    title: string;
    description: string;
    action?: ReactNode;
}

export function ProfileEmptyState({ icon, title, description, action }: ProfileEmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[var(--color-border)] py-16 text-center">
            <div className="mb-4 text-[var(--color-text-muted)]/40">{icon}</div>
            <h3 className="text-xl font-bold text-[var(--color-text)]">{title}</h3>
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">{description}</p>
            {action && <div className="mt-5">{action}</div>}
        </div>
    );
}