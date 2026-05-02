import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Book } from '@/types';
import { Avatar } from '@/components/ui/Avatar';
import { useLanguage } from '@/context/LanguageContext';
import { genreLabel } from '@/utils/bookLabels';
import axiosInstance from '@/api/axiosInstance';

interface BookDetailInfoProps { book: Book; averageRating: string; reviewCount: number; isOwner?: boolean; }

export function BookDetailInfo({ book, averageRating, reviewCount, isOwner = false }: BookDetailInfoProps) {
    const { t } = useLanguage();
    const [owner, setOwner] = useState<{ username: string; firstName: string; lastName: string } | null>(null);

    useEffect(() => {
        if (!book.ownerId) return;
        axiosInstance.get(`/api/users/${book.ownerId}`).then(res => setOwner({ username: res.data.username, firstName: res.data.firstName, lastName: res.data.lastName })).catch(() => setOwner(null));
    }, [book.ownerId]);

    return (
        <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-(--color-border) bg-(--color-surface) p-4">
                <h1 className="font-bold text-xl text-(--color-text) leading-snug mb-0.5">{book.title}</h1>
                <p className="text-sm text-(--color-accent) font-semibold mb-3">{t.books.by} {book.author}</p>
                <div className="flex items-center gap-2 flex-wrap p-3 bg-(--color-surface-alt) rounded-xl">
                    {averageRating !== 'N/A' ? (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-yellow-400/10 rounded-lg border border-yellow-400/20">
                            <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => <svg key={i} className={`w-3.5 h-3.5 ${i < Math.round(Number(averageRating)) ? 'fill-yellow-400' : 'fill-(--color-border)'}`} viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>)}</div>
                            <span className="text-sm font-bold text-(--color-text)">{averageRating}</span>
                            <span className="text-xs text-(--color-text-muted)">({reviewCount})</span>
                        </div>
                    ) : (
                        <span className="text-xs text-(--color-text-muted) px-2.5 py-1 rounded-lg border border-(--color-border) italic">{t.books.noReviews}</span>
                    )}
                    <span className="bg-(--color-accent)/10 text-(--color-accent) px-2.5 py-1 rounded-full font-semibold border border-(--color-accent)/20 text-xs">{genreLabel(book.genre, t)}</span>
                </div>
            </div>
            <div className="rounded-2xl border border-(--color-border) bg-(--color-surface) p-4">
                <h2 className="text-sm font-bold uppercase tracking-widest text-(--color-text-muted) mb-2">{t.books.aboutThisBook}</h2>
                <p className="text-sm text-(--color-text-muted) leading-relaxed">{book.description}</p>
            </div>
            {!isOwner && (
                <div className="rounded-2xl border border-(--color-border) bg-(--color-surface) p-4">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-(--color-text-muted) mb-3">{t.books.owner}</h2>
                    <Link to={owner ? `/profile/${owner.username}` : '#'} className="flex items-center gap-3 p-3 bg-(--color-surface-alt) rounded-xl hover:opacity-80 transition-opacity" style={{ textDecoration: 'none' }}>
                        <Avatar name={owner ? `${owner.firstName} ${owner.lastName}` : book.ownerId} size="sm" />
                        <div>
                            <p className="text-sm font-bold text-(--color-text)">{owner ? `${owner.firstName} ${owner.lastName}` : book.ownerId}</p>
                            <p className="text-xs text-(--color-accent)">{owner ? `@${owner.username}` : ''}</p>
                            <p className="text-xs text-(--color-text-muted)">{t.books.memberOf}</p>
                        </div>
                    </Link>
                </div>
            )}
        </div>
    );
}