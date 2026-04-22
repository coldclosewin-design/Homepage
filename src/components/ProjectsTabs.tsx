"use client";

import { useState } from "react";
import LogoShelf from "./LogoShelf";

const TABS = [
  { id: "logo", label: "로고" },
  { id: "reserved", label: "Reserved" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function ProjectsTabs() {
  const [active, setActive] = useState<TabId>("logo");

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-3">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`rounded-full border px-5 py-2 text-sm transition-all ${
              active === t.id
                ? "border-[var(--accent)] text-[var(--accent)] bg-[var(--accent)]/5"
                : "border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {active === "logo" && <LogoShelf />}
      {active === "reserved" && (
        <div className="flex items-center justify-center rounded-xl border border-dashed border-[var(--border)] py-24">
          <p className="text-sm text-[var(--muted)]">준비 중입니다.</p>
        </div>
      )}
    </div>
  );
}
