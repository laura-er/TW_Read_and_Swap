import { Badge } from '@/components/ui/Badge';
import { useLanguage } from '@/context/LanguageContext';
import type { BookCondition, BookGenre } from '@/types';

const conditionVariant: Record<BookCondition, 'success' | 'info' | 'warning' | 'danger'> = { new: 'success', good: 'info', fair: 'warning', worn: 'danger' };

interface BookPreviewCardProps { title: string; author: string; genre: BookGenre; condition: BookCondition; coverUrl: string; description: string; }

export function BookPreviewCard({ title, author, genre, condition, coverUrl, description }: BookPreviewCardProps) {
    const { t } = useLanguage();
    const genreKeyMap: Record<BookGenre, string> = {
        'fiction': 'genreFiction', 'non-fiction': 'genreNonFiction', 'mystery': 'genreMystery',
        'sci-fi': 'genreSciFi', 'fantasy': 'genreFantasy', 'romance': 'genreRomance',
        'biography': 'genreBiography', 'history': 'genreHistory', 'self-help': 'genreSelfHelp', 'other': 'genreOther',
    };
    const conditionKeyMap: Record<BookCondition, string> = {
        'new': 'conditionNew', 'good': 'conditionGood', 'fair': 'conditionFair', 'worn': 'conditionWorn',
    };
    const translatedGenre = t.books[genreKeyMap[genre] as keyof typeof t.books] as string || genre;
    const translatedCondition = t.books[conditionKeyMap[condition] as keyof typeof t.books] as string || condition;

    return (
        <div className="flex flex-col gap-4 p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
            <h2 className="font-semibold text-[var(--color-text)]">{t.addBook.preview}</h2>
            <div className="flex gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-3">
                <div className="w-20 h-28 rounded-lg overflow-hidden bg-[var(--color-surface-alt)] flex-shrink-0 flex items-center justify-center">
                    {coverUrl ? <img src={coverUrl} alt={title} className="w-full h-full object-cover" /> : <span className="text-3xl">📖</span>}
                </div>
                <div className="flex flex-col gap-1.5 min-w-0">
                    <p className="font-bold text-sm text-[var(--color-text)] line-clamp-2 leading-snug">{title || t.addBook.bookTitle}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">{author || t.addBook.author}</p>
                    <div className="flex items-center gap-1.5 flex-wrap mt-1">
                        <Badge variant={conditionVariant[condition]}>{translatedCondition}</Badge>
                        <span className="text-xs font-semibold text-[var(--color-text-muted)] bg-[var(--color-surface-alt)] px-2 py-0.5 rounded-full">{translatedGenre}</span>
                    </div>
                    {description && <p className="text-xs text-[var(--color-text-muted)] line-clamp-2 mt-1">{description}</p>}
                </div>
            </div>
        </div>
    );
}