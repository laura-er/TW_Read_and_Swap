import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { EditBookModal } from './EditBookModal';
import axiosInstance from '@/api/axiosInstance';
import type { Book } from '@/types';

interface BookCardActionsProps { book: Book; isOwner: boolean; onDelete?: (id: string) => void; showOwnerActions?: boolean; }

export function BookCardActions({ book, isOwner, onDelete, showOwnerActions = false }: BookCardActionsProps) {
    const { isAuthenticated } = useAuth();
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const handleSave = async (updated: Partial<Book>) => {
        try {
            await axiosInstance.put(`/api/books/${book.id}`, { title: updated.title ?? book.title, author: updated.author ?? book.author, genre: updated.genre ?? book.genre, condition: updated.condition ?? book.condition, coverUrl: updated.coverUrl ?? book.coverUrl, description: updated.description ?? book.description, isAvailable: updated.isAvailable ?? book.isAvailable });
            window.location.reload();
        } catch { console.error('Failed to update book'); }
    };

    return (
        <>
            <div className="flex gap-2 mt-auto pt-2">
                {isAuthenticated ? (
                    <Link to={`/books/${book.id}`} className="flex-1 text-center py-2 px-3 rounded-lg border border-[var(--color-border)] text-[var(--color-text)] text-sm font-semibold hover:bg-[var(--color-surface-alt)] transition-all duration-200">{t.books.viewDetails}</Link>
                ) : (
                    <button onClick={() => navigate('/sign-in')} className="flex-1 text-center py-2 px-3 rounded-lg border border-[var(--color-border)] text-[var(--color-text)] text-sm font-semibold hover:bg-[var(--color-surface-alt)] transition-all duration-200">{t.books.viewDetails}</button>
                )}
                {isOwner && showOwnerActions ? (
                    <div className="flex gap-2 flex-1">
                        <button onClick={() => setShowEditModal(true)} className="flex-1 text-center py-2 px-3 rounded-lg bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-sm font-semibold transition-all duration-200 shadow-sm">{t.books.edit}</button>
                        <button onClick={() => setShowDeleteConfirm(true)} className="flex-1 text-center py-2 px-3 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-all duration-200 shadow-sm">{t.books.delete}</button>
                    </div>
                ) : isOwner ? null : book.isAvailable ? (
                    <Link to={`/swap/${book.id}`} className="flex-1 text-center py-2 px-3 rounded-lg bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-sm font-semibold transition-all duration-200 shadow-sm">{t.books.requestSwap}</Link>
                ) : (
                    <Button disabled variant="secondary" size="sm" className="flex-1 justify-center opacity-50 cursor-not-allowed">{t.books.notAvailable}</Button>
                )}
            </div>
            {showEditModal && <EditBookModal book={book} onClose={() => setShowEditModal(false)} onSave={handleSave} />}
            {showDeleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
                    <div className="w-full max-w-sm rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 flex flex-col gap-4">
                        <h2 className="text-lg font-bold text-[var(--color-text)]">{t.books.delete} Book</h2>
                        <p className="text-sm text-[var(--color-text-muted)]">Are you sure you want to delete <span className="font-semibold text-[var(--color-text)]">{book.title}</span>? This action cannot be undone.</p>
                        <div className="flex gap-2">
                            <Button variant="secondary" size="sm" className="flex-1" onClick={() => setShowDeleteConfirm(false)}>{t.common.cancel}</Button>
                            <button onClick={() => { onDelete?.(book.id); setShowDeleteConfirm(false); }} className="flex-1 py-2 px-3 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-all duration-200">{t.books.delete}</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
