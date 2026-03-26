import { skills } from "@/data/skills";

export default function Skills() {
  return (
    <section id="skills" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-2 text-sm font-medium tracking-widest uppercase text-[var(--accent)]">
          Skills
        </h2>
        <h3 className="mb-12 text-3xl font-bold tracking-tight">역량</h3>
        <div className="grid gap-6 sm:grid-cols-2">
          {skills.map((group) => (
            <div
              key={group.category}
              className="rounded-xl border border-[var(--border)] p-6 transition-colors hover:border-[var(--accent)]"
            >
              <h4 className="mb-1 text-lg font-semibold">{group.category}</h4>
              <p className="text-sm text-[var(--muted)]">
                {group.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
