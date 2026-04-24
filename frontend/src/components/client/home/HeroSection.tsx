import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

export function HeroSection() {
    const { isAuthenticated } = useAuth();
    const { t } = useLanguage();

    useEffect(() => {
        document.documentElement.classList.add('has-library-bg');
        const prevBodyBg = document.body.style.backgroundColor;
        const prevHtmlBg = document.documentElement.style.backgroundColor;
        document.body.style.backgroundColor = 'transparent';
        document.documentElement.style.backgroundColor = 'transparent';
        const bg = document.createElement('div');
        bg.id = '__library-bg__';
        Object.assign(bg.style, { position: 'fixed', inset: '0', zIndex: '-9999', backgroundImage: "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1920&q=85')", backgroundSize: 'cover', backgroundPosition: 'center top', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', filter: 'var(--lib-img-filter)', pointerEvents: 'none' });
        document.body.appendChild(bg);
        const overlay = document.createElement('div');
        overlay.id = '__library-overlay__';
        Object.assign(overlay.style, { position: 'fixed', inset: '0', zIndex: '-9998', background: 'var(--lib-overlay)', pointerEvents: 'none' });
        document.body.appendChild(overlay);
        return () => {
            document.documentElement.classList.remove('has-library-bg');
            document.body.style.backgroundColor = prevBodyBg;
            document.documentElement.style.backgroundColor = prevHtmlBg;
            document.getElementById('__library-bg__')?.remove();
            document.getElementById('__library-overlay__')?.remove();
        };
    }, []);

    return (
        <section className="relative flex items-center overflow-hidden" style={{ minHeight: 'calc(91vh - 80px)' }}>
            <div className="absolute inset-x-0 bottom-0 pointer-events-none z-10" style={{ height: '180px', background: 'linear-gradient(to top, var(--lib-stats) 0%, transparent 100%)' }} />
            <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 w-full">
                <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-2 mb-6 px-4 py-2" style={{ borderRadius: '20px', border: '1px solid var(--lib-border)', background: 'var(--lib-card)', backdropFilter: 'blur(12px)' }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
                        <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--color-accent)' }}>{t.hero.badge}</span>
                    </div>
                    <h1 className="font-['Playfair_Display'] text-5xl md:text-7xl font-bold leading-[1.08] mb-6" style={{ color: 'var(--lib-text)' }}>
                        {t.hero.title1}{' '}
                        <em className="not-italic" style={{ color: 'var(--color-accent)' }}>{t.hero.title2}</em>
                        <br />{t.hero.title3}
                    </h1>
                    <p className="text-lg mb-10 max-w-lg leading-relaxed" style={{ color: 'var(--lib-text-muted)' }}>{t.hero.subtitle}</p>
                    <div className="flex items-center gap-3 flex-wrap">
                        {isAuthenticated ? (
                            <>
                                <Link to="/books"><Button size="lg">{t.hero.browseBooks}</Button></Link>
                                <Link to="/books/add"><Button size="lg" variant="secondary">{t.hero.addBook}</Button></Link>
                            </>
                        ) : (
                            <>
                                <Link to="/sign-up"><Button size="lg">{t.hero.getStarted}</Button></Link>
                                <Link to="/books"><Button size="lg" variant="secondary">{t.hero.browseCatalog}</Button></Link>
                            </>
                        )}
                    </div>
                    <p className="mt-8 text-sm flex items-center gap-2" style={{ color: 'var(--lib-text-faint)' }}>
                        <span style={{ color: 'var(--color-accent)' }}>✦</span>
                        {t.hero.joinReaders}
                    </p>
                </div>
            </div>
            <div className="hidden lg:block absolute right-1/7 top-1/2 -translate-y-1/2 z-10 max-w-xs">
                <div style={{ borderRadius: '28px', padding: '24px', background: 'var(--lib-card)', backdropFilter: 'blur(20px)', border: '1px solid var(--lib-border)', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
                    <p className="font-['Playfair_Display'] text-3xl leading-none mb-3" style={{ color: 'var(--color-accent)' }}>&ldquo;</p>
                    <p className="text-sm leading-relaxed font-['Playfair_Display'] italic" style={{ color: 'var(--lib-text)' }}>{t.hero.quote}</p>
                    <p className="mt-4 text-xs font-semibold" style={{ color: 'var(--lib-text-faint)' }}>— George R.R. Martin</p>
                </div>
            </div>
        </section>
    );
}
