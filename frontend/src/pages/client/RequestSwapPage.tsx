import { useParams, Link } from 'react-router-dom';
import { useBook } from '@/hooks/useBooks';
import { useLanguage } from '@/context/LanguageContext';
import { SwapBookInfo } from '@/components/client/swap/SwapBookInfo';
import { SwapForm } from '@/components/client/swap/SwapForm';
import { SwapNotAvailableView } from '@/components/client/swap/SwapNotAvailableView';

export function RequestSwapPage() {
    const { id } = useParams<{ id: string }>();
    const { book, isLoading } = useBook(id!);
    const { t } = useLanguage();

    if (isLoading) return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <p className="text-[var(--color-text-muted)]">{t.common.loading}</p>
        </div>
    );

    if (!book) return (
        <div className="min-h-[60vh] flex items-center justify-center text-center">
            <div>
                <h1 className="font-['Playfair_Display'] text-2xl font-bold text-[var(--color-text)] mb-4">{t.books.bookNotFound}</h1>
                <Link to="/books" className="inline-flex items-center justify-center rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-accent-hover)] transition-all">{t.nav.browseBooks}</Link>
            </div>
        </div>
    );

    if (!book.isAvailable) return <SwapNotAvailableView bookId={book.id} />;

    return (
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
            <Link to={`/books/${id}`} className="inline-flex items-center gap-1.5 text-sm text-(--color-text-muted) hover:text-(--color-text) mb-8 transition-colors group">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                <span>{t.books.backToBookDetails}</span>
            </Link>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1"><SwapBookInfo book={book} /></div>
                <div className="lg:col-span-2"><SwapForm book={book} /></div>
            </div>
        </div>
    );
}