import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

interface Props {
    isOpen: boolean;
    userName: string;
    onConfirm: (duration: string, reason: string, message: string) => void;
    onClose: () => void;
}

const DURATIONS = [
    { value: '1d', label: '1 zi' },
    { value: '3d', label: '3 zile' },
    { value: '7d', label: '7 zile' },
    { value: '30d', label: '30 zile' },
    { value: 'permanent', label: 'Permanent' },
];

const REASONS = [
    'Comportament abuziv față de alți utilizatori',
    'Listare de conținut fals sau înșelător',
    'Spam sau activitate suspectă',
    'Încălcarea repetată a regulilor platformei',
    'Fraudă sau tentativă de fraudă',
    'Alt motiv',
];

const inputStyle: React.CSSProperties = {
    width: '100%',
    boxSizing: 'border-box',
    padding: '8px 12px',
    fontSize: '13px',
    borderRadius: '10px',
    background: 'var(--color-surface-alt)',
    border: '1px solid var(--color-border)',
    color: 'var(--color-text)',
    outline: 'none',
};

const labelStyle: React.CSSProperties = {
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    color: 'var(--color-text-muted)',
    marginBottom: '4px',
    display: 'block',
};

export function BanUserModal({ isOpen, userName, onConfirm, onClose }: Props) {
    const [duration, setDuration] = useState('7d');
    const [reason, setReason] = useState(REASONS[0]);
    const [customMessage, setCustomMessage] = useState('');

    const handleConfirm = () => {
        onConfirm(duration, reason, customMessage);
        onClose();
        setDuration('7d');
        setReason(REASONS[0]);
        setCustomMessage('');
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Banează utilizatorul" size="md">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '-8px' }}>
                    Completează detaliile pentru banarea lui <strong style={{ color: 'var(--color-text)' }}>{userName}</strong>.
                </p>

                <div>
                    <label style={labelStyle}>Durată ban</label>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {DURATIONS.map(d => (
                            <button
                                key={d.value}
                                type="button"
                                onClick={() => setDuration(d.value)}
                                style={{
                                    padding: '5px 12px',
                                    borderRadius: '20px',
                                    fontSize: '12px',
                                    fontWeight: 500,
                                    cursor: 'pointer',
                                    border: duration === d.value ? '1.5px solid var(--color-accent)' : '1px solid var(--color-border)',
                                    background: duration === d.value ? 'var(--color-accent)' : 'var(--color-surface-alt)',
                                    color: duration === d.value ? 'white' : 'var(--color-text)',
                                    transition: 'all 0.15s',
                                }}
                            >
                                {d.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label style={labelStyle}>Motiv</label>
                    <select value={reason} onChange={e => setReason(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                        {REASONS.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                </div>

                <div>
                    <label style={labelStyle}>Mesaj pentru utilizator <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(opțional)</span></label>
                    <textarea
                        value={customMessage}
                        onChange={e => setCustomMessage(e.target.value)}
                        placeholder="Adaugă un mesaj personalizat care va fi vizibil utilizatorului..."
                        rows={3}
                        style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit', lineHeight: 1.5 }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '4px' }}>
                    <Button variant="secondary" size="sm" onClick={onClose}>Anulează</Button>
                    <Button variant="danger" size="sm" onClick={handleConfirm}>Aplică Ban</Button>
                </div>
            </div>
        </Modal>
    );
}