import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

interface Props {
    isOpen: boolean;
    userName: string;
    onConfirm: () => void;
    onClose: () => void;
}

export function ConfirmDeleteUserModal({ isOpen, userName, onConfirm, onClose }: Props) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Confirmare Ștergere" size="sm">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <p style={{ fontSize: '14px', color: 'var(--color-text)', lineHeight: 1.6 }}>
                    Ești sigur că vrei să ștergi contul utilizatorului{' '}
                    <strong>{userName}</strong>? Această acțiune este <strong>ireversibilă</strong> și va elimina toate datele asociate.
                </p>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <Button variant="secondary" size="sm" onClick={onClose}>Anulează</Button>
                    <Button variant="danger" size="sm" onClick={() => { onConfirm(); onClose(); }}>Da, șterge</Button>
                </div>
            </div>
        </Modal>
    );
}