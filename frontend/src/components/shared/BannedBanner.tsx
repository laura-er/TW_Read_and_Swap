import { useBan } from '@/context/BanContext';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

export function BannedBanner() {
    const { user } = useAuth();
    const { getBan } = useBan();
    const { t, language } = useLanguage();
    if (!user) return null;
    const ban = getBan(user.id);
    if (!ban) return null;

    const locale = language === 'ro' ? 'ro-RO' : 'en-US';
    const expiresText = ban.expiresAt
        ? `${t.banned.until} ${new Date(ban.expiresAt).toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })}`
        : t.banned.permanently;

    return (
        <div style={{ margin: '16px 0', padding: '14px 18px', borderRadius: '14px', background: 'rgba(220, 50, 50, 0.08)', border: '1px solid rgba(220, 50, 50, 0.3)', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '20px', flexShrink: 0 }}>🚫</span>
            <div>
                <p style={{ fontSize: '13px', fontWeight: 700, color: '#c0392b', marginBottom: '4px' }}>
                    {t.banned.accountSuspended} {expiresText}
                </p>
                <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                    <strong>{t.banned.reason}:</strong> {ban.reason}.
                    {ban.message && <> {ban.message}</>}
                </p>
            </div>
        </div>
    );
}
