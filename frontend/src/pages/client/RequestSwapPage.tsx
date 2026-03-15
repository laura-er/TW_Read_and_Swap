import { useParams, Link } from 'react-router-dom';
import { mockBooks } from '@/data/mockBooks';
import { SwapBookInfo } from '@/components/client/swap/SwapBookInfo';
import { SwapForm } from '@/components/client/swap/SwapForm';
import { SwapNotAvailableView } from '@/components/client/swap/SwapNotAvailableView';

export function RequestSwapPage() {
    const { id } = useParams<{ id: string }>();
    const book = mockBooks.find((b) => b.id === id);

    if (!book) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center text-center">
                <div>
                    <h1 className="font-['Playfair_Display'] text-2xl font-bold text-[var(--color-text)] mb-4">
                        Book Not Found
                    </h1>
                    <Link
                        to="/books"
                        className="inline-flex items-center justify-center rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-accent-hover)] transition-all"
                    >
                        Browse Books
                    </Link>
                </div>
            </div>
        );
    }

    if (!book.isAvailable) {
        return <SwapNotAvailableView bookId={book.id} />;
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
            <Link
                to={`/books/${id}`}
                className="inline-flex items-center gap-2 text-(--color-text) hover:text-(--color-accent) mb-8 px-4 py-3 bg-(--color-surface) backdrop-blur-xl rounded-xl shadow-lg hover:shadow-xl border border-(--color-border) transition-all duration-300 hover:-translate-y-0.5 group"
            >
                <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="font-semibold">Back to Book Details</span>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <SwapBookInfo book={book} />
                </div>
                <div className="lg:col-span-2">
                    <SwapForm book={book} />
                </div>
            </div>
        </div>
    );
}
