import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import axiosInstance from '@/api/axiosInstance';
import { TermsModal } from './TermsModal';
import { PrivacyModal } from './PrivacyModal';

type USignupData = { firstName: string; lastName: string; username: string; email: string; phone: string; password: string; confirm: string; };
type FieldProps = { label: string; name: keyof USignupData; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; type?: string; ph: string; toggle?: boolean; show?: boolean; onToggle?: () => void; isDark: boolean; hasError?: boolean; };

function Field({ label, name, value, onChange, type = 'text', ph, toggle, show, onToggle, isDark, hasError }: FieldProps) {
    const inp: React.CSSProperties = { width: '100%', boxSizing: 'border-box', padding: '9px 12px', fontSize: '12px', borderRadius: '10px', background: isDark ? 'rgba(40,26,10,0.9)' : 'rgba(255,248,230,0.9)', border: hasError ? '1.5px solid #e05030' : isDark ? '1px solid rgba(180,120,40,0.22)' : '1px solid rgba(190,150,60,0.35)', color: isDark ? '#e8d5b0' : '#2a1f08', outline: 'none', transition: 'border-color 0.15s, box-shadow 0.15s', boxShadow: hasError ? '0 0 0 3px rgba(224,80,48,0.15)' : 'none' };
    const lbl: React.CSSProperties = { fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: hasError ? '#e05030' : isDark ? '#7a5a30' : '#8a6830' };
    const focus = (e: React.FocusEvent<HTMLInputElement>) => { if (hasError) return; e.currentTarget.style.borderColor = isDark ? 'rgba(212,112,58,0.7)' : 'rgba(180,120,30,0.7)'; e.currentTarget.style.boxShadow = isDark ? '0 0 0 3px rgba(212,112,58,0.1)' : '0 0 0 3px rgba(180,120,30,0.1)'; };
    const blur = (e: React.FocusEvent<HTMLInputElement>) => { if (hasError) return; e.currentTarget.style.borderColor = isDark ? 'rgba(180,120,40,0.22)' : 'rgba(190,150,60,0.35)'; e.currentTarget.style.boxShadow = 'none'; };
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={lbl}>{label}</label>
            <div style={{ position: 'relative' }}>
                <input name={name} value={value} onChange={onChange} type={toggle ? (show ? 'text' : 'password') : type} placeholder={ph} required={name !== 'phone'} style={{ ...inp, paddingRight: toggle ? '36px' : '12px' }} onFocus={focus} onBlur={blur} />
                {toggle && <button type="button" onClick={onToggle} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', fontSize: '12px', background: 'none', border: 'none', cursor: 'pointer', color: isDark ? '#7a5a30' : '#8a6830' }}>{show ? '🙈' : '👁️'}</button>}
            </div>
        </div>
    );
}

