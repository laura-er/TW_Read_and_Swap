const steps = [
  {
    icon: '📖',
    title: 'List Your Books',
    description: 'Add books you\'ve finished reading and want to pass on to someone who\'ll love them.',
  },
  {
    icon: '🔍',
    title: 'Browse & Request',
    description: 'Explore the catalog, find a book you want, and send a swap request to the owner.',
  },
  {
    icon: '🔄',
    title: 'Swap & Enjoy',
    description: 'Agree on the exchange, meet up or ship the book, and enjoy your new read.',
  },
];

export function HowItWorks() {
  return (
    <section className="bg-[var(--color-surface)] border-y border-[var(--color-border)]">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold text-[var(--color-text)]">
            How It Works
          </h2>
          <p className="text-[var(--color-text-muted)] mt-2 text-sm">
            Three simple steps to your next favourite book
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="relative flex flex-col items-center text-center p-6 rounded-2xl bg-[var(--color-bg)] border border-[var(--color-border)]"
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center text-2xl mb-4">
                {step.icon}
              </div>
              <span className="absolute top-4 right-4 text-xs font-bold text-[var(--color-accent)]/40">
                0{i + 1}
              </span>
              <h3 className="font-['Playfair_Display'] font-bold text-[var(--color-text)] mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
