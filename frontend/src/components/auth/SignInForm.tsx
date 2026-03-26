import { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';

export function SignInForm() {
    const { login } = useAuth();
    const { isDark } = useTheme();
    const navigate = useNavigate();
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);

    const inp: React.CSSProperties = {
        width: '100%', boxSizing: 'border-box',
        padding: '9px 12px', fontSize: '12px', borderRadius: '10px',
        background: isDark ? 'rgba(40,26,10,0.9)' : 'rgba(255,248,230,0.9)',
        border: isDark ? '1px solid rgba(180,120,40,0.22)' : '1px solid rgba(190,150,60,0.35)',
        color: isDark ? '#e8d5b0' : '#2a1f08',
        outline: 'none', transition: 'border-color 0.15s, box-shadow 0.15s',
    };
    const focus = (e: React.FocusEvent<HTMLInputElement>) => {
        e.currentTarget.style.borderColor = isDark ? 'rgba(212,112,58,0.7)' : 'rgba(180,120,30,0.7)';
        e.currentTarget.style.boxShadow = isDark ? '0 0 0 3px rgba(212,112,58,0.1)' : '0 0 0 3px rgba(180,120,30,0.1)';
    };
    const blur = (e: React.FocusEvent<HTMLInputElement>) => {
        e.currentTarget.style.borderColor = isDark ? 'rgba(180,120,40,0.22)' : 'rgba(190,150,60,0.35)';
        e.currentTarget.style.boxShadow = 'none';
    };

    const lbl: React.CSSProperties = {
        fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: isDark ? '#7a5a30' : '#8a6830',
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const email = emailRef.current?.value ?? '';
        const password = passwordRef.current?.value ?? '';
        setError(''); setIsLoading(true);
        try {
            if (email && password) {
                const isAdmin = email === 'admin@test.com';
                login({ id: isAdmin ? 'admin1' : 'user1', name: isAdmin ? 'Admin' : 'User',
                    email, role: isAdmin ? 'admin' : 'user', username: isAdmin ? 'admin' : 'user',
                    avatarUrl: '', bio: '', location: '', joinedAt: new Date().toISOString() });
                navigate(isAdmin ? '/admin' : '/');
            } else { setError('Please fill in all fields.'); }
        } catch { setError('Invalid email or password.'); }
        finally { setIsLoading(false); }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={lbl}>Email</label>
                <input ref={emailRef} type="email" placeholder="you@example.com" required
                       style={inp} onFocus={focus} onBlur={blur} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={lbl}>Password</label>
                    <Link to="/forgot-password" style={{ fontSize: '11px', color: isDark ? '#d4703a' : '#9a4a1e' }}
                          className="hover:opacity-75 transition-opacity">Forgot?</Link>
                </div>
                <div style={{ position: 'relative' }}>
                    <input ref={passwordRef} type={showPass ? 'text' : 'password'} placeholder="••••••••"
                           required minLength={8} style={{ ...inp, paddingRight: '36px' }}
                           onFocus={focus} onBlur={blur} />
                    <button type="button" onClick={() => setShowPass(p => !p)}
                            style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
                                fontSize: '12px', background: 'none', border: 'none', cursor: 'pointer',
                                color: isDark ? '#7a5a30' : '#8a6830' }}>
                        {showPass ? '🙈' : '👁️'}
                    </button>
                </div>
                {error && <p style={{ fontSize: '11px', color: '#e05030', marginTop: '2px' }}>⚠ {error}</p>}
            </div>

            <button type="submit" disabled={isLoading} style={{
                marginTop: '2px', width: '100%', padding: '10px',
                borderRadius: '10px', border: 'none', cursor: isLoading ? 'not-allowed' : 'pointer',
                background: isDark ? 'linear-gradient(135deg, #d4703a, #b85a28)' : 'linear-gradient(135deg, #b8621e, #9a4a16)',
                color: 'white', fontSize: '12px', fontWeight: 600,
                boxShadow: isDark ? '0 4px 20px rgba(212,112,58,0.35)' : '0 4px 20px rgba(154,74,30,0.30)',
                opacity: isLoading ? 0.7 : 1,
            }}>
                {isLoading ? 'Signing in...' : 'Sign in →'}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ flex: 1, height: '1px', background: isDark ? 'rgba(180,120,40,0.15)' : 'rgba(180,140,60,0.25)' }} />
                <span style={{ fontSize: '10px', color: isDark ? '#5a4020' : '#8a6830' }}>or</span>
                <div style={{ flex: 1, height: '1px', background: isDark ? 'rgba(180,120,40,0.15)' : 'rgba(180,140,60,0.25)' }} />
            </div>

            <button type="button" onClick={() => {
                login({ id: 'admin1', name: 'Admin', email: 'admin@readandswap.com', role: 'admin',
                    username: 'admin', avatarUrl: '', bio: '', location: '', joinedAt: new Date().toISOString() });
                navigate('/admin');
            }} style={{
                width: '100%', padding: '8px', borderRadius: '10px',
                border: isDark ? '1px dashed rgba(180,120,40,0.2)' : '1px dashed rgba(180,140,60,0.3)',
                background: 'transparent', fontSize: '11px', cursor: 'pointer',
                color: isDark ? '#5a4020' : '#8a6830',
            }}>
                🔧 Admin (dev only)
            </button>
        </form>
    );
}