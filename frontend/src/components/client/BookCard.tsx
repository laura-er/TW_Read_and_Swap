import type { Book } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { BookCoverImage } from './book-card/BookCoverImage';
import { BookRating } from './book-card/BookRating';
import { BookCardActions } from './book-card/BookCardActions';
import { BookCardOwner } from './book-card/BookCardOwner';
import { useFavorites } from '@/context/FavoritesContext';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useNavigate } from 'react-router-dom';

const conditionVariant: Record<Book['condition'], 'success' | 'info' | 'warning' | 'danger'> = { new: 'success', good: 'info', fair: 'warning', worn: 'danger' };

interface BookCardProps { book: Book; onDelete?: (id: string) => void; onUpdate?: (id: string, updated: Partial<Book>) => void; showOwnerActions?: boolean; }

export function BookCard({ book, onDelete, onUpdate, showOwnerActions = false }: BookCardProps) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const { isAuthenticated, user } = useAuth();
    const { t } = useLanguage();
    const navigate = useNavigate();
    const isOwner = !!user && user.id === book.ownerId;

    return (
        <div className="group relative flex flex-row overflow-hidden rounded-[24px] hover:shadow-lg transition-all duration-300 min-h-[160px] h-full" style={{ background: 'var(--navbar-bg)', border: '1px solid var(--navbar-border)' }}>
            {!isOwner && (
                <span className={`absolute top-2 right-2 z-20 text-xs font-bold px-2.5 py-1 rounded-full ${book.isAvailable ? 'bg-[#40916c] text-white' : 'bg-red-500 text-white'}`}>
                    {book.isAvailable ? t.books.available : t.books.unavailable}
                </span>
            )}
            <div className="relative w-32 flex-shrink-0 self-stretch">
                <BookCoverImage id={book.id} title={book.title} coverUrl={book.coverUrl} isAvailable={book.isAvailable} isFavorite={isFavorite(book.id)} onFavoriteToggle={() => toggleFavorite(book.id)} isOwner={isOwner} />
            </div>
            <div className="flex flex-col flex-1 p-3 min-w-0 gap-1.5">
                <div>
                    <h3 className="font-bold text-sm text-(--color-text) line-clamp-2 leading-snug mb-0.5 group-hover:text-(--color-accent) transition-colors duration-200">{book.title}</h3>
                    <p className="text-xs text-(--color-text-muted) font-medium">{book.author}</p>
                </div>
                {isAuthenticated && book.rating !== undefined && <BookRating rating={book.rating} />}
                <div className="flex items-center gap-1.5 flex-wrap">
                    {isAuthenticated && <Badge variant={conditionVariant[book.condition]}>{book.condition}</Badge>}
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full capitalize" style={{ color: 'var(--navbar-text-muted)', background: 'var(--color-surface-alt)' }}>{book.genre}</span>
                </div>
                {isAuthenticated && !isOwner && <BookCardOwner ownerId={book.ownerId} />}
                {!isAuthenticated && <p className="text-xs text-(--color-text-muted) italic">Sign in to see more details</p>}
                <div className="mt-auto">
                    {isAuthenticated ? (
                        <BookCardActions book={book} isOwner={isOwner} onDelete={onDelete} onUpdate={onUpdate} showOwnerActions={showOwnerActions} />
                    ) : (
                        <button onClick={() => navigate('/sign-in')} className="w-full text-center py-2 px-3 rounded-[14px] bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-sm font-semibold transition-all duration-200">
                            Sign in to view
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}