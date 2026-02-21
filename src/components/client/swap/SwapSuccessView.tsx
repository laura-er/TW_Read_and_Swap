import { Link } from 'react-router-dom';

export function SwapSuccessView() {
    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center max-w-md">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h1 className="font-['Playfair_Display'] text-2xl font-bold text-[var(--color-text)] mb-2">
                    Swap Request Sent!
                </h1>
                <p className="text-sm text-[var(--color-text-muted)] mb-8">
                    Your request has been sent. The owner will review your offer and get back to you.
                </p>
                <div className="flex gap-3 justify-center">
                    <Link
                        to="/swaps"
                        className="inline-flex items-center justify-center rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-accent-hover)] transition-all"
                    >
                        My Swaps
                    </Link>
                    <Link
                        to="/books"
                        className="inline-flex items-center justify-center rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-surface-alt)] transition-all"
                    >
                        Browse More Books
                    </Link>
                </div>
            </div>
        </div>
    );
}
