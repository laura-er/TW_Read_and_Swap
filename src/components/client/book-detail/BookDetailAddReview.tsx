import { useState } from 'react';
import { Button } from '@/components/ui/Button';

interface BookDetailAddReviewProps {
    onSubmit: (rating: number, comment: string) => void;
}

const ratingLabels: Record<number, string> = {
    1: 'Poor',
    2: 'Fair',
    3: 'Good',
    4: 'Very Good',
    5: 'Excellent',
};

export function BookDetailAddReview({ onSubmit }: BookDetailAddReviewProps) {
    const [rating, setRating] = useState(0);
    const [hovered, setHovered] = useState(0);
    const [comment, setComment] = useState('');

    function handleSubmit() {
        if (rating === 0 || comment.trim().length < 10) return;
        onSubmit(rating, comment.trim());
        setRating(0);
        setComment('');
    }

    const active = hovered || rating;

    return (
        <div className="rounded-2xl border border-(--color-border) bg-(--color-surface) p-5">
            <h3 className="text-xs font-bold uppercase tracking-widest text-(--color-text-muted) mb-4">
                Write a Review
            </h3>

            <div className="flex items-center gap-1.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => {
                    const value = i + 1;
                    return (
                        <button
                            key={i}
                            type="button"
                            onClick={() => setRating(value)}
                            onMouseEnter={() => setHovered(value)}
                            onMouseLeave={() => setHovered(0)}
                            className="transition-transform hover:scale-125 focus:outline-none"
                        >
                            <svg
                                className={`w-8 h-8 transition-colors duration-150 ${
                                    value <= active
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'fill-(--color-border) text-(--color-border)'
                                }`}
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                        </button>
                    );
                })}
                {active > 0 && (
                    <span className="ml-2 text-sm font-semibold text-(--color-accent)">
            {ratingLabels[active]}
          </span>
                )}
            </div>

            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts about this book..."
                rows={3}
                className="w-full rounded-xl border border-(--color-border) bg-(--color-surface-alt) px-4 py-3 text-sm text-(--color-text) placeholder:text-(--color-text-muted) outline-none focus:border-(--color-accent) focus:ring-2 focus:ring-(--color-accent)/20 transition-all resize-none mb-4"
            />

            <div className="flex items-center justify-between">
                <p className="text-xs text-(--color-text-muted)">
                    {comment.length > 0 ? `${comment.length} characters` : 'Minimum 10 characters'}
                </p>
                <Button
                    onClick={handleSubmit}
                    disabled={rating === 0 || comment.trim().length < 10}
                    variant="primary"
                    size="md"
                >
                    Submit Review
                </Button>
            </div>
        </div>
    );
}

