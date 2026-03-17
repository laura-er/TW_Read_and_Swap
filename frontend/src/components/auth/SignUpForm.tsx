import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';

export function SignUpForm() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const nameRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const name = nameRef.current?.value ?? '';
        const username = usernameRef.current?.value ?? '';
        const email = emailRef.current?.value ?? '';
        const password = passwordRef.current?.value ?? '';
        const confirmPassword = confirmPasswordRef.current?.value ?? '';

        if (password.length < 8) {
            setError('Password must be at least 8 characters.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setIsLoading(true);

        try {
            // TODO: replace with real API call
            login({ id: '1', name, email, role: 'user', username, avatarUrl: '', bio: '', location: '', joinedAt: new Date().toISOString() });
            navigate('/sign-in');
        } catch {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
                label="Full name"
                type="text"
                placeholder="Jane Doe"
                ref={nameRef}
                required
            />
            <Input
                label="Username"
                type="text"
                placeholder="janedoe"
                ref={usernameRef}
                required
            />
            <Input
                label="Email"
                type="email"
                placeholder="you@example.com"
                ref={emailRef}
                required
            />
            <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                ref={passwordRef}
                minLength={8}
                required
            />
            <Input
                label="Confirm password"
                type="password"
                placeholder="••••••••"
                ref={confirmPasswordRef}
                error={error}
                required
            />
            <p className="text-xs text-[var(--color-text-muted)]">
                By signing up, you agree to our{' '}
                <span className="text-[var(--color-accent)]">Terms of Service</span> and{' '}
                <span className="text-[var(--color-accent)]">Privacy Policy</span>.
            </p>
            <Button type="submit" isLoading={isLoading} className="w-full justify-center">
                Create account
            </Button>
        </form>
    );
}
