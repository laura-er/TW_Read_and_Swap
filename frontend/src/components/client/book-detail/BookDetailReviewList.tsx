import type { Review } from '@/types';
import { Avatar } from '@/components/ui/Avatar';
import { useLanguage } from '@/context/LanguageContext';
import { formatRelativeDate } from '@/utils/formatDate';
import { useNavigate } from 'react-router-dom';

export function BookDetailReviewList({ reviews }: { reviews: Review[] }) {
    const { t } = useLanguage();
    const navigate = useNavigate();

    if (reviews.length === 0) return null;
    return (
        <div className="bg-(--color-surface) p-6 rounded-2xl shadow-xl border border-(--color-border)">
            <h2 className="text-2xl font-bold text-(--color-text) mb-6">{t.books.reviews.charAt(0).toUpperCase() + t.books.reviews.slice(1)} ({reviews.length})</h2>
            <div className="space-y-4">
                {reviews.map((review) => (
                    <div key={review.id} className="bg-(--color-surface-alt) p-5 rounded-xl border border-(--color-border) shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="flex items-start gap-4">
                            <button
                                onClick={() => navigate(`/profile/${review.author.username}`)}
                                className="flex-shrink-0 cursor-pointer bg-transparent border-0 p-0"
                            >
                                <Avatar src={review.author.avatarUrl} name={review.author.name} size="md" />
                            </button>
                            <div className="flex-1">
                                <div className="flex items-start justify-between mb-2 gap-4">
                                    <div>
                                        <button
                                            onClick={() => navigate(`/profile/${review.author.username}`)}
                                            className="text-base font-bold text-(--color-text) hover:underline cursor-pointer bg-transparent border-0 p-0"
                                        >
                                            {review.author.name}
                                        </button>
                                        <p className="text-sm text-(--color-text-muted)">{formatRelativeDate(review.createdAt)}</p>
                                    </div>
                                    <div className="flex items-center gap-0.5 flex-shrink-0">{Array.from({ length: 5 }).map((_, i) => <svg key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-(--color-border) text-(--color-border)'}`} viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>)}</div>
                                </div>
                                <p className="text-sm text-(--color-text-muted) leading-relaxed">{review.comment}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}