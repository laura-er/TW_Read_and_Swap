import { Link, Outlet } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';

export function AuthLayout() {
    const { toggleTheme, isDark } = useTheme();

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center px-4 py-10 relative overflow-hidden"
            style={{ background: isDark ? '#0a0704' : '#f5ede0' }}
        >
            {/* Lumini blur pe fundal — misterios */}
            <div style={{
                position: 'fixed', top: '-80px', right: '-60px', width: '380px', height: '380px',
                borderRadius: '50%', pointerEvents: 'none',
                background: isDark
                    ? 'radial-gradient(circle, rgba(212,112,58,0.18) 0%, transparent 65%)'
                    : 'radial-gradient(circle, rgba(212,160,60,0.28) 0%, transparent 65%)',
                filter: 'blur(40px)',
            }} />
            <div style={{
                position: 'fixed', bottom: '-60px', left: '-80px', width: '320px', height: '320px',
                borderRadius: '50%', pointerEvents: 'none',
                background: isDark
                    ? 'radial-gradient(circle, rgba(154,74,30,0.14) 0%, transparent 65%)'
                    : 'radial-gradient(circle, rgba(200,140,50,0.22) 0%, transparent 65%)',
                filter: 'blur(50px)',
            }} />
            <div style={{
                position: 'fixed', top: '40%', left: '15%', width: '200px', height: '200px',
                borderRadius: '50%', pointerEvents: 'none',
                background: isDark
                    ? 'radial-gradient(circle, rgba(180,100,20,0.08) 0%, transparent 70%)'
                    : 'radial-gradient(circle, rgba(220,170,80,0.15) 0%, transparent 70%)',
                filter: 'blur(60px)',
            }} />

            {/* Top-right controls */}
            <div className="fixed top-4 right-5 z-20 flex items-center gap-1.5">
                <button
                    onClick={toggleTheme}
                    className="w-8 h-8 rounded-xl flex items-center justify-center transition-all text-xs"
                    style={{
                        background: isDark ? 'rgba(30,20,8,0.8)' : 'rgba(255,248,235,0.8)',
                        color: isDark ? '#9a7a50' : '#7a5a30',
                        border: isDark ? '1px solid rgba(180,120,40,0.2)' : '1px solid rgba(180,140,60,0.3)',
                        backdropFilter: 'blur(12px)',
                    }}
                >
                    {isDark ? '☀️' : '🌙'}
                </button>
                <Link
                    to="/"
                    className="h-8 px-3 rounded-xl flex items-center text-xs font-medium transition-all hover:opacity-75"
                    style={{
                        background: isDark ? 'rgba(30,20,8,0.8)' : 'rgba(255,248,235,0.8)',
                        color: isDark ? '#9a7a50' : '#7a5a30',
                        border: isDark ? '1px solid rgba(180,120,40,0.2)' : '1px solid rgba(180,140,60,0.3)',
                        backdropFilter: 'blur(12px)',
                    }}
                >
                    ← Home
                </Link>
            </div>

            {/* Logo */}
            <div className="text-center mb-7 relative z-10">
                <Link
                    to="/"
                    className="font-['Playfair_Display'] text-xl font-bold transition-opacity hover:opacity-70"
                    style={{ color: isDark ? '#e8d5b0' : '#3a2a10' }}
                >
                    Read & Swap
                </Link>
                <div className="flex items-center justify-center gap-2 mt-1.5">
                    <div style={{ width: '20px', height: '1px', background: isDark ? 'rgba(212,112,58,0.4)' : 'rgba(180,120,40,0.4)' }} />
                    <span style={{ fontSize: '9px', letterSpacing: '0.14em', color: isDark ? '#6b5030' : '#9a7a40' }}>
            BOOK EXCHANGE
          </span>
                    <div style={{ width: '20px', height: '1px', background: isDark ? 'rgba(212,112,58,0.4)' : 'rgba(180,120,40,0.4)' }} />
                </div>
            </div>

            {/* Card */}
            <div
                className="w-full max-w-xs relative z-10"
                style={{
                    borderRadius: '22px',
                    background: isDark
                        ? 'rgba(22,14,6,0.85)'
                        : 'rgba(255,250,238,0.88)',
                    border: isDark
                        ? '1px solid rgba(180,120,40,0.2)'
                        : '1px solid rgba(200,160,70,0.3)',
                    boxShadow: isDark
                        ? '0 24px 60px rgba(0,0,0,0.5), 0 0 40px rgba(180,100,20,0.05)'
                        : '0 24px 60px rgba(100,60,0,0.12), 0 0 40px rgba(200,150,50,0.08)',
                    backdropFilter: 'blur(20px)',
                    padding: '24px 22px',
                    fontSize: '13px',
                }}
            >
                <Outlet />
            </div>
        </div>
    );
}