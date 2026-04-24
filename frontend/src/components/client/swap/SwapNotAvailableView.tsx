import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

export function SwapNotAvailableView({ bookId }: { bookId: string }) {
    const { t } = useLanguage();
    return (
        <div className="min-h-[60vh] flex items-center justify-center text-center">
            <div>
                <h1 className="font-['Playfair_Display'] text-2xl font-bold text-[var(--color-text)] mb-2">{t.swaps.notAvailableTitle}</h1>
                <p className="text-sm text-[var(--color-text-muted)] mb-6">{t.swaps.notAvailableDesc}</p>
                <Link to={`/books/${bookId}`} className="inline-flex items-center justify-center rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-accent-hover)] transition-all">{t.swaps.backToBook}</Link>
            </div>
        </div>
    );
}
