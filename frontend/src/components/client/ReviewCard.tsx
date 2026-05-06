import type { Review } from '@/types';
import { Avatar } from '@/components/ui/Avatar';
import { useFormatDate } from '@/utils/useFormatDate';
import { useNavigate } from 'react-router-dom';

export function ReviewCard({ review }: { review: Review }) {
    const navigate = useNavigate();
    const { formatRelative } = useFormatDate();

    return (
        <div className="flex gap-3 py-4 border-b border-[var(--color-border)] last:border-0">
            <button onClick={() => navigate(`/profile/${review.author.username}`)} className="flex-shrink-0 cursor-pointer bg-transparent border-0 p-0">
                <Avatar src={review.author.avatarUrl} name={review.author.name} size="sm" />
            </button>
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                    <button onClick={() => navigate(`/profile/${review.author.username}`)} className="text-sm font-medium text-[var(--color-text)] hover:underline cursor-pointer bg-transparent border-0 p-0">
                        {review.author.name}
                    </button>
                    <span className="text-xs text-[var(--color-text-muted)]">{formatRelative(review.createdAt)}</span>
                </div>
                <div className="flex gap-0.5 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={i < review.rating ? 'text-amber-500' : 'text-[var(--color-border)]'}>★</span>
                    ))}
                </div>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{review.comment}</p>
            </div>
        </div>
    );
}