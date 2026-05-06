import { User, Mail, AtSign } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { LocationPickerMap, type LocationValue } from '@/components/shared/LocationPickerMap';
import type { User as UserType } from '@/types';

type FormFields = Pick<UserType, 'name' | 'username' | 'email' | 'bio'>;
interface EditProfileFormProps {
    fields: FormFields;
    location: LocationValue;
    onChange: (updated: Partial<FormFields>) => void;
    onLocationChange: (v: LocationValue) => void;
    errors: Partial<Record<keyof FormFields | 'location', string>>;
}

function FieldWrapper({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[var(--color-text)]">
                {label}{required && <span style={{ color: '#e05030', marginLeft: '3px' }}>*</span>}
            </label>
            {children}
            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    );
}

function TextInput({ placeholder, defaultValue, onBlur, error, icon, type = 'text' }: { placeholder: string; defaultValue?: string; onBlur: (e: React.FocusEvent<HTMLInputElement>) => void; error?: string; icon?: React.ReactNode; type?: string }) {
    return (
        <div className="relative">
            {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">{icon}</span>}
            <input type={type} placeholder={placeholder} defaultValue={defaultValue} onBlur={onBlur}
                className={['w-full rounded-lg border bg-[var(--color-surface)] py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] outline-none transition-all', icon ? 'pl-9 pr-3' : 'px-3', 'focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20', error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-[var(--color-border)]'].join(' ')} />
        </div>
    );
}

export function EditProfileForm({ fields, location, onChange, onLocationChange, errors }: EditProfileFormProps) {
    const { t } = useLanguage();
    const handleBlur = (field: keyof FormFields) => (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => { onChange({ [field]: e.target.value }); };
    return (
        <div className="flex flex-col gap-5 p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
            <h2 className="font-semibold text-[var(--color-text)]">{t.editProfile.personalInfo}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FieldWrapper label={t.editProfile.firstName} required error={errors.name}>
                    <TextInput placeholder="Jane Doe" defaultValue={fields.name} onBlur={handleBlur('name')} error={errors.name} icon={<User className="h-4 w-4" />} />
                </FieldWrapper>
                <FieldWrapper label={t.editProfile.username} required error={errors.username}>
                    <TextInput placeholder="janedoe" defaultValue={fields.username} onBlur={handleBlur('username')} error={errors.username} icon={<AtSign className="h-4 w-4" />} />
                </FieldWrapper>
            </div>
            <FieldWrapper label={t.auth.email} required error={errors.email}>
                <TextInput type="email" placeholder="jane@example.com" defaultValue={fields.email} onBlur={handleBlur('email')} error={errors.email} icon={<Mail className="h-4 w-4" />} />
            </FieldWrapper>
            <LocationPickerMap value={location} onChange={onLocationChange} required hasError={!!errors.location} />
            {errors.location && <p className="text-xs text-red-500 -mt-4">{errors.location}</p>}
            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[var(--color-text)]">{t.editProfile.bio}</label>
                <textarea placeholder={t.editProfile.bioPlaceholder} defaultValue={fields.bio} onBlur={handleBlur('bio')} rows={3} maxLength={200}
                    className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] outline-none resize-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-all" />
            </div>
        </div>
    );
}
