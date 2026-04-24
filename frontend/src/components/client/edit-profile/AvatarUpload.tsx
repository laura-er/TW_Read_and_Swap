import { useRef } from 'react';
import { Camera } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { useLanguage } from '@/context/LanguageContext';

interface AvatarUploadProps { name: string; avatarUrl: string; onAvatarChange: (url: string) => void; }

export function AvatarUpload({ name, avatarUrl, onAvatarChange }: AvatarUploadProps) {
    const { t } = useLanguage();
    const inputRef = useRef<HTMLInputElement>(null);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => { const file = e.target.files?.[0]; if (!file) return; onAvatarChange(URL.createObjectURL(file)); };
    return (
        <div className="flex items-center gap-6 p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
            <div className="relative group">
                <Avatar src={avatarUrl} name={name} size="xl" />
                <button type="button" onClick={() => inputRef.current?.click()} className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"><Camera className="h-5 w-5 text-white" /></button>
                <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            </div>
            <div>
                <p className="font-medium text-[var(--color-text)] text-sm">{t.editProfile.profilePhoto}</p>
                <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{t.editProfile.photoHint}</p>
                <button type="button" onClick={() => inputRef.current?.click()} className="mt-2 text-xs text-[var(--color-accent)] hover:underline">{t.editProfile.uploadAvatar}</button>
            </div>
        </div>
    );
}
