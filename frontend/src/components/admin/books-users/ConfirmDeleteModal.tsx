import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

interface Props {
    isOpen: boolean;
    bookTitle: string;
    ownerName: string;
    onConfirm: (reason: string) => void;
    onClose: () => void;
}

const REASONS = [
    'Conținut inadecvat sau ofensator',
    'Informații false despre carte',
    'Duplicat — carte listată de mai multe ori',
    'Carte cu drepturi de autor încălcate',
    'Cererea proprietarului',
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
    cursor: 'pointer',
};

const labelStyle: React.CSSProperties = {
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'var(--color-text-muted)',
    marginBottom: '4px',
    display: 'block',
};

export function ConfirmDeleteBookModal({ isOpen, bookTitle, ownerName, onConfirm, onClose }: Props) {
    const [reason, setReason] = useState(REASONS[0]);

    const handleConfirm = () => {
        onConfirm(reason);
        onClose();
        setReason(REASONS[0]);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Confirmare Ștergere Carte" size="sm">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                    Ești sigur că vrei să ștergi cartea{' '}
                    <strong style={{ color: 'var(--color-text)' }}>„{bookTitle}"</strong>
                    {ownerName && (
                        <> aparținând lui <strong style={{ color: 'var(--color-text)' }}>{ownerName}</strong></>
                    )}?
                    Proprietarul va fi notificat cu motivul ștergerii.
                </p>

                <div>
                    <label style={labelStyle}>Motiv ștergere</label>
                    <select
                        value={reason}
                        onChange={e => setReason(e.target.value)}
                        style={inputStyle}
                    >
                        {REASONS.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                </div>

                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <Button variant="secondary" size="sm" onClick={onClose}>Anulează</Button>
                    <Button variant="danger" size="sm" onClick={handleConfirm}>Da, șterge</Button>
                </div>
            </div>
        </Modal>
    );
}