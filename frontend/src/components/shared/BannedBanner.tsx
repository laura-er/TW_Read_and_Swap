import { useBan } from '@/context/BanContext';
import { useAuth } from '@/context/AuthContext';

const DURATION_LABELS: Record<string, string> = {
    '1d': '1 zi', '3d': '3 zile', '7d': '7 zile', '30d': '30 de zile', 'permanent': 'permanent',
};

export function BannedBanner() {
    const { user } = useAuth();
    const { getBan } = useBan();
    if (!user) return null;
    const ban = getBan(user.id);
    if (!ban) return null;

    const expiresText = ban.expiresAt
        ? `până pe ${new Date(ban.expiresAt).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' })}`
        : 'permanent';

    return (
        <div style={{
            margin: '16px 0',
            padding: '14px 18px',
            borderRadius: '14px',
            background: 'rgba(220, 50, 50, 0.08)',
            border: '1px solid rgba(220, 50, 50, 0.3)',
            display: 'flex',
            gap: '12px',
            alignItems: 'flex-start',
        }}>
            <span style={{ fontSize: '20px', flexShrink: 0 }}>🚫</span>
            <div>
                <p style={{ fontSize: '13px', fontWeight: 700, color: '#c0392b', marginBottom: '4px' }}>
                    Contul tău este suspendat {expiresText}
                </p>
                <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                    <strong>Motiv:</strong> {ban.reason}.
                    {ban.message && <> {ban.message}</>}
                </p>
            </div>
        </div>
    );
}