import type { ReactNode } from 'react';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'accent';

interface BadgeProps {
    children: ReactNode;
    variant?: BadgeVariant;
    className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
    default: 'bg-[var(--color-surface-alt)] text-[var(--color-text-muted)]',
    success: 'bg-[#40916c] text-white',
    warning: 'bg-orange-400 text-white',
    danger:  'bg-red-400 text-white',
    info:    'bg-blue-400 text-white',
    accent:  'bg-[var(--color-accent)] text-white',
};

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
    return (
        <span
            className={[
                'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                variantStyles[variant],
                className,
            ].join(' ')}
        >
            {children}
        </span>
    );
}
