import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { EditProfileHeader } from '@/components/client/edit-profile/EditProfileHeader';
import { AvatarUpload } from '@/components/client/edit-profile/AvatarUpload';
import { EditProfileForm } from '@/components/client/edit-profile/EditProfileForm';
import { EditProfileActions } from '@/components/client/edit-profile/EditProfileActions';
import axiosInstance from '@/api/axiosInstance';
import type { User } from '@/types';

type FormFields = Pick<User, 'name' | 'username' | 'email' | 'bio' | 'location'>;
type FormErrors = Partial<Record<keyof FormFields, string>>;

function validate(fields: FormFields): FormErrors {
    const errors: FormErrors = {};
    if (!fields.name.trim()) errors.name = 'Full name is required.';
    else if (fields.name.trim().length < 2) errors.name = 'Full name must be at least 2 characters.';
    else if (fields.name.trim().length > 30) errors.name = 'Full name cannot exceed 30 characters.';
    if (!fields.username.trim()) errors.username = 'Username is required.';
    else if (fields.username.trim().length < 2) errors.username = 'Username must be at least 2 characters.';
    else if (fields.username.trim().length > 30) errors.username = 'Username cannot exceed 30 characters.';
    else if (!/^[a-z0-9_.]+$/.test(fields.username)) errors.username = 'Only lowercase letters, numbers, dots and underscores.';
    if (!fields.email.trim()) errors.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errors.email = 'Enter a valid email address.';
    else if (fields.email.length > 100) errors.email = 'Email cannot exceed 100 characters.';
    return errors;
}

export function EditProfilePage() {
    const { user, login } = useAuth();
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [fields, setFields] = useState<FormFields>({ name: user?.name ?? '', username: user?.username ?? '', email: user?.email ?? '', bio: user?.bio ?? '', location: user?.location ?? '' });
    const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl ?? '');
    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleChange = (updated: Partial<FormFields>) => {
        setFields((prev) => ({ ...prev, ...updated }));
        setSaved(false);
        const updatedKey = Object.keys(updated)[0] as keyof FormFields;
        if (errors[updatedKey]) setErrors((prev) => ({ ...prev, [updatedKey]: undefined }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validate(fields);
        if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }
        setErrors({});
        setIsLoading(true);
        try {
            await axiosInstance.put(`/api/users/${user?.id}`, { firstName: fields.name, username: fields.username, phone: user?.phone ?? '' });
            if (user) login({ ...user, ...fields, avatarUrl });
            setSaved(true);
            setTimeout(() => navigate('/profile'), 1000);
        } catch { setErrors({ name: 'Failed to save. Please try again.' }); }
        finally { setIsLoading(false); }
    };

    return (
        <div className="mx-auto max-w-2xl px-4 py-10">
            <EditProfileHeader />
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <AvatarUpload name={fields.name} avatarUrl={avatarUrl} onAvatarChange={setAvatarUrl} />
                <EditProfileForm fields={fields} onChange={handleChange} errors={errors} />
                <EditProfileActions isLoading={isLoading} saved={saved} />
            </form>
        </div>
    );
}
