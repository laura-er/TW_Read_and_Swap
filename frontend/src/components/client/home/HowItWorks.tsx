const steps = [
    { icon: '📖', step: '01', title: 'List Your Books',
        description: "Add books you've finished reading and want to pass on to someone who'll love them." },
    { icon: '🔍', step: '02', title: 'Browse & Request',
        description: 'Explore the catalog, find a book you want, and send a swap request to the owner.' },
    { icon: '🔄', step: '03', title: 'Swap & Enjoy',
        description: 'Agree on the exchange, meet up or ship the book, and enjoy your new read.' },
];

export function HowItWorks() {
    return (
        <section className="py-20" style={{
            background: 'var(--lib-how)',
            backdropFilter: 'blur(14px)',
            borderTop: '1px solid var(--lib-border)',
        }}>
            <div className="mx-auto max-w-7xl px-4">
                <div className="text-center mb-14">
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <div className="w-8 h-px" style={{ background: 'var(--color-accent)' }} />
                        <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--color-accent)' }}>Simple Process</span>
                        <div className="w-8 h-px" style={{ background: 'var(--color-accent)' }} />
                    </div>
                    <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold" style={{ color: 'var(--lib-text)' }}>How It Works</h2>
                    <p className="mt-2 text-sm max-w-sm mx-auto" style={{ color: 'var(--lib-text-muted)' }}>Three simple steps to your next favourite book</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                    <div className="hidden md:block absolute top-10 left-[calc(16.7%+1rem)] right-[calc(16.7%+1rem)] h-px"
                         style={{ background: `linear-gradient(to right, transparent, var(--color-accent), transparent)`, opacity: 0.35 }} />

                    {steps.map((step) => (
                        <div key={step.title}
                             className="relative flex flex-col items-center text-center p-8 rounded-[28px] shadow-lg transition-all group"
                             style={{ background: 'var(--lib-card)', backdropFilter: 'blur(12px)', border: '1px solid var(--lib-border)' }}>
                            <div className="relative mb-4">
                                <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                                     style={{ background: 'var(--lib-stats)', border: '1px solid var(--lib-border)' }}>
                                    {step.icon}
                                </div>
                                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center"
                                      style={{ background: 'var(--color-accent)' }}>
                  {step.step.slice(1)}
                </span>
                            </div>
                            <h3 className="font-['Playfair_Display'] font-bold text-lg mb-2" style={{ color: 'var(--lib-text)' }}>{step.title}</h3>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--lib-text-muted)' }}>{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}