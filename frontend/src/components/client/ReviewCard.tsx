import type { Review } from '@/types';
import { Avatar } from '@/components/ui/Avatar';
import { formatRelativeDate } from '@/utils/formatDate';

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="flex gap-3 py-4 border-b border-[var(--color-border)] last:border-0">
      {/* Author avatar */}
      <Avatar src={review.author.avatarUrl} name={review.author.name} size="sm" />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-[var(--color-text)]">
            {review.author.name}
          </span>
          <span className="text-xs text-[var(--color-text-muted)]">
            {formatRelativeDate(review.createdAt)}
          </span>
        </div>

        {/* Star rating */}
        <div className="flex gap-0.5 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={i < review.rating ? 'text-amber-500' : 'text-[var(--color-border)]'}
            >
              ★
            </span>
          ))}
        </div>

        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
          {review.comment}
        </p>
      </div>
    </div>
  );
}
