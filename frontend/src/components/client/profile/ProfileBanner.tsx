import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Edit, Flag } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { ReportModal } from '@/components/shared/ReportModal';
import { useLanguage } from '@/context/LanguageContext';
import type { User } from '@/types';

export function ProfileBanner({ user, isOwnProfile }: { user: User; isOwnProfile: boolean }) {
    const { t } = useLanguage();
    const [showReport, setShowReport] = useState(false);
    return (
        <>
            {showReport && <ReportModal targetId={user.id} targetName={user.username} type="user" onClose={() => setShowReport(false)} />}
            <div style={{ height: '100px', background: 'linear-gradient(135deg, var(--color-accent) 0%, rgba(154,74,30,0.4) 60%, rgba(200,150,60,0.2) 100%)', backdropFilter: 'blur(8px)' }} />
            <div style={{ padding: '0 24px 20px', background: 'var(--lib-card)' }}>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-5">
                        <div style={{ marginTop: '-40px', flexShrink: 0 }}><div style={{ borderRadius: '50%', padding: '3px', background: 'var(--lib-card)', display: 'inline-block' }}><Avatar src={user.avatarUrl} name={user.name} size="xl" /></div></div>
                        <div style={{ paddingBottom: '4px' }}>
                            <h1 className="font-['Playfair_Display'] text-xl font-bold" style={{ color: 'var(--lib-text)' }}>{user.name}</h1>
                            <p style={{ fontSize: '12px', color: 'var(--lib-text-muted)' }}>@{user.username}</p>
                            {user.bio && <p style={{ marginTop: '4px', fontSize: '12px', color: 'var(--lib-text-muted)', maxWidth: '360px' }}>{user.bio}</p>}
                            <div style={{ marginTop: '6px', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                                {user.location && <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--lib-text-faint)' }}><MapPin size={12} /> {user.location}</span>}
                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--lib-text-faint)' }}><Calendar size={12} />Joined {new Date(user.joinedAt).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</span>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', paddingBottom: '4px' }}>
                        {isOwnProfile ? (
                            <>
                                <Link to="/profile/edit" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 14px', borderRadius: '14px', border: '1px solid var(--lib-border)', background: 'transparent', color: 'var(--lib-text-muted)', fontSize: '12px', fontWeight: 500, textDecoration: 'none', transition: 'opacity 0.15s' }}><Edit size={13} /> {t.profile.editProfile}</Link>
                                <Link to="/profile/share" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 14px', borderRadius: '14px', background: 'var(--color-accent)', color: 'white', fontSize: '12px', fontWeight: 500, textDecoration: 'none' }}>Share</Link>
                            </>
                        ) : (
                            <button onClick={() => setShowReport(true)} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 14px', borderRadius: '14px', border: '1px solid rgba(192,57,43,0.3)', background: 'transparent', color: '#c0392b', fontSize: '12px', fontWeight: 500, cursor: 'pointer' }}><Flag size={13} /> Report</button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
