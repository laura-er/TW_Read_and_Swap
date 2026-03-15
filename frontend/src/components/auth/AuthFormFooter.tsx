import { Link } from 'react-router-dom';

interface AuthFormFooterProps {
    message: string;
    linkLabel: string;
    linkTo: string;
}

export function AuthFormFooter({ message, linkLabel, linkTo }: AuthFormFooterProps) {
    return (
        <p className="mt-6 text-center text-sm text-[var(--color-text-muted)]">
            {message}{' '}
            <Link to={linkTo} className="text-[var(--color-accent)] hover:underline font-medium">
                {linkLabel}
            </Link>
        </p>
    );
}