export function SignUpForm() {
    const { isDark } = useTheme();
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [form, setForm] = useState<USignupData>({ firstName: '', lastName: '', username: '', email: '', phone: '', password: '', confirm: '' });
    const [error, setError] = useState('');
    const [errorField, setErrorField] = useState<keyof USignupData | 'server' | ''>('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showTerms, setShowTerms] = useState(false);
    const [showPrivacy, setShowPrivacy] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        if (errorField === name || errorField === 'server') { setError(''); setErrorField(''); }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); setError(''); setErrorField('');
        if (form.firstName.length < 2 || form.firstName.length > 30) { setErrorField('firstName'); return setError('First name must be between 2 and 30 characters.'); }
        if (form.lastName.length < 2 || form.lastName.length > 30) { setErrorField('lastName'); return setError('Last name must be between 2 and 30 characters.'); }
        if (form.username.length < 2 || form.username.length > 30) { setErrorField('username'); return setError('Username must be between 2 and 30 characters.'); }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { setErrorField('email'); return setError('Please enter a valid email address.'); }
        if (form.phone && (form.phone.length < 7 || form.phone.length > 12)) { setErrorField('phone'); return setError('Phone number must be between 7 and 12 digits.'); }
        if (form.password.length < 8) { setErrorField('password'); return setError('Password must be at least 8 characters.'); }
        if (form.password !== form.confirm) { setErrorField('confirm'); return setError('Passwords do not match.'); }
        setIsLoading(true);
        try {
            await axiosInstance.post('/api/users/register', { firstName: form.firstName, lastName: form.lastName, username: form.username, email: form.email, phone: form.phone, password: form.password });
            navigate('/sign-in');
        } catch (err: any) {
            const msg = err?.response?.data;
            if (typeof msg === 'string' && msg.length < 100) { setError(msg); if (msg.toLowerCase().includes('email')) setErrorField('email'); else if (msg.toLowerCase().includes('username')) setErrorField('username'); else setErrorField('server'); }
            else { setErrorField('server'); setError('Something went wrong. Please try again.'); }
        } finally { setIsLoading(false); }
    };

    const linkStyle: React.CSSProperties = { color: isDark ? '#d4703a' : '#9a4a1e', cursor: 'pointer', textDecoration: 'underline', background: 'none', border: 'none', padding: 0, fontSize: 'inherit', fontFamily: 'inherit' };

    return (
        <>
            <TermsModal isOpen={showTerms} onClose={() => setShowTerms(false)} />
            <PrivacyModal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} />

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <Field label={t.auth.firstName} name="firstName" value={form.firstName} onChange={handleChange} ph="Jane" isDark={isDark} hasError={errorField === 'firstName'} />
                    <Field label={t.auth.lastName}  name="lastName"  value={form.lastName}  onChange={handleChange} ph="Doe"  isDark={isDark} hasError={errorField === 'lastName'} />
                </div>
                <Field label={t.auth.username} name="username" value={form.username} onChange={handleChange} ph="janedoe" isDark={isDark} hasError={errorField === 'username'} />
                <Field label={t.auth.email}    name="email"    value={form.email}    onChange={handleChange} type="email" ph="you@example.com" isDark={isDark} hasError={errorField === 'email'} />
                <Field label={t.auth.phone}    name="phone"    value={form.phone}    onChange={handleChange} ph="069123456" isDark={isDark} hasError={errorField === 'phone'} />
                <Field label={t.auth.password} name="password" value={form.password} onChange={handleChange} ph="Min. 8 chars" toggle show={showPass} onToggle={() => setShowPass(p => !p)} isDark={isDark} hasError={errorField === 'password'} />
                <Field label={t.auth.confirm}  name="confirm"  value={form.confirm}  onChange={handleChange} ph="Repeat password" toggle show={showConfirm} onToggle={() => setShowConfirm(p => !p)} isDark={isDark} hasError={errorField === 'confirm'} />
                {error && <p style={{ fontSize: '11px', color: '#e05030', marginTop: '-2px' }}>⚠ {error}</p>}
                <p style={{ fontSize: '10px', color: isDark ? '#5a4020' : '#8a6830', lineHeight: 1.5 }}>
                    {t.auth.terms}{' '}
                    <button type="button" style={linkStyle} onClick={() => setShowTerms(true)}>{t.auth.termsLink}</button>
                    {' '}{t.auth.and}{' '}
                    <button type="button" style={linkStyle} onClick={() => setShowPrivacy(true)}>{t.auth.privacyLink}</button>.
                </p>
                <button type="submit" disabled={isLoading} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: 'none', cursor: isLoading ? 'not-allowed' : 'pointer', background: isDark ? 'linear-gradient(135deg, #d4703a, #b85a28)' : 'linear-gradient(135deg, #b8621e, #9a4a16)', color: 'white', fontSize: '12px', fontWeight: 600, boxShadow: isDark ? '0 4px 20px rgba(212,112,58,0.35)' : '0 4px 20px rgba(154,74,30,0.30)', opacity: isLoading ? 0.7 : 1 }}>
                    {isLoading ? t.auth.creating : t.auth.createBtn}
                </button>
            </form>
        </>
    );
}