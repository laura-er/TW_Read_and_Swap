import type { Book } from '@/types';
import { Avatar } from '@/components/ui/Avatar';

interface BookDetailInfoProps {
    book: Book;
    averageRating: string;
    reviewCount: number;
}

export function BookDetailInfo({ book, averageRating, reviewCount }: BookDetailInfoProps) {
    return (
        <div className="space-y-6">

            {/* Title, Author, Rating */}
            <div className="bg-(--color-surface) rounded-2xl p-6 shadow-xl border border-(--color-border)">
                <h1 className="text-3xl md:text-4xl font-bold text-(--color-text) mb-3 leading-tight">
                    {book.title}
                </h1>
                <p className="text-xl text-(--color-accent) font-semibold mb-4">
                    by {book.author}
                </p>

                {/* Rating + Genre row */}
                <div className="flex items-center gap-4 flex-wrap bg-(--color-surface-alt) p-4 rounded-xl">
                    <div className="flex items-center gap-2 px-3 py-2 bg-yellow-400/10 rounded-lg border border-yellow-400/20">
                        <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <svg key={i} className="w-4 h-4 fill-yellow-400" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                            ))}
                        </div>
                        <div className="flex items-baseline gap-1">
                            <span className="text-lg font-bold text-(--color-text)">{averageRating}</span>
                            <span className="text-sm text-(--color-text-muted)">({reviewCount})</span>
                        </div>
                    </div>

                    <span className="bg-(--color-accent)/10 text-(--color-accent) px-4 py-2 rounded-lg font-semibold border border-(--color-accent)/20 text-sm capitalize">
            {book.genre}
          </span>
                </div>
            </div>

            {/* Description */}
            <div className="bg-(--color-surface) p-6 rounded-2xl shadow-xl border border-(--color-border)">
                <h2 className="text-2xl font-bold text-(--color-text) mb-4">About this Book</h2>
                <p className="text-base text-(--color-text-muted) leading-relaxed">
                    {book.description}
                </p>
            </div>

            {/* Owner */}
            <div className="bg-(--color-surface) p-6 rounded-2xl shadow-xl border border-(--color-border)">
                <h2 className="text-2xl font-bold text-(--color-text) mb-4">Owner</h2>
                <div className="flex items-center gap-4 p-4 bg-(--color-surface-alt) rounded-xl">
                    <Avatar name={book.ownerId} size="lg" />
                    <div>
                        <p className="text-xl font-bold text-(--color-text)">{book.ownerId}</p>
                        <p className="text-sm text-(--color-text-muted)">Member of Read &amp; Swap</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
