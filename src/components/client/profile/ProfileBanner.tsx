import { Link } from 'react-router-dom';
import { MapPin, Calendar, Edit } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import type { User } from '@/types';

interface ProfileBannerProps {
    user: User;
    isOwnProfile: boolean;
}

export function ProfileBanner({ user, isOwnProfile }: ProfileBannerProps) {
    return (
        <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
            <div className="h-28 bg-gradient-to-r from-[var(--color-accent)]/80 to-[var(--color-accent)]/30" />
            <div className="relative px-6 pb-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-6">
                        <div className="-mt-12 flex-shrink-0 ring-4 ring-[var(--color-surface)] rounded-full">
                            <Avatar src={user.avatarUrl} name={user.name} size="xl" />
                        </div>
                        <div className="pb-1">
                            <h1 className="text-2xl font-bold text-[var(--color-text)]">{user.name}</h1>
                            <p className="text-sm text-[var(--color-text-muted)]">@{user.username}</p>
                            {user.bio && (
                                <p className="mt-1 text-sm text-[var(--color-text-muted)] max-w-md">{user.bio}</p>
                            )}
                            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-[var(--color-text-muted)]">
                                {user.location && (
                                    <span className="flex items-center gap-1.5">
                                        <MapPin className="h-3.5 w-3.5" />
                                        {user.location}
                                    </span>
                                )}
                                <span className="flex items-center gap-1.5">
                                    <Calendar className="h-3.5 w-3.5" />
                                    Joined {new Date(user.joinedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </span>
                            </div>
                        </div>
                    </div>

                    {isOwnProfile && (
                        <div className="flex items-center gap-2 sm:self-end sm:pb-1">
                            <Link
                                to="/profile/edit"
                                className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-surface-alt)] transition-colors"
                            >
                                <Edit className="h-4 w-4" />
                                Edit Profile
                            </Link>
                            <Link
                                to="/profile/share"
                                className="flex items-center gap-2 rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-accent-hover)] transition-colors"
                            >
                                Share
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
