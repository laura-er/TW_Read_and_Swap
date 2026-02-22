import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import { useFavorites } from '@/context/FavoritesContext';

interface BookCardActionsProps {
    id: string;
    isAvailable: boolean;
}

export function BookCardActions({ id, isAvailable }: BookCardActionsProps) {
    const { isAuthenticated } = useAuth();
    const { closeLoginModal } = useFavorites();
    const navigate = useNavigate();

    const handleViewDetails = () => {
        if (!isAuthenticated) {
            closeLoginModal();
            // refolosim același modal din FavoritesContext
            // dar avem nevoie să-l deschidem — facem asta prin toggleFavorite cu un id fals
        }
    };

    return (
        <div className="flex gap-2 mt-auto pt-2">
            {isAuthenticated ? (
                <Link
                    to={`/books/${id}`}
                    className="flex-1 text-center py-2 px-3 rounded-lg border border-[var(--color-border)] text-[var(--color-text)] text-sm font-semibold hover:bg-[var(--color-surface-alt)] transition-all duration-200"
                >
                    View Details
                </Link>
            ) : (
                <button
                    onClick={() => navigate('/sign-in')}
                    className="flex-1 text-center py-2 px-3 rounded-lg border border-[var(--color-border)] text-[var(--color-text)] text-sm font-semibold hover:bg-[var(--color-surface-alt)] transition-all duration-200"
                >
                    View Details
                </button>
            )}

            {isAvailable ? (
                <Link
                    to={`/swap/${id}`}
                    className="flex-1 text-center py-2 px-3 rounded-lg bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-sm font-semibold transition-all duration-200 shadow-sm"
                >
                    Request Swap
                </Link>
            ) : (
                <Button
                    disabled
                    variant="secondary"
                    size="sm"
                    className="flex-1 justify-center opacity-50 cursor-not-allowed"
                >
                    Not Available
                </Button>
            )}
        </div>
    );
}