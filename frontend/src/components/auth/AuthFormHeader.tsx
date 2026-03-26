import { useTheme } from '@/context/ThemeContext';

interface AuthFormHeaderProps {
    title: string;
    subtitle: string;
}

export function AuthFormHeader({ title, subtitle }: AuthFormHeaderProps) {
    const { isDark } = useTheme();
    return (
        <div style={{ marginBottom: '18px' }}>
            <h1 className="font-['Playfair_Display']"
                style={{ fontSize: '20px', fontWeight: 700, marginBottom: '3px',
                    color: isDark ? '#e8d5b0' : '#2a1f08' }}>
                {title}
            </h1>
            <p style={{ fontSize: '11px', color: isDark ? '#7a5a30' : '#8a6830' }}>
                {subtitle}
            </p>
        </div>
    );
}