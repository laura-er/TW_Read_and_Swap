interface BookRatingProps {
    rating: number;
}

export function BookRating({ rating }: BookRatingProps) {
    return (
        <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
                <svg
                    key={i}
                    className={`w-4 h-4 ${
                        i < Math.floor(rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'fill-[var(--color-border)] text-[var(--color-border)]'
                    }`}
                    viewBox="0 0 24 24"
                >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            ))}
            <span className="text-xs text-[var(--color-text-muted)] ml-1 font-semibold">
        {rating.toFixed(1)}/5
      </span>
        </div>
    );
}