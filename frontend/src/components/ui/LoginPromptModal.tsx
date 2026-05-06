import { useNavigate } from 'react-router-dom';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/context/LanguageContext';

interface LoginPromptModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function LoginPromptModal({ isOpen, onClose }: LoginPromptModalProps) {
    const navigate = useNavigate();
    const { t } = useLanguage();

    const handleSignIn = () => { onClose(); navigate('/sign-in'); };
    const handleSignUp = () => { onClose(); navigate('/sign-up'); };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={t.auth.signIn} size="sm">
            <p className="text-sm text-[var(--color-text-muted)] mb-5">
                {t.books.signInToReview}
            </p>
            <div className="flex gap-3">
                <Button variant="secondary" onClick={onClose} className="flex-1 justify-center">{t.common.cancel}</Button>
                <Button variant="secondary" onClick={handleSignUp} className="flex-1 justify-center">{t.auth.signUp}</Button>
                <Button variant="primary" onClick={handleSignIn} className="flex-1 justify-center">{t.auth.signIn}</Button>
            </div>
        </Modal>
    );
}
