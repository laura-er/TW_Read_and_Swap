import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { EditProfileHeader } from '@/components/client/edit-profile/EditProfileHeader';
import { AvatarUpload } from '@/components/client/edit-profile/AvatarUpload';
import { EditProfileForm } from '@/components/client/edit-profile/EditProfileForm';
import { EditProfileActions } from '@/components/client/edit-profile/EditProfileActions';
import type { User } from '@/types';

type FormFields = Pick<User, 'name' | 'username' | 'email' | 'bio' | 'location'>;
type FormErrors = Partial<Record<keyof FormFields, string>>;

function validate(fields: FormFields): FormErrors {
  const errors: FormErrors = {};
  if (!fields.name.trim()) errors.name = 'Name is required.';
  if (!fields.username.trim()) errors.username = 'Username is required.';
  if (!/^[a-z0-9_]+$/.test(fields.username))
    errors.username = 'Only lowercase letters, numbers and underscores.';
  if (!fields.email.trim()) errors.email = 'Email is required.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
    errors.email = 'Enter a valid email address.';
  return errors;
}

export function EditProfilePage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [fields, setFields] = useState<FormFields>({
    name: user?.name ?? '',
    username: user?.username ?? '',
    email: user?.email ?? '',
    bio: user?.bio ?? '',
    location: user?.location ?? '',
  });
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl ?? '');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (updated: Partial<FormFields>) => {
    setFields((prev) => ({ ...prev, ...updated }));
    setSaved(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(fields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsLoading(true);

    // TODO: replace with real API call
    await new Promise((r) => setTimeout(r, 800));

    if (user) {
      login({ ...user, ...fields, avatarUrl });
    }

    setIsLoading(false);
    setSaved(true);
    setTimeout(() => navigate('/profile'), 1000);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <EditProfileHeader />
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <AvatarUpload
          name={fields.name}
          avatarUrl={avatarUrl}
          onAvatarChange={setAvatarUrl}
        />
        <EditProfileForm
          fields={fields}
          onChange={handleChange}
          errors={errors}
        />
        <EditProfileActions isLoading={isLoading} saved={saved} />
      </form>
    </div>
  );
}
