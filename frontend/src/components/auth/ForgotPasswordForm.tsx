import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/context/LanguageContext';

export function ForgotPasswordForm() {
    const { t, language } = useLanguage();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 800));
            setSent(true);
        } catch {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (sent) return (
        <p className="text-sm text-[var(--color-text-muted)] text-center py-4">
            ✅ {language === 'ro' ? `Verifică-ți inbox-ul — am trimis un link de resetare la` : 'Check your inbox — we sent a reset link to'} <strong>{email}</strong>.
        </p>
    );

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input label={t.auth.email} type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} error={error} required />
            <Button type="submit" isLoading={isLoading} className="w-full justify-center">
                {language === 'ro' ? 'Trimite link de resetare' : 'Send reset link'}
            </Button>
        </form>
    );
}
