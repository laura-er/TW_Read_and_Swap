import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useBan } from '@/context/BanContext';
import axiosInstance from '@/api/axiosInstance';
import { Button } from '@/components/ui/Button';
import { AddBookForm } from '@/components/client/add-book/AddBookForm';
import { BookPreviewCard } from '@/components/client/add-book/BookPreviewCard';
import { BannedBanner } from '@/components/shared/BannedBanner';
import type { AddBookFields, AddBookErrors } from '@/components/client/add-book/AddBookForm';

const DEFAULT_FIELDS: AddBookFields = { title: '', author: '', genre: 'fiction', condition: 'good', description: '', coverUrl: '' };

export function AddBookPage() {
    const { user, isAdmin } = useAuth();
    const { t } = useLanguage();
    const { isUserBanned } = useBan();
    const navigate = useNavigate();
    const [fields, setFields] = useState<AddBookFields>(DEFAULT_FIELDS);
    const [errors, setErrors] = useState<AddBookErrors>({});
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState('');

    const banned = user ? isUserBanned(user.id) : false;

    function validate(fields: AddBookFields): AddBookErrors {
        const errors: AddBookErrors = {};
        if (!fields.title.trim()) errors.title = t.validation.titleRequired;
        else if (fields.title.trim().length < 2) errors.title = t.validation.titleMin;
        else if (fields.title.trim().length > 200) errors.title = t.validation.titleMax;
        if (!fields.author.trim()) errors.author = t.validation.authorRequired;
        else if (fields.author.trim().length < 2) errors.author = t.validation.authorMin;
        else if (fields.author.trim().length > 100) errors.author = t.validation.authorMax;
        if (fields.description && fields.description.length > 1000) errors.description = t.validation.descMax;
        return errors;
    }

    const handleChange = (updated: Partial<AddBookFields>) => {
        setFields(prev => ({ ...prev, ...updated }));
        const clearedErrors = { ...errors };
        Object.keys(updated).forEach(k => delete clearedErrors[k as keyof AddBookErrors]);
        setErrors(clearedErrors);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (banned || isAdmin) return;
        const validationErrors = validate(fields);
        if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }
        if (!user) return;
        setIsLoading(true); setServerError('');
        try {
            await axiosInstance.post('/api/books', { title: fields.title.trim(), author: fields.author.trim(), genre: fields.genre, condition: fields.condition, description: fields.description?.trim() || '', coverUrl: fields.coverUrl?.trim() || '', ownerId: Number(user.id) });
            navigate('/profile');
        } catch (err: any) {
            const msg = err?.response?.data;
            setServerError(typeof msg === 'string' && msg.length < 200 ? msg : t.validation.failedAdd);
        } finally { setIsLoading(false); }
    };

    return (
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
            <Link to="/books" className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors mb-8">
                <ArrowLeft className="h-4 w-4" />{t.addBook.backToCatalog}
            </Link>

            {banned && <BannedBanner />}

            {isAdmin ? (
                <div className="rounded-2xl p-8 text-center" style={{ background: 'rgba(220,150,50,0.05)', border: '1px solid rgba(220,150,50,0.2)' }}>
                    <p style={{ fontSize: '32px', marginBottom: '12px' }}>🔒</p>
                    <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text)', marginBottom: '8px' }}>Acțiune indisponibilă</h2>
                    <p style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>Conturile de administrator nu pot adăuga cărți.</p>
                </div>
            ) : banned ? (
                <div className="rounded-2xl p-8 text-center" style={{ background: 'rgba(220,50,50,0.05)', border: '1px solid rgba(220,50,50,0.2)' }}>
                    <p style={{ fontSize: '32px', marginBottom: '12px' }}>🚫</p>
                    <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text)', marginBottom: '8px' }}>Acțiune indisponibilă</h2>
                    <p style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>Nu poți adăuga cărți cât timp contul tău este suspendat.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h1 className="font-['Playfair_Display'] text-2xl font-bold text-[var(--color-text)]">{t.addBook.title}</h1>
                        </div>
                        <div className="flex gap-3">
                            <Link to="/books"><Button variant="secondary" type="button">{t.common.cancel}</Button></Link>
                            <Button type="submit" isLoading={isLoading}>{t.addBook.submit}</Button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
                                <AddBookForm fields={fields} errors={errors} onChange={handleChange} />
                                {serverError && <p className="mt-3 text-sm text-red-500">⚠ {serverError}</p>}
                            </div>
                        </div>
                        <div className="lg:col-span-1">
                            <BookPreviewCard title={fields.title} author={fields.author} genre={fields.genre} condition={fields.condition} coverUrl={fields.coverUrl} description={fields.description} />
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
}