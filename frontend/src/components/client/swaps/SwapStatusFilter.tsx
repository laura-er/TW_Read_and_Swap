import type { SwapStatus } from '@/types';
import { useLanguage } from '@/context/LanguageContext';

type FilterStatus = 'all' | SwapStatus;
interface SwapStatusFilterProps { active: FilterStatus; onChange: (status: FilterStatus) => void; }

export function SwapStatusFilter({ active, onChange }: SwapStatusFilterProps) {
    const { t } = useLanguage();
    const filters: { key: FilterStatus; label: string; activeColor: string }[] = [
        { key: 'all',      label: t.swaps.all,      activeColor: 'var(--color-accent)' },
        { key: 'pending',  label: t.swaps.pending,  activeColor: '#e8924a' },
        { key: 'rejected', label: t.swaps.declined, activeColor: '#c0392b' },
    ];
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '6px', padding: '10px 14px', marginBottom: '20px', borderRadius: '16px', border: '1px solid var(--navbar-border)', background: 'var(--navbar-bg)', backdropFilter: 'blur(12px)' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--navbar-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginRight: '4px' }}>{t.swaps.filter}:</span>
            {filters.map(({ key, label, activeColor }) => (
                <button key={key} onClick={() => onChange(key)} style={{ padding: '5px 12px', borderRadius: '10px', fontSize: '12px', fontWeight: 600, border: 'none', cursor: 'pointer', transition: 'all 0.15s', background: active === key ? activeColor : 'transparent', color: active === key ? 'white' : 'var(--navbar-text-muted)' }}>{label}</button>
            ))}
        </div>
    );
}
