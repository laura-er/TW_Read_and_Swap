import { useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface BookDetailAddReviewProps { onSubmit: (rating: number, comment: string) => void; }

export function BookDetailAddReview({ onSubmit }: BookDetailAddReviewProps) {
    const { t } = useLanguage();
    const [rating, setRating] = useState(0);
    const commentRef = useRef<HTMLTextAreaElement>(null);

    function handleSubmit() {
        if (rating === 0) return;
        const comment = commentRef.current?.value.trim() ?? '';
        onSubmit(rating, comment);
        setRating(0);
        if (commentRef.current) commentRef.current.value = '';
    }
    function handleCancel() { setRating(0); if (commentRef.current) commentRef.current.value = ''; }

    const ratingLabels: Record<number, string> = { 1: 'Poor', 2: 'Fair', 3: 'Good', 4: 'Very Good', 5: 'Excellent' };

    return (
        <div className="bg-(--color-surface) p-4 rounded-xl border border-(--color-border)">
            <h3 className="text-base font-bold text-center mb-4 text-(--color-accent)">{t.books.writeReview}</h3>
            <div className="flex items-center justify-center gap-2 mb-6">
                {[1,2,3,4,5].map((star) => (
                    <button key={star} type="button" onClick={() => setRating(star)} className={`w-10 h-10 rounded-lg transition-all duration-300 flex items-center justify-center hover:scale-110 ${star <= rating ? 'bg-yellow-400 text-white shadow-lg' : 'bg-(--color-surface-alt) text-(--color-text-muted) border border-(--color-border) hover:bg-(--color-border)'}`}>
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                    </button>
                ))}
                <span className="ml-2 text-sm font-semibold text-(--color-accent)">{ratingLabels[rating]}</span>
            </div>
            <textarea ref={commentRef} placeholder={t.books.shareThoughts} rows={4} className="w-full p-4 text-base bg-(--color-surface-alt) border-2 border-(--color-border) text-(--color-text) placeholder:text-(--color-text-muted) rounded-xl focus:border-(--color-accent) focus:outline-none focus:ring-2 focus:ring-(--color-accent)/20 resize-none shadow-sm transition-all duration-300 mb-4" />
            <div className="flex gap-3">
                <button type="button" onClick={handleSubmit} disabled={rating === 0} className="flex-1 bg-[#40916c] hover:bg-[#2d6a4f] text-white py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">{t.books.publishReview}</button>
                <button type="button" onClick={handleCancel} className="px-4 py-2 bg-(--color-surface-alt) hover:bg-(--color-border) text-(--color-text-muted) text-sm font-semibold rounded-lg transition-all duration-200">{t.books.cancel}</button>
            </div>
        </div>
    );
}
