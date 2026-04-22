"use client";

import { useState, type KeyboardEvent } from "react";
import type { LogoItem } from "./Logos";

type Props = { title: string; items: LogoItem[] };

const NAV_BTN =
  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-lg transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]";

export default function LogoCarousel({ title, items }: Props) {
  const [idx, setIdx] = useState(0);
  const len = items.length;
  const Active = items[idx].Component;
  const activeName = items[idx].name;

  const go = (delta: number) => setIdx((i) => (i + delta + len) % len);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    }
  };

  return (
    <div
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--background)] rounded-xl"
    >
      <div className="mb-4 flex items-end justify-between px-2">
        <h4 className="text-2xl font-bold tracking-tight">{title}</h4>
        <span className="text-xs tracking-widest text-[var(--muted)]">
          {String(idx + 1).padStart(2, "0")} / {String(len).padStart(2, "0")}
        </span>
      </div>

      {/* stage */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => go(-1)}
          aria-label="이전 로고"
          className={NAV_BTN}
        >
          ←
        </button>
        <div className="w-full max-w-[26rem] aspect-square overflow-hidden rounded-xl border border-[var(--border)]">
          <div key={idx} className="logo-stage-anim h-full w-full">
            <Active />
          </div>
        </div>
        <button
          onClick={() => go(1)}
          aria-label="다음 로고"
          className={NAV_BTN}
        >
          →
        </button>
      </div>

      {/* caption */}
      <p className="mt-4 text-center text-sm text-[var(--muted)]">
        {activeName}
      </p>

      {/* bookshelf */}
      <div className="mt-4 flex items-end justify-center gap-1">
        {items.map((item, i) => {
          const active = i === idx;
          return (
            <button
              key={i}
              onClick={() => setIdx(i)}
              title={item.name}
              aria-label={`${title} ${i + 1}: ${item.name}`}
              className="group flex h-16 items-end px-2"
            >
              <span
                className={`block rounded-sm transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                  active
                    ? "h-14 w-2 bg-[var(--accent)] -translate-y-1"
                    : "h-10 w-1.5 bg-[var(--border)] group-hover:bg-[var(--muted)]"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
