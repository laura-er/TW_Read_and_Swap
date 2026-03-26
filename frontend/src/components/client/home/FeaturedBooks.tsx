import { Link } from 'react-router-dom';
import { mockBooks } from '@/data/mockBooks';
import { BookCard } from '@/components/client/BookCard';
import { Button } from '@/components/ui/Button';

export function FeaturedBooks() {
    const featured = mockBooks.filter((b) => b.isAvailable).slice(0, 4);

    return (
        <section className="py-20" style={{
            background: 'var(--lib-featured)',
            backdropFilter: 'blur(12px)',
            borderTop: '1px solid var(--lib-border)',
        }}>
            <div className="mx-auto max-w-7xl px-4">

                <div className="flex items-end justify-between mb-10">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-px" style={{ background: 'var(--color-accent)' }} />
                            <span className="text-xs font-semibold tracking-widest uppercase"
                                  style={{ color: 'var(--color-accent)' }}>Fresh Picks</span>
                        </div>
                        <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold"
                            style={{ color: 'var(--lib-text)' }}>Recently Added</h2>
                        <p className="text-sm mt-1" style={{ color: 'var(--lib-text-muted)' }}>
                            Fresh books ready to swap from our community
                        </p>
                    </div>
                    <Link to="/books"><Button variant="ghost" size="sm">View all →</Button></Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-stretch">
                    {featured.map((book) => (
                        <BookCardWrapper key={book.id} book={book} />
                    ))}
                </div>

                <div className="mt-12 rounded-[24px] overflow-hidden"
                     style={{ background: 'var(--color-accent)' }}>
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-8 py-7">
                        <div>
                            <h3 className="font-['Playfair_Display'] text-2xl font-bold text-white">
                                Have books gathering dust?
                            </h3>
                            <p className="text-white/80 text-sm mt-1">List them for free and let someone else enjoy them</p>
                        </div>
                        <Link to="/books/add">
                            <button className="shrink-0 px-6 py-3 font-semibold text-sm hover:opacity-90 transition-all shadow-lg"
                                    style={{ background: 'white', color: 'var(--color-accent)', borderRadius: '18px' }}>
                                Share a Book →
                            </button>
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
}

import type { Book } from '@/types';

function BookCardWrapper({ book }: { book: Book }) {
    return (
        <div
            className="rounded-[24px] overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
            style={{
                backdropFilter: 'blur(10px)',
                border: '1px solid var(--lib-border)',
                background: 'var(--lib-card)',
                /* Override inline so BookCard's style={{ background: 'var(--color-surface)' }} picks up lib-card */
                ['--color-surface' as string]:     'var(--lib-card)',
                ['--color-surface-alt' as string]: 'var(--lib-stats)',
                ['--color-border' as string]:      'var(--lib-border)',
                ['--color-text' as string]:        'var(--lib-text)',
                ['--color-text-muted' as string]:  'var(--lib-text-muted)',
            } as React.CSSProperties}
        >
            <div className="flex-1 flex flex-col">
                <BookCard book={book} />
            </div>
        </div>
    );
}