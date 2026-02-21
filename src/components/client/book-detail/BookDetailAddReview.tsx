import { useState } from 'react';

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
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');

    function handleSubmit() {
        if (!comment.trim()) return;
        onSubmit(rating, comment.trim());
        setRating(5);
        setComment('');
    }

    return (
        <div className="bg-(--color-surface) p-6 rounded-2xl shadow-xl border border-(--color-border)">
            <h3 className="text-2xl font-bold text-center mb-6 text-(--color-accent)">
                Write a Review
            </h3>

            {/* Star selector */}
            <div className="flex items-center justify-center gap-2 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={`w-10 h-10 rounded-lg transition-all duration-300 flex items-center justify-center hover:scale-110 ${
                            star <= rating
                                ? 'bg-yellow-400 text-white shadow-lg'
                                : 'bg-(--color-surface-alt) text-(--color-text-muted) border border-(--color-border) hover:bg-(--color-border)'
                        }`}
                    >
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                    </button>
                ))}
                <span className="ml-2 text-sm font-semibold text-(--color-accent)">
          {ratingLabels[rating]}
        </span>
            </div>

            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts about this book..."
                rows={4}
                className="w-full p-4 text-base bg-(--color-surface-alt) border-2 border-(--color-border) text-(--color-text) placeholder:text-(--color-text-muted) rounded-xl focus:border-(--color-accent) focus:outline-none focus:ring-2 focus:ring-(--color-accent)/20 resize-none shadow-sm transition-all duration-300 mb-4"
            />

            <div className="flex gap-3">
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!comment.trim()}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                    Publish Review
                </button>
                <button
                    type="button"
                    onClick={() => { setComment(''); setRating(5); }}
                    className="px-6 py-3 bg-(--color-surface-alt) hover:bg-(--color-border) text-(--color-text-muted) font-bold rounded-xl transition-all duration-300"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}