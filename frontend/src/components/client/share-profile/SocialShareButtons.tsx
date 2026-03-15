interface SocialShareButtonsProps {
  username: string;
}

export function SocialShareButtons({ username }: SocialShareButtonsProps) {
  const profileUrl = `${window.location.origin}/profile/${username}`;
  const text = `Check out my reading profile on Read & Swap!`;

  const links = [
    {
      label: 'WhatsApp',
      emoji: '💬',
      href: `https://wa.me/?text=${encodeURIComponent(`${text} ${profileUrl}`)}`,
      color: 'hover:bg-green-500/10 hover:border-green-500/40 hover:text-green-500',
    },
    {
      label: 'Telegram',
      emoji: '✈️',
      href: `https://t.me/share/url?url=${encodeURIComponent(profileUrl)}&text=${encodeURIComponent(text)}`,
      color: 'hover:bg-sky-500/10 hover:border-sky-500/40 hover:text-sky-500',
    },
    {
      label: 'X / Twitter',
      emoji: '🐦',
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${text} ${profileUrl}`)}`,
      color: 'hover:bg-blue-500/10 hover:border-blue-500/40 hover:text-blue-500',
    },
    {
      label: 'Email',
      emoji: '📧',
      href: `mailto:?subject=${encodeURIComponent('My Read & Swap profile')}&body=${encodeURIComponent(`${text}\n${profileUrl}`)}`,
      color: 'hover:bg-[var(--color-accent)]/10 hover:border-[var(--color-accent)]/40 hover:text-[var(--color-accent)]',
    },
  ];

  return (
    <div className="flex flex-col gap-4 p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
      <h2 className="font-semibold text-[var(--color-text)]">Share on</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {links.map(({ label, emoji, href, color }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={[
              'flex flex-col items-center gap-2 rounded-xl border border-[var(--color-border)] py-4 text-sm font-medium text-[var(--color-text-muted)] transition-all duration-150',
              color,
            ].join(' ')}
          >
            <span className="text-2xl">{emoji}</span>
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}
