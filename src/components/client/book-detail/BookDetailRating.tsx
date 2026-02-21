interface BookDetailRatingProps {
    rating: number;
    reviewCount?: number;
}

export function BookDetailRating({ rating, reviewCount }: BookDetailRatingProps) {
    return (
        <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'fill-(--color-border) text-(--color-border)'}`}
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                ))}
            </div>
            <span className="text-sm font-bold text-(--color-text)">{rating.toFixed(1)}</span>
            {reviewCount !== undefined && (
                <span className="text-sm text-(--color-text-muted)">({reviewCount} reviews)</span>
            )}
        </div>
    );
}
