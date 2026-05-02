import { BookOpen, ArrowLeftRight, Heart } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface ProfileStatsProps { favoritesCount: number; swapsCount: number; booksCount: number; }

export function ProfileStats({ favoritesCount, swapsCount, booksCount }: ProfileStatsProps) {
    const { t } = useLanguage();
    const stats = [
        { icon: <BookOpen size={16} />, value: booksCount,      label: t.profile.booksListed, color: 'var(--color-accent)' },
        { icon: <ArrowLeftRight size={16} />, value: swapsCount, label: t.profile.swapsDone,   color: '#40916c' },
        { icon: <Heart size={16} />, value: favoritesCount,      label: t.profile.favorites,   color: '#c0392b' },
    ];
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {stats.map(({ icon, value, label, color }) => (
                <div key={label} style={{ borderRadius: '16px', padding: '14px', textAlign: 'center', background: 'var(--lib-stats)', border: '1px solid var(--lib-border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', color, marginBottom: '4px' }}>{icon}</div>
                    <p className="font-['Playfair_Display']" style={{ fontSize: '20px', fontWeight: 700, color: 'var(--lib-text)' }}>{value}</p>
                    <p style={{ fontSize: '11px', color: 'var(--lib-text-faint)', marginTop: '1px' }}>{label}</p>
                </div>
            ))}
        </div>
    );
}