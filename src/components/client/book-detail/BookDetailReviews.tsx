import type { Review, Book } from '@/types';
import { ReviewCard } from '@/components/client/ReviewCard';
import { BookDetailReviewStats } from './BookDetailReviewStats';

interface BookDetailReviewsProps {
    reviews: Review[];
    book: Book;
}

export function BookDetailReviews({ reviews, book }: BookDetailReviewsProps) {
    return (
        <div className="flex flex-col gap-5">

            {/* Stats */}
            <BookDetailReviewStats
                reviews={reviews}
                baseRating={book.rating}
                baseReviewCount={book.reviewCount}
            />

            {/* Review list */}
            <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-(--color-text-muted) mb-4">
                    Reviews{' '}
                    {reviews.length > 0 && (
                        <span className="text-(--color-accent)">({reviews.length})</span>
                    )}
                </h3>

                {reviews.length === 0 ? (
                    <div className="text-center py-10 border border-dashed border-(--color-border) rounded-2xl">
                        <p className="text-3xl mb-2">✍️</p>
                        <p className="text-sm text-(--color-text-muted)">No reviews yet — be the first!</p>
                    </div>
                ) : (
                    <div className="flex flex-col divide-y divide-(--color-border)">
                        {reviews.map((review) => (
                            <ReviewCard key={review.id} review={review} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}


