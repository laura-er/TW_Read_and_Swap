import { useState, useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { SwapGuidelinesBox } from './SwapGuidelinesBox';
import { mockBooks } from '@/data/mockBooks';
import type { Book } from '@/types';

interface SwapFormData {
    offeredBookId: string;
    message: string;
    contactEmail: string;
}

interface SwapFormProps {
    book: Book;
}

interface BookDropdownProps {
    value: string;
    options: { id: string; label: string }[];
    onChange: (id: string) => void;
    hasError?: boolean;
}

function BookDropdown({ value, options, onChange, hasError }: BookDropdownProps) {
    const [open, setOpen] = useState(false);
    const [menuPos, setMenuPos] = useState({ top: 0, left: 0, width: 0 });
    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const updatePos = useCallback(() => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setMenuPos({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
                width: rect.width,
            });
        }
    }, []);

    const handleOpen = () => { updatePos(); setOpen(o => !o); };

    useEffect(() => {
        if (!open) return;
        function handleClickOutside(e: MouseEvent) {
            if (
                menuRef.current && !menuRef.current.contains(e.target as Node) &&
                buttonRef.current && !buttonRef.current.contains(e.target as Node)
            ) setOpen(false);
        }
        function handleScroll() { updatePos(); }
        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('scroll', handleScroll, true);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', handleScroll, true);
        };
    }, [open, updatePos]);

    const selected = options.find(o => o.id === value);
    const placeholder = 'Choose a book from your collection...';

    const menu = open ? ReactDOM.createPortal(
        <div
            ref={menuRef}
            style={{
                position: 'absolute',
                top: menuPos.top,
                left: menuPos.left,
                width: menuPos.width,
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: '10px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
                zIndex: 99999,
                padding: '4px',
                overflow: 'hidden',
                fontFamily: 'inherit',
            }}
        >
            <button
                type="button"
                onMouseDown={e => { e.preventDefault(); onChange(''); setOpen(false); }}
                style={{
                    display: 'block', width: '100%', textAlign: 'left',
                    padding: '4px 8px', fontSize: '12px', fontFamily: 'inherit',
                    color: 'var(--color-text-muted)',
                    background: value === '' ? 'rgba(0,0,0,0.06)' : 'transparent',
                    border: 'none', borderRadius: '6px', cursor: 'pointer',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,0,0,0.05)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = value === '' ? 'rgba(0,0,0,0.06)' : 'transparent'; }}
            >
                {placeholder}
            </button>
            {options.map(opt => (
                <button
                    key={opt.id}
                    type="button"
                    onMouseDown={e => { e.preventDefault(); onChange(opt.id); setOpen(false); }}
                    style={{
                        display: 'block', width: '100%', textAlign: 'left',
                        padding: '4px 8px', fontSize: '12px', fontFamily: 'inherit',
                        fontWeight: opt.id === value ? 500 : 400,
                        color: 'var(--color-text)',
                        background: opt.id === value ? 'rgba(0,0,0,0.07)' : 'transparent',
                        border: 'none', borderRadius: '6px', cursor: 'pointer',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,0,0,0.05)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = opt.id === value ? 'rgba(0,0,0,0.07)' : 'transparent'; }}
                >
                    {opt.label}
                </button>
            ))}
        </div>,
        document.body
    ) : null;

    return (
        <div style={{ position: 'relative' }}>
            <button
                ref={buttonRef}
                type="button"
                onClick={handleOpen}
                style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'var(--color-surface)',
                    border: `1px solid ${hasError ? '#ef4444' : open ? 'var(--color-accent)' : 'var(--color-border)'}`,
                    borderRadius: '8px',
                    padding: '6px 12px',
                    fontSize: '0.875rem',
                    lineHeight: '1.25rem',
                    fontWeight: 400,
                    fontFamily: 'inherit',
                    color: 'var(--color-text)',
                    outline: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    boxShadow: open ? '0 0 0 2px color-mix(in srgb, var(--color-accent) 20%, transparent)' : 'none',
                    transition: 'border-color 0.15s, box-shadow 0.15s',
                }}
            >
                <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {selected ? selected.label : placeholder}
                </span>
                <svg
                    width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    style={{
                        flexShrink: 0, marginLeft: '8px', color: 'var(--color-text-muted)',
                        transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s',
                    }}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {menu}
        </div>
    );
}

export function SwapForm({ book }: SwapFormProps) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<SwapFormData>({
        offeredBookId: '',
        message: '',
        contactEmail: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Partial<SwapFormData>>({});

    const userBooks = mockBooks.filter((b) => b.ownerId === 'user1' && b.id !== book.id);
    const bookOptions = userBooks.map(b => ({
        id: b.id,
        label: `${b.title} — ${b.author} (${b.condition})`,
    }));

    const validate = (): boolean => {
        const newErrors: Partial<SwapFormData> = {};
        if (!formData.offeredBookId) newErrors.offeredBookId = 'Please select a book to offer.';
        if (!formData.contactEmail) {
            newErrors.contactEmail = 'Contact email is required.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
            newErrors.contactEmail = 'Please enter a valid email address.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (field: keyof SwapFormData, value: string) => {
        setFormData(p => ({ ...p, [field]: value }));
        if (errors[field]) {
            setErrors(p => ({ ...p, [field]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsLoading(false);
        navigate(`/swap/${book.id}/success`);
    };

    return (
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
            <h1 className="font-['Playfair_Display'] text-2xl font-bold text-[var(--color-text)] mb-1">
                Request Book Swap
            </h1>
            <p className="text-sm text-[var(--color-text-muted)] mb-6">
                Fill out the form below to send a swap request
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Select book to offer */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-[var(--color-text)]">
                        Book to Offer <span className="text-red-500">*</span>
                    </label>
                    <BookDropdown
                        value={formData.offeredBookId}
                        options={bookOptions}
                        onChange={id => handleChange('offeredBookId', id)}
                        hasError={!!errors.offeredBookId}
                    />
                    {errors.offeredBookId && (
                        <p className="text-xs text-red-500">{errors.offeredBookId}</p>
                    )}
                    <p className="text-xs text-[var(--color-text-muted)]">
                        Don't see your book?{' '}
                        <Link to="/books/add" className="text-[var(--color-accent)] hover:underline">
                            Add it first
                        </Link>
                    </p>
                </div>

                {/* Message — optional */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-[var(--color-text)]">
                        Message
                        <span className="ml-1 text-xs text-[var(--color-text-muted)] font-normal">(optional)</span>
                    </label>
                    <textarea
                        rows={4}
                        placeholder="Introduce yourself and explain why you'd like to swap..."
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-all resize-none"
                    />
                </div>

                {/* Contact Email — required */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-[var(--color-text)]">
                        Contact Email <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        placeholder="you@example.com"
                        value={formData.contactEmail}
                        onChange={(e) => handleChange('contactEmail', e.target.value)}
                        className={[
                            'w-full rounded-lg border bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] outline-none transition-all',
                            'focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20',
                            errors.contactEmail
                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                                : 'border-[var(--color-border)]',
                        ].join(' ')}
                    />
                    {errors.contactEmail && (
                        <p className="text-xs text-red-500">{errors.contactEmail}</p>
                    )}
                </div>

                <SwapGuidelinesBox />

                <div className="flex gap-3 pt-2">
                    <Button type="submit" isLoading={isLoading} className="flex-1 justify-center">
                        Send Swap Request
                    </Button>
                    <Link
                        to={`/books/${book.id}`}
                        className="inline-flex items-center justify-center rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-surface-alt)] transition-all"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
}
