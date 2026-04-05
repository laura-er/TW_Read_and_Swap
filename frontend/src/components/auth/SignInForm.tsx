import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import axiosInstance from '@/api/axiosInstance';

type USigninData = {
    emailOrUsername: string;
    password: string;
};

export function SignInForm() {
    const { login } = useAuth();
    const { isDark } = useTheme();
    const navigate = useNavigate();

    const [form, setForm] = useState<USigninData>({
        emailOrUsername: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        if (hasError) {
            setError('');
            setHasError(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setHasError(false);
        setIsLoading(true);
        try {
            const response = await axiosInstance.post('/api/users/login', {
                emailOrUsername: form.emailOrUsername,
                password: form.password,
            });
            const userData = response.data;
            login({
                id: String(userData.id),
                name: userData.firstName,
                email: userData.email,
                role: userData.role,
                username: userData.username,
                token: userData.token,
                avatarUrl: '',
                bio: '',
                location: '',
                joinedAt: userData.createdAt,
            });
            if (userData.role === 'admin') navigate('/admin');
            else navigate('/');
        } catch (err: any) {
            setHasError(true);
            const msg = err?.response?.data;
            if (typeof msg === 'string' && msg.length < 100) {
                setError(msg);
            } else {
                setError('Invalid email/username or password.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const getInputStyle = (isError: boolean): React.CSSProperties => ({
        width: '100%', boxSizing: 'border-box',
        padding: '9px 12px', fontSize: '12px', borderRadius: '10px',
        background: isDark ? 'rgba(40,26,10,0.9)' : 'rgba(255,248,230,0.9)',
        border: isError
            ? '1.5px solid #e05030'
            : isDark ? '1px solid rgba(180,120,40,0.22)' : '1px solid rgba(190,150,60,0.35)',
        color: isDark ? '#e8d5b0' : '#2a1f08',
        outline: 'none', transition: 'border-color 0.15s, box-shadow 0.15s',
        boxShadow: isError ? '0 0 0 3px rgba(224,80,48,0.15)' : 'none',
    });

    const lbl: React.CSSProperties = {
        fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: hasError ? '#e05030' : isDark ? '#7a5a30' : '#8a6830',
    };

    const focus = (e: React.FocusEvent<HTMLInputElement>) => {
        if (hasError) return;
        e.currentTarget.style.borderColor = isDark ? 'rgba(212,112,58,0.7)' : 'rgba(180,120,30,0.7)';
        e.currentTarget.style.boxShadow = isDark ? '0 0 0 3px rgba(212,112,58,0.1)' : '0 0 0 3px rgba(180,120,30,0.1)';
    };
    const blur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (hasError) return;
        e.currentTarget.style.borderColor = isDark ? 'rgba(180,120,40,0.22)' : 'rgba(190,150,60,0.35)';
        e.currentTarget.style.boxShadow = 'none';
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={lbl}>Email or Username</label>
                <input
                    name="emailOrUsername"
                    value={form.emailOrUsername}
                    onChange={handleChange}
                    type="text"
                    placeholder="you@example.com or janedoe"
                    required
                    style={getInputStyle(hasError)}
                    onFocus={focus}
                    onBlur={blur}
                />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={lbl}>Password</label>
                    <Link to="/forgot-password"
                          style={{ fontSize: '11px', color: isDark ? '#d4703a' : '#9a4a1e' }}>
                        Forgot?
                    </Link>
                </div>
                <div style={{ position: 'relative' }}>
                    <input
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        type={showPass ? 'text' : 'password'}
                        placeholder="••••••••"
                        required
                        minLength={8}
                        style={{ ...getInputStyle(hasError), paddingRight: '36px' }}
                        onFocus={focus}
                        onBlur={blur}
                    />
                    <button type="button" onClick={() => setShowPass(p => !p)}
                            style={{
                                position: 'absolute', right: '10px', top: '50%',
                                transform: 'translateY(-50%)', fontSize: '12px',
                                background: 'none', border: 'none', cursor: 'pointer',
                                color: isDark ? '#7a5a30' : '#8a6830',
                            }}>
                        {showPass ? '🙈' : '👁️'}
                    </button>
                </div>
            </div>

            {error && (
                <p style={{ fontSize: '11px', color: '#e05030', marginTop: '-4px' }}>⚠ {error}</p>
            )}

            <button type="submit" disabled={isLoading} style={{
                marginTop: '2px', width: '100%', padding: '10px',
                borderRadius: '10px', border: 'none',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                background: isDark ? 'linear-gradient(135deg, #d4703a, #b85a28)' : 'linear-gradient(135deg, #b8621e, #9a4a16)',
                color: 'white', fontSize: '12px', fontWeight: 600,
                boxShadow: isDark ? '0 4px 20px rgba(212,112,58,0.35)' : '0 4px 20px rgba(154,74,30,0.30)',
                opacity: isLoading ? 0.7 : 1,
            }}>
                {isLoading ? 'Signing in...' : 'Sign in →'}
            </button>

        </form>
    );
}