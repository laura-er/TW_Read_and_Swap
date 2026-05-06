import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/context/LanguageContext';

interface Props {
    isOpen: boolean;
    userName: string;
    onConfirm: () => void;
    onClose: () => void;
}

export function ConfirmDeleteUserModal({ isOpen, userName, onConfirm, onClose }: Props) {
    const { t } = useLanguage();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-[var(--color-surface)] rounded-2xl shadow-xl w-full max-w-sm mx-4 p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-[var(--color-text)]">{t.admin.confirmDeletion}</h2>
                    <button onClick={onClose} className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">✕</button>
                </div>
                <div className="h-px bg-[var(--color-border)]" />
                <p className="text-sm text-[var(--color-text-muted)]" style={{ lineHeight: 1.6 }}>
                    {t.admin.confirmDeleteUser}{' '}
                    <strong style={{ color: 'var(--color-text)' }}>{userName}</strong>
                    {t.admin.confirmDeleteUserSuffix} <strong style={{ color: 'var(--color-text)' }}>{t.admin.confirmDeleteUserIrreversible}</strong> {t.admin.confirmDeleteUserData}
                </p>
                <div className="flex gap-2 justify-end">
                    <Button variant="ghost" size="sm" onClick={onClose}>{t.common.cancel}</Button>
                    <Button variant="danger" size="sm" onClick={() => { onConfirm(); onClose(); }}>{t.admin.yesDelete}</Button>
                </div>
            </div>
        </div>
    );
}
