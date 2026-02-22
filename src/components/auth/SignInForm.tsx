import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';

export function SignInForm() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            if (email && password) {
                const isAdmin = email === 'admin@test.com';
                login({
                    id: isAdmin ? 'admin1' : 'user1',
                    name: isAdmin ? 'Admin' : 'User',
                    email,
                    role: isAdmin ? 'admin' : 'user',
                    username: isAdmin ? 'admin' : 'user',
                    avatarUrl: '',
                    bio: '',
                    location: '',
                    joinedAt: new Date().toISOString(),
                });
                navigate(isAdmin ? '/admin' : '/');
            } else {
                setError('Please fill in all fields.');
            }
        } catch {
            setError('Invalid email or password.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
                label="Email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={error}
                minLength={8}
                required
            />
            <div className="text-right">
                <Link
                    to="/forgot-password"
                    className="text-xs text-[var(--color-accent)] hover:underline"
                >
                    Forgot password?
                </Link>
            </div>
            <Button type="submit" isLoading={isLoading} className="w-full justify-center">
                Sign in
            </Button>

            <button
                type="button"
                onClick={() => {
                    login({
                        id: 'admin1',
                        name: 'Admin',
                        email: 'admin@readandswap.com',
                        role: 'admin',
                        username: 'admin',
                        avatarUrl: '',
                        bio: '',
                        location: '',
                        joinedAt: new Date().toISOString(),
                    });
                    navigate('/admin');
                }}
                className="w-full text-center text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent)] py-2 border border-dashed border-[var(--color-border)] rounded-lg transition-colors"
            >
                🔧 Login as Admin (dev only)
            </button>
        </form>
    );
}
