import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { SwapGuidelinesBox } from './SwapGuidelinesBox';
import { mockBooks } from '@/data/mockBooks';
import type { Book } from '@/types';

interface SwapFormData {
    offeredBookId: string;
    message: string;
    contactEmail: string;
}

interface SwapFormProps {
    book: Book;
}

export function SwapForm({ book }: SwapFormProps) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<SwapFormData>({
        offeredBookId: '',
        message: '',
        contactEmail: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Partial<SwapFormData>>({});

    // TODO: replace with current user's books from API
    const userBooks = mockBooks.filter((b) => b.id !== book.id).slice(0, 5);

    const validate = (): boolean => {
        const newErrors: Partial<SwapFormData> = {};
        if (!formData.offeredBookId) newErrors.offeredBookId = 'Please select a book to offer.';
        if (!formData.message) newErrors.message = 'Please write a message.';
        if (!formData.contactEmail) newErrors.contactEmail = 'Please enter your email.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setIsLoading(true);
        // TODO: replace with real API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsLoading(false);
        navigate(`/swap/${book.id}/success`);
    };

    return (
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
            <h1 className="font-['Playfair_Display'] text-2xl font-bold text-[var(--color-text)] mb-1">
                Request Book Swap
            </h1>
            <p className="text-sm text-[var(--color-text-muted)] mb-6">
                Fill out the form below to send a swap request
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Select book to offer */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-[var(--color-text)]">
                        Book to Offer <span className="text-red-500">*</span>
                    </label>
                    <select
                        value={formData.offeredBookId}
                        onChange={(e) => setFormData((p) => ({ ...p, offeredBookId: e.target.value }))}
                        className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-all"
                    >
                        <option value="">Choose a book from your collection...</option>
                        {userBooks.map((b) => (
                            <option key={b.id} value={b.id}>
                                {b.title} — {b.author} ({b.condition})
                            </option>
                        ))}
                    </select>
                    {errors.offeredBookId && (
                        <p className="text-xs text-red-500">{errors.offeredBookId}</p>
                    )}
                    <p className="text-xs text-[var(--color-text-muted)]">
                        Don't see your book?{' '}
                        <Link to="/books/add" className="text-[var(--color-accent)] hover:underline">
                            Add it first
                        </Link>
                    </p>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-[var(--color-text)]">
                        Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        rows={4}
                        placeholder="Introduce yourself and explain why you'd like to swap..."
                        value={formData.message}
                        onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                        className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-all resize-none"
                    />
                    {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
                </div>

                {/* Email */}
                <Input
                    label="Contact Email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData((p) => ({ ...p, contactEmail: e.target.value }))}
                    error={errors.contactEmail}
                    required
                />

                <SwapGuidelinesBox />

                <div className="flex gap-3 pt-2">
                    <Button type="submit" isLoading={isLoading} className="flex-1 justify-center">
                        Send Swap Request
                    </Button>
                    <Link
                        to={`/books/${book.id}`}
                        className="inline-flex items-center justify-center rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-surface-alt)] transition-all"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
}
