import type { Review } from '@/types';
import { Avatar } from '@/components/ui/Avatar';
import { formatRelativeDate } from '@/utils/formatDate';

interface BookDetailReviewListProps {
    reviews: Review[];
}

export function BookDetailReviewList({ reviews }: BookDetailReviewListProps) {
    if (reviews.length === 0) return null;

    return (
        <div className="bg-(--color-surface) p-6 rounded-2xl shadow-xl border border-(--color-border)">
            <h2 className="text-2xl font-bold text-(--color-text) mb-6">
                Reviews ({reviews.length})
            </h2>
            <div className="space-y-4">
                {reviews.map((review) => (
                    <div
                        key={review.id}
                        className="bg-(--color-surface-alt) p-5 rounded-xl border border-(--color-border) shadow-sm hover:shadow-md transition-all duration-300"
                    >
                        <div className="flex items-start gap-4">
                            <Avatar src={review.author.avatarUrl} name={review.author.name} size="md" />
                            <div className="flex-1">
                                <div className="flex items-start justify-between mb-2 gap-4">
                                    <div>
                                        <p className="text-base font-bold text-(--color-text)">{review.author.name}</p>
                                        <p className="text-sm text-(--color-text-muted)">{formatRelativeDate(review.createdAt)}</p>
                                    </div>
                                    <div className="flex items-center gap-0.5 flex-shrink-0">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <svg
                                                key={i}
                                                className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-(--color-border) text-(--color-border)'}`}
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-sm text-(--color-text-muted) leading-relaxed">
                                    {review.comment}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}