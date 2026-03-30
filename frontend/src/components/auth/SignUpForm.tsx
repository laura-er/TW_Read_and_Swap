import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';
import axiosInstance from '@/api/axiosInstance';

export function SignUpForm() {
    const { isDark } = useTheme();
    const navigate = useNavigate();

    const firstNameRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmRef = useRef<HTMLInputElement>(null);

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const inp: React.CSSProperties = {
        width: '100%', boxSizing: 'border-box',
        padding: '9px 12px', fontSize: '12px', borderRadius: '10px',
        background: isDark ? 'rgba(40,26,10,0.9)' : 'rgba(255,248,230,0.9)',
        border: isDark ? '1px solid rgba(180,120,40,0.22)' : '1px solid rgba(190,150,60,0.35)',
        color: isDark ? '#e8d5b0' : '#2a1f08',
        outline: 'none', transition: 'border-color 0.15s, box-shadow 0.15s',
    };
    const lbl: React.CSSProperties = {
        fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em',
        textTransform: 'uppercase', color: isDark ? '#7a5a30' : '#8a6830',
    };
    const focus = (e: React.FocusEvent<HTMLInputElement>) => {
        e.currentTarget.style.borderColor = isDark ? 'rgba(212,112,58,0.7)' : 'rgba(180,120,30,0.7)';
        e.currentTarget.style.boxShadow = isDark ? '0 0 0 3px rgba(212,112,58,0.1)' : '0 0 0 3px rgba(180,120,30,0.1)';
    };
    const blur = (e: React.FocusEvent<HTMLInputElement>) => {
        e.currentTarget.style.borderColor = isDark ? 'rgba(180,120,40,0.22)' : 'rgba(190,150,60,0.35)';
        e.currentTarget.style.boxShadow = 'none';
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const firstName = firstNameRef.current?.value ?? '';
        const username = usernameRef.current?.value ?? '';
        const email = emailRef.current?.value ?? '';
        const phone = phoneRef.current?.value ?? '';
        const password = passwordRef.current?.value ?? '';
        const confirm = confirmRef.current?.value ?? '';

        if (password.length < 8) { setError('Min. 8 characters.'); return; }
        if (password !== confirm) { setError('Passwords do not match.'); return; }

        setIsLoading(true);
        try {
            await axiosInstance.post('/api/users/register', {
                firstName,
                username,
                email,
                phone,
                password
            });
            navigate('/sign-in');
        } catch {
            setError('Email already in use or something went wrong.');
        } finally {
            setIsLoading(false);
        }
    };

    const Field = ({ label, r, type = 'text', ph, toggle, show, onT }: {
        label: string; r: React.RefObject<HTMLInputElement | null>;
        type?: string; ph: string; toggle?: boolean; show?: boolean; onT?: () => void;
    }) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={lbl}>{label}</label>
            <div style={{ position: 'relative' }}>
                <input ref={r} type={toggle ? (show ? 'text' : 'password') : type}
                       placeholder={ph} required
                       style={{ ...inp, paddingRight: toggle ? '36px' : '12px' }}
                       onFocus={focus} onBlur={blur} />
                {toggle && (
                    <button type="button" onClick={onT}
                            style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
                                fontSize: '12px', background: 'none', border: 'none', cursor: 'pointer',
                                color: isDark ? '#7a5a30' : '#8a6830' }}>
                        {show ? '🙈' : '👁️'}
                    </button>
                )}
            </div>
        </div>
    );

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <Field label="First Name" r={firstNameRef} ph="Jane" />
                <Field label="Username" r={usernameRef} ph="janedoe" />
            </div>

            <Field label="Email" r={emailRef} type="email" ph="you@example.com" />
            <Field label="Phone" r={phoneRef} ph="069123456" />
            <Field label="Password" r={passwordRef} ph="Min. 8 chars"
                   toggle show={showPass} onT={() => setShowPass(p => !p)} />
            <Field label="Confirm" r={confirmRef} ph="Repeat password"
                   toggle show={showConfirm} onT={() => setShowConfirm(p => !p)} />

            {error && <p style={{ fontSize: '11px', color: '#e05030', marginTop: '-2px' }}>⚠ {error}</p>}

            <p style={{ fontSize: '10px', color: isDark ? '#5a4020' : '#8a6830', lineHeight: 1.5 }}>
                By signing up you agree to our{' '}
                <span style={{ color: isDark ? '#d4703a' : '#9a4a1e', cursor: 'pointer' }}>Terms</span>
                {' '}and{' '}
                <span style={{ color: isDark ? '#d4703a' : '#9a4a1e', cursor: 'pointer' }}>Privacy Policy</span>.
            </p>

            <button type="submit" disabled={isLoading} style={{
                width: '100%', padding: '10px', borderRadius: '10px', border: 'none',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                background: isDark ? 'linear-gradient(135deg, #d4703a, #b85a28)' : 'linear-gradient(135deg, #b8621e, #9a4a16)',
                color: 'white', fontSize: '12px', fontWeight: 600,
                boxShadow: isDark ? '0 4px 20px rgba(212,112,58,0.35)' : '0 4px 20px rgba(154,74,30,0.30)',
                opacity: isLoading ? 0.7 : 1,
            }}>
                {isLoading ? 'Creating...' : 'Create account →'}
            </button>
        </form>
    );
}

