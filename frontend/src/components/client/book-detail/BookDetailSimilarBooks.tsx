import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Book } from '@/types';

interface BookDetailSimilarBooksProps {
    currentBook: Book;
    allBooks: Book[];
}

const PAGE_SIZE = 4;

export function BookDetailSimilarBooks({ currentBook, allBooks }: BookDetailSimilarBooksProps) {
    const [page, setPage] = useState(0);

    const similar = allBooks.filter(
        (b) => b.id !== currentBook.id && b.genre === currentBook.genre
    );

    const totalPages = Math.ceil(similar.length / PAGE_SIZE);
    const visible = similar.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

    if (similar.length === 0) return null;

    return (
        <div className="mt-8">
            <h2 className="text-lg font-bold text-(--color-text) mb-4">
                More in{' '}
                <span className="text-(--color-accent) capitalize">{currentBook.genre}</span>
            </h2>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {visible.map((book) => (
                    <Link
                        key={book.id}
                        to={`/books/${book.id}`}
                        className="group rounded-2xl border border-(--color-border) bg-(--color-surface) overflow-hidden hover:border-(--color-accent)/40 hover:shadow-md transition-all duration-200"
                    >
                        <div className="relative overflow-hidden h-40">
                            {book.coverUrl ? (
                                <img
                                    src={book.coverUrl}
                                    alt={book.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-(--color-surface-alt)">
                                    <span className="text-4xl opacity-20">📖</span>
                                </div>
                            )}
                            {book.isAvailable && (
                                <div className="absolute top-2 left-2">
                  <span className="flex items-center gap-1 bg-green-500 text-white px-2 py-0.5 rounded-full text-[9px] font-bold">
                    <span className="w-1 h-1 rounded-full bg-white animate-pulse" />
                    Available
                  </span>
                                </div>
                            )}
                        </div>
                        <div className="p-3">
                            <p className="text-sm font-semibold text-(--color-text) leading-snug line-clamp-2 group-hover:text-(--color-accent) transition-colors mb-0.5">
                                {book.title}
                            </p>
                            <p className="text-xs text-(--color-text-muted) truncate">{book.author}</p>
                            {book.rating !== undefined && (
                                <div className="flex items-center gap-1 mt-1.5">
                                    <svg className="w-3 h-3 fill-yellow-400" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    <span className="text-xs font-semibold text-(--color-text)">{book.rating.toFixed(1)}</span>
                                </div>
                            )}
                        </div>
                    </Link>
                ))}
            </div>

            {/* Pagination — doar dacă e mai mult de o pagină */}
            {totalPages > 1 && (
                <div className="flex justify-center">
                    <nav aria-label="Similar books navigation">
                        <div className="inline-flex rounded-xl shadow-sm -space-x-px" role="group">

                            {/* Prev */}
                            <button
                                type="button"
                                onClick={() => setPage((p) => Math.max(0, p - 1))}
                                disabled={page === 0}
                                className="inline-flex items-center justify-center w-9 h-9 bg-(--color-surface) border border-(--color-border) rounded-l-xl text-(--color-text-muted) hover:bg-(--color-surface-alt) hover:text-(--color-text) disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-(--color-accent)/30"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m15 19-7-7 7-7" />
                                </svg>
                            </button>

                            {/* Page counter */}
                            <button
                                type="button"
                                className="inline-flex items-center justify-center px-3 h-9 bg-(--color-surface) border border-(--color-border) text-sm text-(--color-text) font-medium cursor-default focus:outline-none"
                            >
                                {page + 1} of {totalPages}
                            </button>

                            {/* Next */}
                            <button
                                type="button"
                                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                                disabled={page === totalPages - 1}
                                className="inline-flex items-center justify-center w-9 h-9 bg-(--color-surface) border border-(--color-border) rounded-r-xl text-(--color-text-muted) hover:bg-(--color-surface-alt) hover:text-(--color-text) disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-(--color-accent)/30"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 5 7 7-7 7" />
                                </svg>
                            </button>

                        </div>
                    </nav>
                </div>
            )}
        </div>
    );
}
