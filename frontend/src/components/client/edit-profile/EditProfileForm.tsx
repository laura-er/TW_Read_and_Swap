import { Input } from '@/components/ui/Input';
import { User, Mail, MapPin, AtSign } from 'lucide-react';
import type { User as UserType } from '@/types';

type FormFields = Pick<UserType, 'name' | 'username' | 'email' | 'bio' | 'location'>;

interface EditProfileFormProps {
    fields: FormFields;
    onChange: (updated: Partial<FormFields>) => void;
    errors: Partial<Record<keyof FormFields, string>>;
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
                <Input
                    label="Full name"
                    placeholder="Jane Doe"
                    defaultValue={fields.name}
                    onBlur={handleBlur('name')}
                    error={errors.name}
                    leftIcon={<User className="h-4 w-4" />}
                />
                <Input
                    label="Username"
                    placeholder="janedoe"
                    defaultValue={fields.username}
                    onBlur={handleBlur('username')}
                    error={errors.username}
                    leftIcon={<AtSign className="h-4 w-4" />}
                />
            </div>

            <Input
                label="Email"
                type="email"
                placeholder="jane@example.com"
                defaultValue={fields.email}
                onBlur={handleBlur('email')}
                error={errors.email}
                leftIcon={<Mail className="h-4 w-4" />}
            />

            <Input
                label="Location"
                placeholder="Chișinău, Moldova"
                defaultValue={fields.location}
                onBlur={handleBlur('location')}
                leftIcon={<MapPin className="h-4 w-4" />}
            />

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

