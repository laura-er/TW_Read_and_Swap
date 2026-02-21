import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Book } from '@/types';

interface BookDetailCoverProps {
    book: Book;
}

export function BookDetailCover({ book }: BookDetailCoverProps) {
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <div className="lg:col-span-1">
            <div className="bg-(--color-surface) rounded-2xl overflow-hidden shadow-xl border border-(--color-border) lg:sticky lg:top-24 transition-all duration-300 hover:shadow-2xl">

                {/* Cover Image */}
                <div className="relative group">
                    {book.coverUrl ? (
                        <img
                            src={book.coverUrl}
                            alt={book.title}
                            className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        <div className="w-full h-[400px] flex items-center justify-center bg-(--color-surface-alt)">
                            <span className="text-7xl opacity-20">📖</span>
                        </div>
                    )}

                    {/* Available badge */}
                    {book.isAvailable && (
                        <div className="absolute top-4 left-4 bg-(--color-accent) text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm border border-white/20">
                            Available for Swap
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="p-6 space-y-3">
                    <button
                        onClick={() => setIsFavorite(!isFavorite)}
                        className="w-full bg-(--color-bg) hover:bg-(--color-surface-alt) text-(--color-text) border border-(--color-border) py-3 px-4 rounded-xl font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 group"
                    >
                        <svg
                            className={`w-5 h-5 group-hover:scale-110 transition-transform ${isFavorite ? 'fill-red-500 text-red-500' : 'fill-none text-(--color-text-muted)'}`}
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                    </button>

                    {book.isAvailable && (
                        <Link
                            to={`/swap/${book.id}`}
                            className="w-full bg-(--color-accent) hover:bg-(--color-accent-hover) text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 group"
                        >
                            <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                            Request Swap
                        </Link>
                    )}

                    {/* Book Stats */}
                    <div className="pt-4 border-t border-(--color-border) space-y-2 text-sm">
                        <div className="flex justify-between items-center p-2.5 bg-(--color-surface-alt) rounded-lg">
                            <span className="text-(--color-text-muted)">Condition:</span>
                            <span className="font-semibold text-(--color-text) capitalize">{book.condition}</span>
                        </div>
                        <div className="flex justify-between items-center p-2.5 bg-(--color-surface-alt) rounded-lg">
                            <span className="text-(--color-text-muted)">Genre:</span>
                            <span className="font-semibold text-(--color-text) capitalize">{book.genre}</span>
                        </div>
                        <div className="flex justify-between items-center p-2.5 bg-(--color-surface-alt) rounded-lg">
                            <span className="text-(--color-text-muted)">Added:</span>
                            <span className="font-semibold text-(--color-text)">
                {new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(book.createdAt))}
              </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
