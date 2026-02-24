import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import { EditBookModal } from './EditBookModal';
import type { Book } from '@/types';

interface BookCardActionsProps {
    book: Book;
    isOwner: boolean;
}

export function BookCardActions({ book, isOwner }: BookCardActionsProps) {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [showEditModal, setShowEditModal] = useState(false);

    const handleSave = (updated: Partial<Book>) => {
        // TODO: trimite datele la backend
        console.log('Updated book:', { ...book, ...updated });
    };

    return (
        <>
            <div className="flex gap-2 mt-auto pt-2">
                {isAuthenticated ? (
                    <Link
                        to={`/books/${book.id}`}
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

                {isOwner ? (
                    <button
                        onClick={() => setShowEditModal(true)}
                        className="flex-1 text-center py-2 px-3 rounded-lg bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-sm font-semibold transition-all duration-200 shadow-sm"
                    >
                        Edit Book
                    </button>
                ) : book.isAvailable ? (
                    <Link
                        to={`/swap/${book.id}`}
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

            {showEditModal && (
                <EditBookModal
                    book={book}
                    onClose={() => setShowEditModal(false)}
                    onSave={handleSave}
                />
            )}
        </>
    );
}
