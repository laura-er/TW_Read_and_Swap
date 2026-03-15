import { useNavigate } from 'react-router-dom';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

interface LoginPromptModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function LoginPromptModal({ isOpen, onClose }: LoginPromptModalProps) {
    const navigate = useNavigate();

    const handleSignIn = () => {
        onClose();
        navigate('/sign-in');
    };

    const handleSignUp = () => {
        onClose();
        navigate('/sign-up');
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Sign in to save favorites" size="sm">
            <p className="text-sm text-[var(--color-text-muted)] mb-5">
                You need an account to add books to your favorites list.
            </p>
            <div className="flex gap-3">
                <Button variant="secondary" onClick={onClose} className="flex-1 justify-center">
                    Cancel
                </Button>
                <Button variant="secondary" onClick={handleSignUp} className="flex-1 justify-center">
                    Sign Up
                </Button>
                <Button variant="primary" onClick={handleSignIn} className="flex-1 justify-center">
                    Sign In
                </Button>
            </div>
        </Modal>
    );
}
