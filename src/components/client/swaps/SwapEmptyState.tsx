import { Link } from 'react-router-dom';

interface SwapEmptyStateProps {
    tab: 'received' | 'sent';
}

export function SwapEmptyState({ tab }: SwapEmptyStateProps) {
    return (
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-[var(--color-surface-alt)] flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
            </div>
            <h3 className="font-['Playfair_Display'] text-lg font-bold text-[var(--color-text)] mb-1">
                No swap requests
            </h3>
            <p className="text-sm text-[var(--color-text-muted)] mb-6">
                {tab === 'received'
                    ? "You haven't received any swap requests yet."
                    : "You haven't sent any swap requests yet."}
            </p>
            {tab === 'sent' && (
                <Link
                    to="/books"
                    className="inline-flex items-center justify-center rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-accent-hover)] transition-all"
                >
                    Browse Books
                </Link>
            )}
        </div>
    );
}
