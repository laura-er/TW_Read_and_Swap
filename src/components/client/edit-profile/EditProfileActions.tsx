import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function EditProfileHeader() {
  return (
    <div className="flex items-center gap-4 mb-8">
      <Link
        to="/profile"
        className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to profile
      </Link>
      <div className="h-4 w-px bg-[var(--color-border)]" />
      <h1 className="font-['Playfair_Display'] text-2xl font-bold text-[var(--color-text)]">
        Edit Profile
      </h1>
    </div>
  );
}