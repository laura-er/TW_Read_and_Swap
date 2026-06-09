import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

export function BookDetailNotFound() {
    const { t } = useLanguage();
    return (
        <div className="container mx-auto px-6 py-20 text-center min-h-screen flex items-center justify-center">
            <div className="bg-(--color-surface) rounded-3xl p-12 shadow-2xl border border-(--color-border) max-w-2xl w-full">
                <p className="text-7xl mb-6">📚</p>
                <h1 className="text-4xl font-bold text-(--color-text) mb-4">{t.books.bookNotFound}</h1>
                <p className="text-(--color-text-muted) mb-8">{t.books.bookNotFoundDesc}</p>
                <Link to="/books" className="inline-flex items-center gap-3 bg-(--color-accent) hover:bg-(--color-accent-hover) text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    {t.books.backToBooks}
                </Link>
            </div>
        </div>
    );
}