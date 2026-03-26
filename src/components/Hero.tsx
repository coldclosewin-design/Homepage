export default function Hero() {
  return (
    <section className="flex min-h-screen items-center justify-center px-6">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-4 text-sm font-medium tracking-widest uppercase text-[var(--accent)]">
          Welcome
        </p>
        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          춥다창문닫자
        </h1>
        <p className="mx-auto mb-10 max-w-xl text-lg text-[var(--muted)]">
          종이 위에 무수한 상상을 끄적입니다.
        </p>
        <div className="flex items-center justify-center gap-4">
          <a
            href="#projects"
            className="rounded-lg bg-[var(--accent)] px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            프로젝트 보기
          </a>
          <a
            href="#contact"
            className="rounded-lg border border-[var(--border)] px-6 py-3 text-sm font-medium transition-colors hover:bg-[var(--border)]"
          >
            연락하기
          </a>
        </div>
      </div>
    </section>
  );
}
