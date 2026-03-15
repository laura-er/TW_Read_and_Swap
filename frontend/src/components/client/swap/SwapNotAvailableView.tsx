import { Link } from 'react-router-dom';

interface SwapNotAvailableViewProps {
    bookId: string;
}

export function SwapNotAvailableView({ bookId }: SwapNotAvailableViewProps) {
    return (
        <div className="min-h-[60vh] flex items-center justify-center text-center">
            <div>
                <h1 className="font-['Playfair_Display'] text-2xl font-bold text-[var(--color-text)] mb-2">
                    Not Available for Swap
                </h1>
                <p className="text-sm text-[var(--color-text-muted)] mb-6">
                    This book is currently not available for swapping.
                </p>
                <Link
                    to={`/books/${bookId}`}
                    className="inline-flex items-center justify-center rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-accent-hover)] transition-all"
                >
                    Back to Book
                </Link>
            </div>
        </div>
    );
}
