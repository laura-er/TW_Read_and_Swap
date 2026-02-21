import { MapPin, Calendar, BookOpen, ArrowLeftRight, Heart } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import type { User } from '@/types';

interface ShareProfilePreviewProps {
  user: User;
}

export function ShareProfilePreview({ user }: ShareProfilePreviewProps) {
  return (
    <div className="flex flex-col gap-4 p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
      <h2 className="font-semibold text-[var(--color-text)]">Public preview</h2>
      <p className="text-sm text-[var(--color-text-muted)] -mt-2">
        This is how others see your profile.
      </p>

      <div className="rounded-xl overflow-hidden border border-[var(--color-border)]">
        <div className="h-16 bg-gradient-to-r from-[var(--color-accent)]/80 to-[var(--color-accent)]/30" />
        <div className="px-5 pb-5 bg-[var(--color-bg)]">
          <div className="-mt-8 mb-3">
            <Avatar src={user.avatarUrl} name={user.name} size="lg" className="ring-4 ring-[var(--color-bg)]" />
          </div>
          <p className="font-bold text-[var(--color-text)]">{user.name}</p>
          <p className="text-sm text-[var(--color-text-muted)]">@{user.username}</p>
          {user.bio && (
            <p className="text-sm text-[var(--color-text-muted)] mt-2">{user.bio}</p>
          )}
          <div className="flex flex-wrap gap-4 mt-3 text-xs text-[var(--color-text-muted)]">
            {user.location && (
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {user.location}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" /> Joined {new Date(user.joinedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
          </div>
          <div className="flex gap-4 mt-4 text-sm">
            <span className="flex items-center gap-1.5 text-[var(--color-text-muted)]">
              <BookOpen className="h-4 w-4 text-[var(--color-accent)]" />
              {user.booksCount ?? 0} books
            </span>
            <span className="flex items-center gap-1.5 text-[var(--color-text-muted)]">
              <ArrowLeftRight className="h-4 w-4 text-[var(--color-accent)]" />
              {user.swapsCompleted ?? 0} swaps
            </span>
            <span className="flex items-center gap-1.5 text-[var(--color-text-muted)]">
              <Heart className="h-4 w-4 text-[var(--color-accent)]" />
              {user.favoritesCount ?? 0} favorites
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
