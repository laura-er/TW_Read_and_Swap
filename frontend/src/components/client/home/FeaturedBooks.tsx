import { Link } from 'react-router-dom';
import { useBooks } from '@/hooks/useBooks';
import { BookCard } from '@/components/client/BookCard';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import type { Book } from '@/types';

export function FeaturedBooks() {
    const { books, isLoading } = useBooks();
    const { isAdmin } = useAuth();
    const { t } = useLanguage();
    const featured = [...books]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .filter((b) => b.isAvailable)
        .slice(0, 4);

    return (
        <section className="py-20" style={{ background: 'var(--lib-featured)', backdropFilter: 'blur(12px)', borderTop: '1px solid var(--lib-border)' }}>
            <div className="mx-auto max-w-7xl px-4">
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-px" style={{ background: 'var(--color-accent)' }} />
                            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--color-accent)' }}>{t.featured.recentlyAdded}</span>
                        </div>
                        <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold" style={{ color: 'var(--lib-text)' }}>{t.featured.recentlyAdded}</h2>
                        <p className="text-sm mt-1" style={{ color: 'var(--lib-text-muted)' }}>{t.featured.freshBooks}</p>
                    </div>
                    <Link to="/books"><Button variant="ghost" size="sm">{t.featured.viewAll}</Button></Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-stretch">
                    {isLoading
                        ? Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="rounded-[24px] border border-(--color-border) bg-(--color-surface) min-h-[160px] animate-pulse" style={{ background: 'var(--lib-card)', border: '1px solid var(--lib-border)' }} />
                        ))
                        : featured.map((book) => <BookCardWrapper key={book.id} book={book} />)
                    }
                </div>
                {!isAdmin && (
                    <div className="mt-12 rounded-[24px] overflow-hidden" style={{ background: 'var(--color-accent)' }}>
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-8 py-7">
                            <div>
                                <h3 className="font-['Playfair_Display'] text-2xl font-bold text-white">{t.featured.dustTitle}</h3>
                                <p className="text-white/80 text-sm mt-1">{t.featured.dustDesc}</p>
                            </div>
                            <Link to="/books/add">
                                <button className="shrink-0 px-6 py-3 font-semibold text-sm hover:opacity-90 transition-all shadow-lg" style={{ background: 'white', color: 'var(--color-accent)', borderRadius: '18px' }}>
                                    {t.featured.shareBtn}
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

function BookCardWrapper({ book }: { book: Book }) {
    return (
        <div className="rounded-[24px] overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
            style={{
                backdropFilter: 'blur(10px)',
                border: '1px solid var(--lib-border)',
                background: 'var(--lib-card)',
                ['--color-surface' as string]: 'var(--lib-card)',
                ['--color-surface-alt' as string]: 'var(--lib-stats)',
                ['--color-border' as string]: 'var(--lib-border)',
                ['--color-text' as string]: 'var(--lib-text)',
                ['--color-text-muted' as string]: 'var(--lib-text-muted)',
            } as React.CSSProperties}>
            <div className="flex-1 flex flex-col"><BookCard book={book} /></div>
        </div>
    );
}
