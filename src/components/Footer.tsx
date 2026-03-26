export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] px-6 py-8">
      <div className="mx-auto max-w-5xl text-center text-sm text-[var(--muted)]">
        &copy; {new Date().getFullYear()} 춥다창문닫자
      </div>
    </footer>
  );
}
