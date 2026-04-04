import { User, Mail, MapPin, AtSign } from 'lucide-react';
import type { User as UserType } from '@/types';

type FormFields = Pick<UserType, 'name' | 'username' | 'email' | 'bio' | 'location'>;

interface EditProfileFormProps {
    fields: FormFields;
    onChange: (updated: Partial<FormFields>) => void;
    errors: Partial<Record<keyof FormFields, string>>;
}

interface FieldWrapperProps {
    label: string;
    required?: boolean;
    error?: string;
    children: React.ReactNode;
}

function FieldWrapper({ label, required, error, children }: FieldWrapperProps) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[var(--color-text)]">
                {label}
                {required && <span style={{ color: '#e05030', marginLeft: '3px' }}>*</span>}
            </label>
            {children}
            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    );
}

function TextInput({
    placeholder, defaultValue, onBlur, error, icon, type = 'text'
}: {
    placeholder: string;
    defaultValue?: string;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    error?: string;
    icon?: React.ReactNode;
    type?: string;
}) {
    return (
        <div className="relative">
            {icon && (
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">
                    {icon}
                </span>
            )}
            <input
                type={type}
                placeholder={placeholder}
                defaultValue={defaultValue}
                onBlur={onBlur}
                className={[
                    'w-full rounded-lg border bg-[var(--color-surface)] py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] outline-none transition-all',
                    icon ? 'pl-9 pr-3' : 'px-3',
                    'focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20',
                    error
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-[var(--color-border)]',
                ].join(' ')}
            />
        </div>
    );
}

export function EditProfileForm({ fields, onChange, errors }: EditProfileFormProps) {
    const handleBlur = (field: keyof FormFields) =>
        (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            onChange({ [field]: e.target.value });
        };

    return (
        <div className="flex flex-col gap-5 p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
            <h2 className="font-semibold text-[var(--color-text)]">Personal information</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FieldWrapper label="Full name" required error={errors.name}>
                    <TextInput
                        placeholder="Jane Doe"
                        defaultValue={fields.name}
                        onBlur={handleBlur('name')}
                        error={errors.name}
                        icon={<User className="h-4 w-4" />}
                    />
                </FieldWrapper>
                <FieldWrapper label="Username" required error={errors.username}>
                    <TextInput
                        placeholder="janedoe"
                        defaultValue={fields.username}
                        onBlur={handleBlur('username')}
                        error={errors.username}
                        icon={<AtSign className="h-4 w-4" />}
                    />
                </FieldWrapper>
            </div>

            <FieldWrapper label="Email" required error={errors.email}>
                <TextInput
                    type="email"
                    placeholder="jane@example.com"
                    defaultValue={fields.email}
                    onBlur={handleBlur('email')}
                    error={errors.email}
                    icon={<Mail className="h-4 w-4" />}
                />
            </FieldWrapper>

            <FieldWrapper label="Location">
                <TextInput
                    placeholder="Chișinău, Moldova"
                    defaultValue={fields.location}
                    onBlur={handleBlur('location')}
                    icon={<MapPin className="h-4 w-4" />}
                />
            </FieldWrapper>

            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[var(--color-text)]">Bio</label>
                <textarea
                    placeholder="Tell the community a little about yourself and your reading taste…"
                    defaultValue={fields.bio}
                    onBlur={handleBlur('bio')}
                    rows={3}
                    maxLength={200}
                    className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] outline-none resize-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-all"
                />
            </div>
        </div>
    );
}
