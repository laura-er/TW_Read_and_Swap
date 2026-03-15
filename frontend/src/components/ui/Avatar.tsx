type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  className?: string;
}

const sizeStyles: Record<AvatarSize, string> = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-base',
  xl: 'w-20 h-20 text-xl',
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function Avatar({ src, alt, name, size = 'md', className = '' }: AvatarProps) {
  const base = [
    'rounded-full overflow-hidden flex items-center justify-center flex-shrink-0',
    'bg-[var(--color-accent)]/15 text-[var(--color-accent)] font-semibold',
    sizeStyles[size],
    className,
  ].join(' ');

  if (src) {
    return (
      <div className={base}>
        <img src={src} alt={alt ?? name ?? 'avatar'} className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div className={base}>
      {name ? getInitials(name) : '?'}
    </div>
  );
}
