import { useState, useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/context/LanguageContext';

interface Props {
    isOpen: boolean;
    bookTitle: string;
    ownerName: string;
    onConfirm: (reason: string) => void;
    onClose: () => void;
}

function CustomSelect({ value, options, onChange }: { value: string; options: string[]; onChange: (v: string) => void }) {
    const [open, setOpen] = useState(false);
    const [menuPos, setMenuPos] = useState({ top: 0, left: 0, width: 0 });
    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const updatePos = useCallback(() => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setMenuPos({ top: rect.bottom + window.scrollY + 4, left: rect.left + window.scrollX, width: rect.width });
        }
    }, []);

    useEffect(() => {
        if (!open) return;
        function handleClick(e: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(e.target as Node) &&
                buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [open]);

    const menu = open ? ReactDOM.createPortal(
        <div ref={menuRef} style={{ position: 'absolute', top: menuPos.top, left: menuPos.left, width: menuPos.width, background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.12)', zIndex: 99999, padding: '4px', fontFamily: 'inherit' }}>
            {options.map(opt => (
                <button key={opt} type="button" onMouseDown={e => { e.preventDefault(); onChange(opt); setOpen(false); }}
                    style={{ display: 'block', width: '100%', textAlign: 'left', padding: '7px 10px', fontSize: '13px', fontFamily: 'inherit', color: 'var(--color-text)', background: opt === value ? 'var(--color-surface-alt)' : 'transparent', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: opt === value ? 600 : 400 }}>
                    {opt}
                </button>
            ))}
        </div>, document.body
    ) : null;

    return (
        <div style={{ position: 'relative' }}>
            <button ref={buttonRef} type="button" onClick={() => { updatePos(); setOpen(o => !o); }}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', background: 'var(--color-surface-alt)', border: '1px solid var(--color-border)', borderRadius: '10px', padding: '7px 10px', fontSize: '13px', fontFamily: 'inherit', color: 'var(--color-text)', outline: 'none', cursor: 'pointer', textAlign: 'left' }}>
                <span style={{ flex: 1 }}>{value}</span>
                <svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s', color: 'var(--color-text-muted)', flexShrink: 0 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {menu}
        </div>
    );
}

export function ConfirmDeleteBookModal({ isOpen, bookTitle, ownerName, onConfirm, onClose }: Props) {
    const { t } = useLanguage();

    const REASONS = [
        t.admin.reasonInappropriate,
        t.admin.reasonFalseInfo,
        t.admin.reasonDuplicate,
        t.admin.reasonCopyright,
        t.admin.reasonOwnerRequest,
        t.admin.reasonOther,
    ];

    const [reason, setReason] = useState(REASONS[0]);

    const handleConfirm = () => {
        onConfirm(reason);
        onClose();
        setReason(REASONS[0]);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-[var(--color-surface)] rounded-2xl shadow-xl w-full max-w-sm mx-4 p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-[var(--color-text)]">{t.admin.confirmBookDeletion}</h2>
                    <button onClick={onClose} className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">✕</button>
                </div>
                <div className="h-px bg-[var(--color-border)]" />
                <p className="text-sm text-[var(--color-text-muted)]" style={{ lineHeight: 1.6 }}>
                    {t.admin.confirmDeleteBook}{' '}
                    <strong style={{ color: 'var(--color-text)' }}>"{bookTitle}"</strong>
                    {ownerName && <> {t.admin.confirmDeleteBookBelonging} <strong style={{ color: 'var(--color-text)' }}>{ownerName}</strong></>}?{' '}
                    {t.admin.confirmDeleteBookNotify}
                </p>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-[var(--color-text)]">{t.admin.deletionReason}</label>
                    <CustomSelect value={reason} options={REASONS} onChange={setReason} />
                </div>
                <div className="flex gap-2 justify-end">
                    <Button variant="ghost" size="sm" onClick={onClose}>{t.common.cancel}</Button>
                    <Button variant="danger" size="sm" onClick={handleConfirm}>{t.admin.yesDelete}</Button>
                </div>
            </div>
        </div>
    );
}
