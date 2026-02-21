import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { ShareProfilePreview } from '@/components/client/share-profile/ShareProfilePreview';
import { ShareLinkBox } from '@/components/client/share-profile/ShareLinkBox';
import { SocialShareButtons } from '@/components/client/share-profile/SocialShareButtons';

export function ShareProfilePage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
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
          Share Profile
        </h1>
      </div>

      <div className="flex flex-col gap-5">
        <ShareProfilePreview user={user} />
        <ShareLinkBox username={user.username} />
        <SocialShareButtons username={user.username} />
      </div>
    </div>
  );
}
