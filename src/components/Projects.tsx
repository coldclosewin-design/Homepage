import ProjectsTabs from "./ProjectsTabs";

export default function Projects() {
  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-2 text-sm font-medium tracking-widest uppercase text-[var(--accent)]">
          Projects
        </h2>
        <h3 className="mb-8 text-3xl font-bold tracking-tight">프로젝트</h3>
        <ProjectsTabs />
      </div>
    </section>
  );
}
