import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Edit, Flag } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { ReportModal } from '@/components/shared/ReportModal';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import type { User } from '@/types';

export function ProfileBanner({ user, isOwnProfile }: { user: User; isOwnProfile: boolean }) {
    const { t } = useLanguage();
    const { isAdmin } = useAuth();
    const [showReport, setShowReport] = useState(false);
    return (
        <>
            {showReport && <ReportModal targetId={user.id} targetName={user.username} onClose={() => setShowReport(false)} />}
            <div style={{ height: '70px', background: 'linear-gradient(135deg, var(--color-accent) 0%, rgba(154,74,30,0.4) 60%, rgba(200,150,60,0.2) 100%)', backdropFilter: 'blur(8px)', borderRadius: '24px 24px 0 0' }} />
            <div style={{ padding: '16px 24px 20px', background: 'var(--lib-card)', borderRadius: '0 0 24px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ marginTop: '-10px', flexShrink: 0 }}><div style={{ borderRadius: '50%', padding: '4px', background: 'var(--lib-card)', display: 'inline-block' }}><Avatar src={user.avatarUrl} name={user.name} size="xl" /></div></div>
                        <div>
                            <h1 className="font-['Playfair_Display'] text-xl font-bold" style={{ color: 'var(--lib-text)' }}>{user.name}</h1>
                            <p style={{ fontSize: '12px', color: 'var(--lib-text-muted)' }}>@{user.username}</p>
                            {user.bio && <p style={{ marginTop: '4px', fontSize: '12px', color: 'var(--lib-text-muted)', maxWidth: '360px' }}>{user.bio}</p>}
                            <div style={{ marginTop: '4px', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                                {user.location && <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--lib-text-faint)' }}><MapPin size={12} /> {user.location}</span>}
                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--lib-text-faint)' }}><Calendar size={12} />{t.share.joinedDate} {new Date(user.joinedAt).toLocaleDateString('ro-RO', { month: 'long', year: 'numeric' })}</span>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                        {isOwnProfile ? (
                            <>
                                <Link to="/profile/edit" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 14px', borderRadius: '14px', border: '1px solid var(--lib-border)', background: 'transparent', color: 'var(--lib-text-muted)', fontSize: '12px', fontWeight: 500, textDecoration: 'none', transition: 'opacity 0.15s' }}><Edit size={13} /> {t.profile.editProfile}</Link>
                                {!isAdmin && (
                                    <Link to="/profile/share" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 14px', borderRadius: '14px', background: 'var(--color-accent)', color: 'white', fontSize: '12px', fontWeight: 500, textDecoration: 'none' }}>{t.profile.shareProfile}</Link>
                                )}
                            </>
                        ) : (
                            <button onClick={() => setShowReport(true)} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 14px', borderRadius: '14px', border: '1px solid rgba(192,57,43,0.3)', background: 'transparent', color: '#c0392b', fontSize: '12px', fontWeight: 500, cursor: 'pointer' }}><Flag size={13} /> {t.report.reportUser}</button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}