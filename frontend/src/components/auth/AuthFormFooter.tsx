import { Link } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';

interface AuthFormFooterProps {
    message: string;
    linkLabel: string;
    linkTo: string;
}

export function AuthFormFooter({ message, linkLabel, linkTo }: AuthFormFooterProps) {
    const { isDark } = useTheme();
    return (
        <p style={{ marginTop: '14px', textAlign: 'center', fontSize: '12px',
            color: isDark ? '#7a5a30' : '#8a6830' }}>
            {message}{' '}
            <Link to={linkTo} className="font-semibold hover:opacity-75 transition-opacity"
                  style={{ color: isDark ? '#d4703a' : '#9a4a1e' }}>
                {linkLabel}
            </Link>
        </p>
    );
}