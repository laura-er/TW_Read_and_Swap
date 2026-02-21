import type { Book } from '@/types';
import { Avatar } from '@/components/ui/Avatar';

interface BookDetailInfoProps {
    book: Book;
    averageRating: string;
    reviewCount: number;
}

export function BookDetailInfo({ book, averageRating, reviewCount }: BookDetailInfoProps) {
    return (
        <div className="flex flex-col gap-4">

            {/* Title + Author + Rating */}
            <div className="rounded-2xl border border-(--color-border) bg-(--color-surface) p-4">
                <h1 className="font-bold text-xl text-(--color-text) leading-snug mb-0.5">
                    {book.title}
                </h1>
                <p className="text-sm text-(--color-accent) font-semibold mb-3">by {book.author}</p>

                <div className="flex items-center gap-2 flex-wrap p-3 bg-(--color-surface-alt) rounded-xl">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-yellow-400/10 rounded-lg border border-yellow-400/20">
                        <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <svg key={i} className="w-3.5 h-3.5 fill-yellow-400" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                            ))}
                        </div>
                        <span className="text-sm font-bold text-(--color-text)">{averageRating}</span>
                        <span className="text-xs text-(--color-text-muted)">({reviewCount})</span>
                    </div>

                    <span className="bg-(--color-accent)/10 text-(--color-accent) px-2.5 py-1 rounded-full font-semibold border border-(--color-accent)/20 text-xs capitalize">
            {book.genre}
          </span>
                </div>
            </div>

            {/* Description */}
            <div className="rounded-2xl border border-(--color-border) bg-(--color-surface) p-4">
                <h2 className="text-sm font-bold uppercase tracking-widest text-(--color-text-muted) mb-2">About this Book</h2>
                <p className="text-sm text-(--color-text-muted) leading-relaxed">
                    {book.description}
                </p>
            </div>

            {/* Owner */}
            <div className="rounded-2xl border border-(--color-border) bg-(--color-surface) p-4">
                <h2 className="text-sm font-bold uppercase tracking-widest text-(--color-text-muted) mb-3">Owner</h2>
                <div className="flex items-center gap-3 p-3 bg-(--color-surface-alt) rounded-xl">
                    <Avatar name={book.ownerId} size="sm" />
                    <div>
                        <p className="text-sm font-bold text-(--color-text)">{book.ownerId}</p>
                        <p className="text-xs text-(--color-text-muted)">Member of Read &amp; Swap</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

