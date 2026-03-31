import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';
import axiosInstance from '@/api/axiosInstance';

type USignupData = {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phone: string;
    password: string;
    confirm: string;
};

type FieldProps = {
    label: string;
    name: keyof USignupData;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    ph: string;
    toggle?: boolean;
    show?: boolean;
    onToggle?: () => void;
    isDark: boolean;
};

function Field({ label, name, value, onChange, type = 'text', ph, toggle, show, onToggle, isDark }: FieldProps) {
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

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={lbl}>{label}</label>
            <div style={{ position: 'relative' }}>
                <input
                    name={name}
                    value={value}
                    onChange={onChange}
                    type={toggle ? (show ? 'text' : 'password') : type}
                    placeholder={ph}
                    required={name !== 'phone'}
                    style={{ ...inp, paddingRight: toggle ? '36px' : '12px' }}
                    onFocus={focus}
                    onBlur={blur}
                />
                {toggle && (
                    <button type="button" onClick={onToggle}
                            style={{
                                position: 'absolute', right: '10px', top: '50%',
                                transform: 'translateY(-50%)', fontSize: '12px',
                                background: 'none', border: 'none', cursor: 'pointer',
                                color: isDark ? '#7a5a30' : '#8a6830',
                            }}>
                        {show ? '🙈' : '👁️'}
                    </button>
                )}
            </div>
        </div>
    );
}

export function SignUpForm() {
    const { isDark } = useTheme();
    const navigate = useNavigate();

    const [form, setForm] = useState<USignupData>({
        firstName: '', lastName: '', username: '',
        email: '', phone: '', password: '', confirm: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (form.password.length < 8) { setError('Min. 8 characters.'); return; }
        if (form.password !== form.confirm) { setError('Passwords do not match.'); return; }
        setIsLoading(true);
        try {
            await axiosInstance.post('/api/users/register', {
                firstName: form.firstName,
                lastName: form.lastName,
                username: form.username,
                email: form.email,
                phone: form.phone,
                password: form.password,
            });
            navigate('/sign-in');
        } catch {
            setError('Email already in use or something went wrong.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <Field label="First Name" name="firstName" value={form.firstName} onChange={handleChange} ph="Jane" isDark={isDark} />
                <Field label="Last Name"  name="lastName"  value={form.lastName}  onChange={handleChange} ph="Doe"  isDark={isDark} />
            </div>

            <Field label="Username" name="username" value={form.username} onChange={handleChange} ph="janedoe" isDark={isDark} />
            <Field label="Email"    name="email"    value={form.email}    onChange={handleChange} type="email" ph="you@example.com" isDark={isDark} />
            <Field label="Phone"    name="phone"    value={form.phone}    onChange={handleChange} ph="069123456" isDark={isDark} />
            <Field label="Password" name="password" value={form.password} onChange={handleChange} ph="Min. 8 chars"
                   toggle show={showPass} onToggle={() => setShowPass(p => !p)} isDark={isDark} />
            <Field label="Confirm"  name="confirm"  value={form.confirm}  onChange={handleChange} ph="Repeat password"
                   toggle show={showConfirm} onToggle={() => setShowConfirm(p => !p)} isDark={isDark} />

            {error && (
                <p style={{ fontSize: '11px', color: '#e05030', marginTop: '-2px' }}>⚠ {error}</p>
            )}

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
