const stats = [
  { value: '2,400+', label: 'Books Available' },
  { value: '800+', label: 'Active Readers' },
  { value: '1,200+', label: 'Swaps Completed' },
  { value: '15+', label: 'Genres' },
];

export function StatsBar() {
  return (
    <section className="border-y border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto max-w-7xl px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map(({ value, label }) => (
          <div key={label}>
            <p className="font-['Playfair_Display'] text-2xl font-bold text-[var(--color-accent)]">{value}</p>
            <p className="text-sm text-[var(--color-text-muted)] mt-0.5">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
