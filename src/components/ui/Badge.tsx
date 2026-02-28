import type { ReactNode } from 'react';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'accent';

interface BadgeProps {
    children: ReactNode;
    variant?: BadgeVariant;
    className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
    default: 'bg-[var(--color-surface-alt)] text-[var(--color-text-muted)]',
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    accent: 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]',
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
