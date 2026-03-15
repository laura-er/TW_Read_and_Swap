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
  return (
    <div className="flex flex-col gap-5 p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
      <h2 className="font-semibold text-[var(--color-text)]">Personal information</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Full name"
          placeholder="Jane Doe"
          value={fields.name}
          onChange={(e) => onChange({ name: e.target.value })}
          error={errors.name}
          leftIcon={<User className="h-4 w-4" />}
        />
        <Input
          label="Username"
          placeholder="janedoe"
          value={fields.username}
          onChange={(e) => onChange({ username: e.target.value })}
          error={errors.username}
          leftIcon={<AtSign className="h-4 w-4" />}
        />
      </div>

      <Input
        label="Email"
        type="email"
        placeholder="jane@example.com"
        value={fields.email}
        onChange={(e) => onChange({ email: e.target.value })}
        error={errors.email}
        leftIcon={<Mail className="h-4 w-4" />}
      />

      <Input
        label="Location"
        placeholder="Chișinău, Moldova"
        value={fields.location}
        onChange={(e) => onChange({ location: e.target.value })}
        leftIcon={<MapPin className="h-4 w-4" />}
      />

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[var(--color-text)]">Bio</label>
        <textarea
          placeholder="Tell the community a little about yourself and your reading taste…"
          value={fields.bio}
          onChange={(e) => onChange({ bio: e.target.value })}
          rows={3}
          maxLength={200}
          className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] outline-none resize-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-all"
        />
        <p className="text-xs text-[var(--color-text-muted)] text-right">{fields.bio.length}/200</p>
      </div>
    </div>
  );
}
