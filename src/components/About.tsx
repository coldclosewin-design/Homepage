"use client";

import { useState } from "react";

interface AboutItem {
  label: string;
  details: string[];
}

const interests: AboutItem[] = [
  {
    label: "시",
    details: [
      "일상적 글쓰기 '씀' 내 '춥다창문닫자' 1000여 편",
      "자작 시집 3권 — '한눈팔 일', '함께할 이', '몰래보 삼' (미출판 인쇄본)",
      "'그래도 사' 제작 중",
    ],
  },
  {
    label: "브랜딩",
    details: [
      "블로그 : 네이버 블로그 '너비아니' 운영 중",
    ],
  },
  {
    label: "만화영화",
    details: [
      "AI 시대 손으로 그릴 수 있는 역량 키우는 '맨땅헤딩' 프로젝트 진행 중",
      "일상 4컷 툰 기획 중 (초기)",
      "역동감 있는 무대사 만화영화 기획 (장기)",
    ],
  },
  {
    label: "자동화",
    details: [
      "AI 활용 — 일상 내 반복적인 비효율 선별",
      "불규칙 이벤트성 팝업 아이디어 작성 / 기록 루프 구성",
      "Claude Code · Codex · Discord 서버를 활용한 프로젝트 관리 트리 기획",
    ],
  },
];

export default function About() {
  const [active, setActive] = useState<string | null>("시");

  const toggle = (label: string) =>
    setActive((prev) => (prev === label ? null : label));

  const activeItem = interests.find((i) => i.label === active);

  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-2 text-sm font-medium tracking-widest uppercase text-[var(--accent)]">
          About
        </h2>
        <h3 className="mb-8 text-3xl font-bold tracking-tight">소개</h3>

        {/* 탭 버튼 */}
        <div className="mb-8 flex flex-wrap gap-3">
          {interests.map((item) => (
            <button
              key={item.label}
              onClick={() => toggle(item.label)}
              className={`rounded-full border px-5 py-2 text-sm transition-all ${
                active === item.label
                  ? "border-[var(--accent)] text-[var(--accent)] bg-[var(--accent)]/5"
                  : "border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* 상세 내용 */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            activeItem ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {activeItem && (
            <div className="rounded-xl border border-[var(--border)] p-6">
              <h4 className="mb-4 text-lg font-semibold">{activeItem.label}</h4>
              <ul className="space-y-2 text-[var(--muted)]">
                {activeItem.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
                    {activeItem.label === "브랜딩" && detail.includes("너비아니") ? (
                      <span>
                        블로그 : 네이버 블로그{" "}
                        <a
                          href="https://blog.naver.com/doyouknowb"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--accent)] underline underline-offset-2 hover:opacity-80"
                        >
                          &apos;너비아니&apos;
                        </a>{" "}
                        운영 중
                      </span>
                    ) : (
                      <span>{detail}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
