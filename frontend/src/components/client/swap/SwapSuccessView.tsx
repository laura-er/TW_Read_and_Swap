import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

export function SwapSuccessView() {
    const [searchParams] = useSearchParams();
    const { t } = useLanguage();
    const isDuplicate = searchParams.get('duplicate') === 'true';
    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center max-w-md">
                <div className={`w-16 h-16 ${isDuplicate ? 'bg-amber-500' : 'bg-green-500'} rounded-full flex items-center justify-center mx-auto mb-6`}>
                    {isDuplicate ? <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M12 3a9 9 0 100 18A9 9 0 0012 3z" /></svg> : <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                </div>
                <h1 className="font-['Playfair_Display'] text-2xl font-bold text-[var(--color-text)] mb-2">{isDuplicate ? t.swaps.requestAlreadyExists : t.swaps.swapSuccess}</h1>
                <p className="text-sm text-[var(--color-text-muted)] mb-8">{isDuplicate ? t.swaps.requestAlreadyExistsDesc : t.swaps.requestSentDesc}</p>
                <div className="flex gap-3 justify-center">
                    <Link to="/swaps" className="inline-flex items-center justify-center rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-accent-hover)] transition-all">{t.nav.mySwaps}</Link>
                    <Link to="/books" className="inline-flex items-center justify-center rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-surface-alt)] transition-all">{t.nav.browseBooks}</Link>
                </div>
            </div>
        </div>
    );
}
