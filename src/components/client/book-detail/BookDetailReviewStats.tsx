import type { Review } from '@/types';

interface BookDetailReviewStatsProps {
    reviews: Review[];
    baseRating?: number;
    baseReviewCount?: number;
}

export function BookDetailReviewStats({ reviews, baseRating, baseReviewCount }: BookDetailReviewStatsProps) {
    const allRatings = reviews.map((r) => r.rating);
    const totalCount = reviews.length + (baseReviewCount ?? 0);

    const avgRating = reviews.length > 0
        ? allRatings.reduce((a, b) => a + b, 0) / reviews.length
        : (baseRating ?? 0);

    const recommendPercent = reviews.length > 0
        ? Math.round((allRatings.filter((r) => r >= 4).length / reviews.length) * 100)
        : baseRating
            ? Math.round(((baseRating - 1) / 4) * 100)
            : 0;

    // Distribution per star (5 down to 1)
    const distribution = [5, 4, 3, 2, 1].map((star) => {
        const count = allRatings.filter((r) => r === star).length;
        const pct = reviews.length > 0 ? Math.round((count / reviews.length) * 100) : 0;
        return { star, count, pct };
    });

    return (
        <div className="flex flex-col sm:flex-row gap-6 p-5 bg-(--color-surface-alt) rounded-2xl">

            {/* Big average rating */}
            <div className="flex flex-col items-center justify-center min-w-[100px] gap-1">
        <span className="text-5xl font-bold text-(--color-text) leading-none">
          {avgRating.toFixed(1)}
        </span>
                <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                            key={i}
                            className={`w-4 h-4 ${i < Math.round(avgRating) ? 'fill-yellow-400 text-yellow-400' : 'fill-(--color-border) text-(--color-border)'}`}
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                    ))}
                </div>
                <span className="text-xs text-(--color-text-muted)">{totalCount} reviews</span>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px bg-(--color-border)" />
            <div className="sm:hidden h-px bg-(--color-border)" />

            {/* Star distribution bars */}
            <div className="flex flex-col gap-1.5 flex-1 justify-center">
                {distribution.map(({ star, pct }) => (
                    <div key={star} className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-(--color-text-muted) w-2">{star}</span>
                        <svg className="w-3 h-3 fill-yellow-400 text-yellow-400 flex-shrink-0" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        <div className="flex-1 h-2 rounded-full bg-(--color-border) overflow-hidden">
                            <div
                                className="h-full rounded-full bg-yellow-400 transition-all duration-500"
                                style={{ width: `${pct}%` }}
                            />
                        </div>
                        <span className="text-xs text-(--color-text-muted) w-8 text-right">{pct}%</span>
                    </div>
                ))}
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px bg-(--color-border)" />
            <div className="sm:hidden h-px bg-(--color-border)" />

            {/* Recommendation % */}
            <div className="flex flex-col items-center justify-center min-w-[90px] gap-1">
                <div className="relative w-16 h-16">
                    <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--color-border)" strokeWidth="3" />
                        <circle
                            cx="18" cy="18" r="15.9"
                            fill="none"
                            stroke="var(--color-accent)"
                            strokeWidth="3"
                            strokeDasharray={`${recommendPercent} 100`}
                            strokeLinecap="round"
                        />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-(--color-text)">
            {recommendPercent}%
          </span>
                </div>
                <span className="text-xs text-(--color-text-muted) text-center leading-tight">
          would recommend
        </span>
            </div>

        </div>
    );
}