import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface ShareLinkBoxProps {
  username: string;
}

export function ShareLinkBox({ username }: ShareLinkBoxProps) {
  const [copied, setCopied] = useState(false);
  const profileUrl = `${window.location.origin}/profile/${username}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-3 p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
      <h2 className="font-semibold text-[var(--color-text)]">Your profile link</h2>
      <p className="text-sm text-[var(--color-text-muted)]">
        Share this link so others can see your books and swap history.
      </p>
      <div className="flex items-center gap-2">
        <div className="flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] px-3 py-2 text-sm text-[var(--color-text-muted)] truncate">
          {profileUrl}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] transition-all"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
}
