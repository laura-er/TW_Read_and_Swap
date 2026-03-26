import type { ReactNode } from 'react';

interface ProfileEmptyStateProps {
    icon: ReactNode;
    title: string;
    description: string;
    action?: ReactNode;
}

export function ProfileEmptyState({ icon, title, description, action }: ProfileEmptyStateProps) {
    return (
        <div
            className="flex flex-col items-center justify-center rounded-[20px] py-16 text-center"
            style={{
                background: 'var(--lib-card)',
                border: '1px solid var(--lib-border)',
                backdropFilter: 'blur(16px)',
            }}
        >
            <div className="mb-4" style={{ color: 'var(--lib-text-faint)', opacity: 0.5 }}>{icon}</div>
            <h3 className="font-['Playfair_Display'] text-xl font-bold" style={{ color: 'var(--lib-text)' }}>
                {title}
            </h3>
            <p className="mt-1 text-sm" style={{ color: 'var(--lib-text-muted)' }}>{description}</p>
            {action && <div className="mt-5">{action}</div>}
        </div>
    );
}