"use client";

import { useEffect, type CSSProperties, type FC, type ReactNode } from "react";

const LOGO_CSS = `
@keyframes logo-sway    { 0%,100%{transform:rotate(-2deg)} 50%{transform:rotate(2deg)} }
@keyframes logo-sway-s  { 0%,100%{transform:rotate(-1deg)} 50%{transform:rotate(1deg)} }
@keyframes logo-bob     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-3px)} }
@keyframes logo-bob-lg  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
@keyframes logo-hop     { 0%,100%{transform:translateY(0)} 25%{transform:translateY(-4px)} 50%{transform:translateY(0)} }
@keyframes logo-blink   { 0%,92%,100%{transform:scaleY(1)} 95%{transform:scaleY(.1)} }
@keyframes logo-tail    { 0%,100%{transform:rotate(-15deg)} 50%{transform:rotate(15deg)} }
@keyframes logo-flame   { 0%,100%{transform:scale(1,1) translateY(0)} 50%{transform:scale(1.08,1.14) translateY(-1px)} }
@keyframes logo-smoke   { 0%{transform:translateY(0) scale(1);opacity:.7} 100%{transform:translateY(-40px) scale(1.6);opacity:0} }
@keyframes logo-float   { 0%,100%{transform:translate(0,0)} 25%{transform:translate(3px,-4px)} 50%{transform:translate(0,-6px)} 75%{transform:translate(-3px,-3px)} }
@keyframes logo-flap    { 0%,100%{transform:scaleY(1)} 50%{transform:scaleY(.55)} }
@keyframes logo-wiggle  { 0%,100%{transform:translateX(0) rotate(0)} 50%{transform:translateX(2px) rotate(6deg)} }
@keyframes logo-swim    { 0%{transform:translateX(-20px) scaleX(1)} 48%{transform:translateX(260px) scaleX(1)} 50%{transform:translateX(260px) scaleX(-1)} 98%{transform:translateX(-20px) scaleX(-1)} 100%{transform:translateX(-20px) scaleX(1)} }
@keyframes logo-crawl   { 0%{transform:translateX(0)} 100%{transform:translateX(var(--crawl-dist,60px))} }
@keyframes logo-drip    { 0%{transform:translateY(-10px);opacity:0} 10%{opacity:1} 90%{opacity:1} 100%{transform:translateY(80px);opacity:0} }
@keyframes logo-grow    { 0%{transform:scaleY(.9)} 50%{transform:scaleY(1.03)} 100%{transform:scaleY(.9)} }
@keyframes logo-beam    { 0%,100%{opacity:.15} 50%{opacity:.35} }
@keyframes logo-peck    { 0%,100%{transform:rotate(0)} 20%{transform:rotate(25deg)} 40%{transform:rotate(0)} 60%{transform:rotate(22deg)} 80%{transform:rotate(0)} }
@keyframes logo-rise    { 0%{transform:translateY(0);opacity:0} 20%{opacity:1} 100%{transform:translateY(-30px);opacity:0} }
@keyframes logo-twist   { 0%,100%{transform:rotate(-3deg)} 50%{transform:rotate(3deg)} }
@keyframes logo-nibble  { 0%,100%{transform:translateY(0) rotate(0)} 50%{transform:translateY(1px) rotate(-4deg)} }
@keyframes logo-drift   { 0%{transform:translateX(0)} 100%{transform:translateX(var(--drift,-400px))} }
@keyframes logo-fall    { 0%{transform:translate(0,-20px) rotate(0);opacity:0} 10%{opacity:1} 100%{transform:translate(var(--fall-x,10px),180px) rotate(var(--fall-r,180deg));opacity:0} }
@keyframes logo-cast    { 0%,100%{transform:rotate(-6deg)} 50%{transform:rotate(4deg)} }
@keyframes logo-bubble  { 0%{transform:translateY(0) scale(.6);opacity:0} 20%{opacity:.9} 100%{transform:translateY(-50px) scale(1);opacity:0} }
@keyframes logo-paw     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-1px)} }
@keyframes logo-stage-in { from { opacity: 0; transform: translateY(8px) scale(.98); } to { opacity: 1; transform: none; } }
.logo-stage-anim { animation: logo-stage-in 400ms cubic-bezier(0.34,1.56,0.64,1) both; }

.logo-stage{
  position:relative;width:100%;height:100%;background:#fff;color:#111;
  display:flex;align-items:center;justify-content:center;
  font-family:'Nanum Myeongjo','Noto Serif KR','Gowun Batang',serif;
  overflow:hidden;
}
.logo-stage svg{display:block;width:100%;height:100%;}
.logo-stage .letter{
  fill:#111;font-weight:800;
  font-family:'Nanum Myeongjo','Noto Serif KR','Gowun Batang',serif;
}
`;

export function useLogoCss() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById("logo-css")) return;
    const s = document.createElement("style");
    s.id = "logo-css";
    s.textContent = LOGO_CSS;
    document.head.appendChild(s);
  }, []);
}

// ─── shared style tokens ────────────────────────────────
const stroke = {
  fill: "none",
  stroke: "#111",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};
const fill = { fill: "#111" };
const white = { fill: "#fff", stroke: "#111", strokeWidth: 1.2 };

// ─── Letter ─────────────────────────────────────────────
type LetterProps = { x: number; y: number; size?: number; children: ReactNode };
const Letter = ({ x, y, size = 260, children }: LetterProps) => (
  <text x={x} y={y} className="letter" fontSize={size} textAnchor="middle">
    {children}
  </text>
);

// ─── creature helpers ───────────────────────────────────
type P = {
  x: number;
  y: number;
  s?: number;
  flip?: boolean;
  anim?: string;
  delay?: number;
  dur?: number;
  r?: number;
};

const Bird = ({ x, y, s = 1, flip = false, anim, delay = 0 }: P) => (
  <g
    transform={`translate(${x},${y}) scale(${flip ? -s : s},${s})`}
    style={{
      animation: anim,
      animationDelay: delay + "s",
      transformOrigin: "center",
      transformBox: "fill-box",
    }}
  >
    <path
      d="M -8 0 C -6 -3, -2 -4, 2 -2 C 5 -1, 8 -1, 10 -3 C 9 -0.5, 7 1, 4 1 L 2 1 C -1 2, -5 2, -8 0 Z"
      {...fill}
    />
    <circle cx="6" cy="-2" r="0.9" fill="#fff" />
    <path d="M 10 -3 l 3 -1" {...stroke} />
    <path d="M -8 0 l -3 2" {...stroke} />
  </g>
);

const FlyBird = ({ x, y, s = 1, delay = 0, dur = 1.4 }: P) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <path
      d="M -10 0 Q -5 -6, 0 0 Q 5 -6, 10 0"
      {...stroke}
      strokeWidth={1.6}
      style={{
        animation: `logo-flap ${dur}s ease-in-out infinite`,
        animationDelay: delay + "s",
        transformOrigin: "center",
      }}
    />
  </g>
);

const CatCurled = ({ x, y, s = 1 }: P) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <path
      d="M -22 4 C -22 -8, -10 -14, 2 -14 C 14 -14, 22 -8, 22 4 C 22 10, 16 12, 8 10 C 0 8, -2 8, -10 10 C -18 12, -22 10, -22 4 Z"
      {...fill}
    />
    <path d="M -14 -10 l -2 -5 l 4 1 z" {...fill} />
    <path d="M -6 -12 l 1 -5 l 4 3 z" {...fill} />
    <path
      d="M 20 2 C 28 4, 28 -4, 22 -6"
      {...stroke}
      strokeWidth={2.4}
      style={{
        animation: "logo-sway-s 3.2s ease-in-out infinite",
        transformOrigin: "20px 2px",
      }}
    />
    <path d="M -8 -6 q 2 2 4 0" {...stroke} />
  </g>
);

const Fish = ({ x, y, s = 1, delay = 0 }: P) => (
  <g
    transform={`translate(${x},${y}) scale(${s})`}
    style={{
      animation: `logo-bob 2.6s ease-in-out infinite`,
      animationDelay: delay + "s",
      transformOrigin: "center",
    }}
  >
    <path d="M -10 0 C -8 -5, 4 -5, 8 0 C 4 5, -8 5, -10 0 Z" {...fill} />
    <path d="M -10 0 l -4 -3 l 0 6 z" {...fill} />
    <circle cx="5" cy="-1" r="0.8" fill="#fff" />
  </g>
);

const Butterfly = ({ x, y, s = 1, delay = 0 }: P) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <g
      style={{
        animation: `logo-flap .7s ease-in-out infinite`,
        animationDelay: delay + "s",
        transformOrigin: "0 0",
      }}
    >
      <path d="M 0 0 C -8 -6, -12 -2, -10 4 C -8 6, -2 4, 0 0 Z" {...fill} />
      <path d="M 0 0 C 8 -6, 12 -2, 10 4 C 8 6, 2 4, 0 0 Z" {...fill} />
    </g>
    <line x1="0" y1="-3" x2="0" y2="6" stroke="#111" strokeWidth="1.2" />
    <circle cx="-1.5" cy="-3.5" r="0.8" {...fill} />
    <circle cx="1.5" cy="-3.5" r="0.8" {...fill} />
  </g>
);

const Snail = ({ x, y, s = 1 }: P) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <path d="M -14 4 C -14 -2, -6 -2, -4 4 L -16 4 Z" {...fill} />
    <circle cx="2" cy="-2" r="9" {...fill} />
    <path
      d="M 2 -2 m -6 0 a 6 6 0 1 0 12 0 a 6 6 0 1 0 -12 0 m 3 0 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0"
      {...stroke}
      stroke="#fff"
      strokeWidth={1}
    />
    <line x1="-12" y1="0" x2="-15" y2="-4" {...stroke} />
    <line x1="-10" y1="0" x2="-12" y2="-5" {...stroke} />
    <circle cx="-15" cy="-4" r="0.8" {...fill} />
    <circle cx="-12" cy="-5" r="0.8" {...fill} />
  </g>
);

const Ant = ({ x, y, s = 1, flip = false }: P) => (
  <g transform={`translate(${x},${y}) scale(${flip ? -s : s},${s})`}>
    <circle cx="-4" cy="0" r="2" {...fill} />
    <circle cx="0" cy="0" r="1.8" {...fill} />
    <circle cx="4" cy="0" r="2.4" {...fill} />
    <line x1="-4" y1="-3" x2="-6" y2="-5" {...stroke} strokeWidth={0.9} />
    <line x1="-4" y1="-3" x2="-3" y2="-6" {...stroke} strokeWidth={0.9} />
    <line x1="0" y1="2" x2="-2" y2="4" {...stroke} strokeWidth={0.9} />
    <line x1="0" y1="2" x2="2" y2="4" {...stroke} strokeWidth={0.9} />
    <line x1="4" y1="2" x2="6" y2="4" {...stroke} strokeWidth={0.9} />
  </g>
);

const Leaf = ({ x, y, r = 0, s = 1 }: P) => (
  <g transform={`translate(${x},${y}) rotate(${r}) scale(${s})`}>
    <path d="M 0 0 C 6 -8, 14 -10, 18 -4 C 14 2, 6 4, 0 0 Z" {...fill} />
    <path d="M 0 0 Q 9 -4, 17 -5" {...stroke} stroke="#fff" strokeWidth={0.8} />
  </g>
);

const Flower = ({ x, y, s = 1 }: P) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    {[0, 60, 120, 180, 240, 300].map((a) => (
      <ellipse
        key={a}
        cx="0"
        cy="-5"
        rx="2.5"
        ry="4"
        {...fill}
        transform={`rotate(${a})`}
      />
    ))}
    <circle cx="0" cy="0" r="2" fill="#fff" stroke="#111" strokeWidth="1" />
  </g>
);

const Grass = ({ x, y, s = 1 }: P) => (
  <g
    transform={`translate(${x},${y}) scale(${s})`}
    style={{
      animation: "logo-sway-s 3s ease-in-out infinite",
      transformOrigin: "bottom",
    }}
  >
    <path d="M 0 0 C -2 -8, -4 -10, -5 -12" {...stroke} />
    <path d="M 0 0 C 0 -8, 0 -12, 0 -14" {...stroke} />
    <path d="M 0 0 C 2 -7, 4 -10, 5 -11" {...stroke} />
  </g>
);

// ════════════════════════════════════════════════════════
// 시 — SECTION 1
// ════════════════════════════════════════════════════════

// 01 · 새들의 쉼터
const SiBirds: FC = () => (
  <div className="logo-stage">
    <svg viewBox="0 0 420 420">
      <Letter x={210} y={295}>시</Letter>
      <g transform="translate(132,210)">
        <path
          d="M -18 4 C -18 -6, 18 -6, 18 4 C 12 8, -12 8, -18 4 Z"
          {...stroke}
          strokeWidth="1.6"
        />
        <path
          d="M -16 0 l 32 0 M -14 3 l 28 0 M -15 -2 l 30 0"
          {...stroke}
          strokeWidth="0.9"
        />
        <g
          style={{
            animation: "logo-bob 1.6s ease-in-out infinite",
            transformOrigin: "center",
          }}
        >
          <circle cx="-8" cy="-2" r="3.5" {...fill} />
          <path d="M -10 -2 l -2.5 -0.8 l 2.5 -0.8 z" {...fill} />
          <circle cx="-7" cy="-3" r="0.6" fill="#fff" />
        </g>
        <g
          style={{
            animation: "logo-bob 1.8s ease-in-out .4s infinite",
            transformOrigin: "center",
          }}
        >
          <circle cx="0" cy="-3" r="3.5" {...fill} />
          <path d="M -2 -3 l -2.5 -0.8 l 2.5 -0.8 z" {...fill} />
          <circle cx="1" cy="-4" r="0.6" fill="#fff" />
        </g>
        <g
          style={{
            animation: "logo-bob 1.4s ease-in-out .7s infinite",
            transformOrigin: "center",
          }}
        >
          <circle cx="8" cy="-2" r="3.5" {...fill} />
          <path d="M 10 -2 l 2.5 -0.8 l -2.5 -0.8 z" {...fill} />
          <circle cx="7" cy="-3" r="0.6" fill="#fff" />
        </g>
      </g>
      <g
        transform="translate(300,96)"
        style={{
          animation: "logo-sway-s 4s ease-in-out infinite",
          transformOrigin: "center bottom",
        }}
      >
        <path
          d="M -14 0 C -10 -6, -4 -8, 4 -6 C 10 -5, 14 -3, 16 0 C 12 4, 2 6, -8 4 C -12 3, -14 1, -14 0 Z"
          {...fill}
        />
        <path d="M 16 -2 l 5 -1 l -3 3 z" {...fill} />
        <circle cx="10" cy="-2" r="1" fill="#fff" />
        <path d="M -4 4 l -1 4 M 2 5 l 1 4" {...stroke} />
      </g>
      <FlyBird x={80} y={70} s={0.9} dur={1.3} />
      <FlyBird x={360} y={60} s={0.7} delay={0.3} dur={1.5} />
      <FlyBird x={40} y={130} s={0.6} delay={0.6} dur={1.6} />
    </svg>
  </div>
);

// 02 · 지붕 위 정원
const SiGarden: FC = () => (
  <div className="logo-stage">
    <svg viewBox="0 0 420 420">
      <Letter x={210} y={305}>시</Letter>
      <g transform="translate(298,115)">
        <path
          d="M 0 0 C -6 -10, 4 -20, -2 -30 C -8 -40, 6 -50, 0 -60"
          {...stroke}
          strokeWidth="1.6"
          style={{
            animation: "logo-sway-s 5s ease-in-out infinite",
            transformOrigin: "0 0",
          }}
        />
        <g
          style={{
            animation: "logo-sway-s 5s ease-in-out infinite",
            transformOrigin: "0 0",
          }}
        >
          <Leaf x={-5} y={-15} r={-30} s={0.55} />
          <Leaf x={4} y={-28} r={40} s={0.6} />
          <Leaf x={-6} y={-42} r={-20} s={0.5} />
          <Flower x={2} y={-58} s={0.9} />
        </g>
      </g>
      <g transform="translate(133,140)">
        <Grass x={-20} y={0} s={1.1} />
        <Grass x={-8} y={0} s={0.9} />
        <Grass x={4} y={0} s={1.0} />
        <Flower x={-14} y={-6} s={1} />
        <Flower x={12} y={-4} s={0.8} />
      </g>
      <g
        style={{
          animation: "logo-float 5s ease-in-out infinite",
          transformOrigin: "center",
        }}
      >
        <Butterfly x={220} y={130} s={1.2} />
      </g>
      <g style={{ animation: "logo-float 4s ease-in-out .6s infinite" }}>
        <circle cx={85} cy={165} r={2} {...fill} />
        <circle
          cx={82}
          cy={163}
          r={1.2}
          fill="#fff"
          stroke="#111"
          strokeWidth="0.6"
        />
      </g>
    </svg>
  </div>
);

// 03 · 물속의 시
const SiFish: FC = () => {
  const bubbles: [number, number, number][] = [
    [90, 340, 0],
    [260, 360, 1.2],
    [170, 350, 2.4],
    [320, 330, 0.6],
  ];
  return (
    <div className="logo-stage">
      <svg viewBox="0 0 420 420">
        <Letter x={210} y={285}>시</Letter>
        <g>
          <path
            d="M 0 240 Q 30 236, 60 240 T 120 240 T 180 240 T 240 240 T 300 240 T 360 240 T 420 240"
            {...stroke}
            strokeWidth="1.2"
            style={{
              animation: "logo-sway-s 6s ease-in-out infinite",
              transformOrigin: "center",
            }}
          />
          <path
            d="M 0 252 Q 40 248, 80 252 T 160 252 T 240 252 T 320 252 T 420 252"
            {...stroke}
            strokeWidth="0.9"
            opacity="0.5"
          />
          <path
            d="M 0 262 Q 30 258, 60 262 T 120 262 T 180 262 T 240 262 T 300 262 T 360 262 T 420 262"
            {...stroke}
            strokeWidth="0.8"
            opacity="0.35"
          />
        </g>
        <g
          style={
            {
              animation: "logo-drift 14s linear infinite",
              "--drift": "-500px",
            } as CSSProperties
          }
        >
          <g transform="translate(520,320)">
            <Fish x={0} y={0} s={1.6} />
          </g>
        </g>
        <g
          style={
            {
              animation: "logo-drift 18s linear infinite",
              "--drift": "-520px",
            } as CSSProperties
          }
        >
          <g transform="translate(520,360)">
            <Fish x={0} y={0} s={1.1} />
          </g>
        </g>
        <g
          style={
            {
              animation: "logo-drift 22s linear 3s infinite",
              "--drift": "-540px",
            } as CSSProperties
          }
        >
          <g transform="translate(520,295)">
            <Fish x={0} y={0} s={0.9} />
          </g>
        </g>
        <g>
          {bubbles.map(([x, y, d], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="2"
              fill="none"
              stroke="#111"
              strokeWidth="1"
              style={{
                animation: `logo-bubble 3s ease-out ${d}s infinite`,
                transformOrigin: `${x}px ${y}px`,
              }}
            />
          ))}
        </g>
        <FlyBird x={330} y={70} s={0.9} dur={1.6} />
        <FlyBird x={80} y={90} s={0.7} delay={0.4} dur={1.4} />
      </svg>
    </div>
  );
};

// 04 · 고양이 낮잠
const SiCat: FC = () => (
  <div className="logo-stage">
    <svg viewBox="0 0 420 420">
      <Letter x={210} y={300}>시</Letter>
      <g
        transform="translate(298,132)"
        style={{
          animation: "logo-bob 4s ease-in-out infinite",
          transformOrigin: "center",
        }}
      >
        <CatCurled x={0} y={0} s={1.5} />
      </g>
      <g
        transform="translate(330,110)"
        style={{
          animation: "logo-rise 3s ease-out infinite",
          transformOrigin: "center",
        }}
      >
        <text
          x="0"
          y="0"
          fontFamily="Nanum Myeongjo, serif"
          fontSize="18"
          fontStyle="italic"
          fill="#111"
        >
          z
        </text>
      </g>
      <g
        transform="translate(340,92)"
        style={{
          animation: "logo-rise 3s ease-out 1s infinite",
          transformOrigin: "center",
        }}
      >
        <text
          x="0"
          y="0"
          fontFamily="Nanum Myeongjo, serif"
          fontSize="14"
          fontStyle="italic"
          fill="#111"
        >
          z
        </text>
      </g>
      <g
        transform="translate(350,76)"
        style={{
          animation: "logo-rise 3s ease-out 2s infinite",
          transformOrigin: "center",
        }}
      >
        <text
          x="0"
          y="0"
          fontFamily="Nanum Myeongjo, serif"
          fontSize="11"
          fontStyle="italic"
          fill="#111"
        >
          z
        </text>
      </g>
      <g transform="translate(80,300)">
        <g
          style={{
            animation: "logo-wiggle 1.2s ease-in-out infinite",
            transformOrigin: "center",
          }}
        >
          <ellipse cx="0" cy="0" rx="9" ry="6" {...fill} />
          <circle cx="-9" cy="-1" r="3.5" {...fill} />
          <path
            d="M -11 -3 l -1 -3 l 3 2 z M -8 -5 l 0 -3 l 2.5 1 z"
            {...fill}
          />
          <circle cx="-11" cy="-1" r="0.7" fill="#fff" />
          <path d="M 8 0 q 10 2, 14 -4" {...stroke} strokeWidth="1" />
        </g>
      </g>
    </svg>
  </div>
);

// 05 · 가지 뻗기
const SiTree: FC = () => (
  <div className="logo-stage">
    <svg viewBox="0 0 420 420">
      <Letter x={210} y={295}>시</Letter>
      <g transform="translate(132,148)">
        <path d="M 0 0 C -2 -15, -10 -20, -16 -34" {...stroke} strokeWidth="1.8" />
        <path d="M 0 0 C 2 -12, 8 -18, 14 -28" {...stroke} strokeWidth="1.8" />
        <path
          d="M -10 -24 C -16 -26, -22 -30, -26 -38"
          {...stroke}
          strokeWidth="1.2"
        />
        <path d="M 8 -18 C 12 -22, 20 -22, 24 -30" {...stroke} strokeWidth="1.2" />
        <g
          style={{
            animation: "logo-sway-s 3.8s ease-in-out infinite",
            transformOrigin: "0 0",
          }}
        >
          <Leaf x={-24} y={-38} r={-60} s={0.6} />
          <Leaf x={-16} y={-34} r={-20} s={0.5} />
          <Leaf x={14} y={-28} r={30} s={0.6} />
          <Leaf x={24} y={-30} r={60} s={0.55} />
          <Leaf x={-2} y={-18} r={-10} s={0.45} />
        </g>
      </g>
      <g
        transform="translate(125,115)"
        style={{
          animation: "logo-hop 2s ease-in-out infinite",
          transformOrigin: "center",
        }}
      >
        <Bird x={0} y={0} s={1.2} />
      </g>
      <g
        style={
          {
            animation: "logo-fall 6s linear infinite",
            "--fall-x": "40px",
            "--fall-r": "200deg",
          } as CSSProperties
        }
      >
        <Leaf x={220} y={120} r={0} s={0.5} />
      </g>
      <g
        style={
          {
            animation: "logo-fall 7s linear 2s infinite",
            "--fall-x": "-20px",
            "--fall-r": "160deg",
          } as CSSProperties
        }
      >
        <Leaf x={260} y={130} r={0} s={0.45} />
      </g>
    </svg>
  </div>
);

// 06 · 달과 여우
const SiMoon: FC = () => {
  const stars: [number, number, number][] = [
    [60, 80, 0],
    [100, 50, 0.5],
    [360, 180, 1],
    [270, 60, 1.5],
    [40, 160, 0.8],
  ];
  return (
    <div className="logo-stage">
      <svg viewBox="0 0 420 420">
        <circle cx="305" cy="115" r="42" {...stroke} strokeWidth="1.4" />
        <circle cx="298" cy="108" r="3" {...fill} />
        <circle cx="318" cy="124" r="2" {...fill} />
        <circle cx="292" cy="128" r="1.5" {...fill} />
        <Letter x={210} y={295}>시</Letter>
        <g transform="translate(130,298)">
          <g
            style={{
              animation: "logo-bob 4s ease-in-out infinite",
              transformOrigin: "center bottom",
            }}
          >
            <path d="M -4 0 C -4 -14, 12 -14, 12 0 Z" {...fill} />
            <path
              d="M -2 -10 l -5 -10 l 2 -1 l 3 4 l 3 -4 l 2 1 z M 0 -8 l -3 -8 M 2 -8 l 3 -8"
              {...fill}
              stroke="#111"
              strokeWidth="0.4"
            />
            <circle cx="0" cy="-11" r="0.9" fill="#fff" />
            <path
              d="M 12 -2 C 22 -4, 26 -12, 22 -18 C 20 -14, 16 -10, 12 -2 Z"
              {...fill}
              style={{
                animation: "logo-sway 2.8s ease-in-out infinite",
                transformOrigin: "12px 0",
              }}
            />
            <path
              d="M 22 -16 C 23 -17, 24 -16, 23 -14"
              stroke="#fff"
              fill="none"
              strokeWidth="1"
              style={{
                animation: "logo-sway 2.8s ease-in-out infinite",
                transformOrigin: "12px 0",
              }}
            />
          </g>
        </g>
        {stars.map(([x, y, d], i) => (
          <g
            key={i}
            transform={`translate(${x},${y})`}
            style={{
              animation: `logo-beam 2.4s ease-in-out ${d}s infinite`,
              transformOrigin: "center",
            }}
          >
            <path
              d="M 0 -3 L 0.6 -0.6 L 3 0 L 0.6 0.6 L 0 3 L -0.6 0.6 L -3 0 L -0.6 -0.6 Z"
              {...fill}
            />
          </g>
        ))}
      </svg>
    </div>
  );
};

// 07 · 달팽이의 산책
const SiSnail: FC = () => (
  <div className="logo-stage">
    <svg viewBox="0 0 420 420">
      <Letter x={210} y={295}>시</Letter>
      <g
        style={
          {
            animation: "logo-drift 20s linear infinite",
            "--drift": "-340px",
          } as CSSProperties
        }
      >
        <g transform="translate(380,310)">
          <Snail x={0} y={0} s={1.4} />
        </g>
      </g>
      <path
        d="M 60 314 l 300 0"
        {...stroke}
        strokeWidth="0.8"
        strokeDasharray="2 4"
        opacity="0.35"
      />
      <g
        transform="translate(298,128)"
        style={{
          animation: "logo-bob 2.2s ease-in-out infinite",
          transformOrigin: "center",
        }}
      >
        <ellipse cx="0" cy="0" rx="8" ry="7" {...fill} />
        <line x1="0" y1="-7" x2="0" y2="7" stroke="#fff" strokeWidth="1" />
        <circle cx="-3" cy="-2" r="1" fill="#fff" />
        <circle cx="3" cy="-2" r="1" fill="#fff" />
        <circle cx="-3" cy="3" r="1" fill="#fff" />
        <circle cx="3" cy="3" r="1" fill="#fff" />
        <path d="M -4 -7 a 4 3 0 0 1 8 0 z" {...fill} />
        <line x1="-2" y1="-10" x2="-3" y2="-12" {...stroke} strokeWidth="0.7" />
        <line x1="2" y1="-10" x2="3" y2="-12" {...stroke} strokeWidth="0.7" />
      </g>
      <Grass x={90} y={314} s={0.8} />
      <Grass x={260} y={314} s={0.7} />
    </svg>
  </div>
);

// 08 · 나비의 하루
const SiButterfly: FC = () => (
  <div className="logo-stage">
    <svg viewBox="0 0 420 420">
      <Letter x={210} y={295}>시</Letter>
      <g>
        <g transform="translate(90,318)">
          <path d="M 0 0 l 0 -14" {...stroke} />
          <Flower x={0} y={-14} s={1.1} />
        </g>
        <g transform="translate(210,324)">
          <path d="M 0 0 l 0 -10" {...stroke} />
          <Flower x={0} y={-10} s={0.9} />
        </g>
        <g transform="translate(250,322)">
          <path d="M 0 0 l 0 -12" {...stroke} />
          <Flower x={0} y={-12} s={0.85} />
        </g>
      </g>
      <g style={{ animation: "logo-float 5s ease-in-out infinite" }}>
        <Butterfly x={150} y={100} s={1.8} delay={0} />
      </g>
      <g style={{ animation: "logo-float 4.3s ease-in-out 1s infinite" }}>
        <Butterfly x={300} y={160} s={1.3} delay={0.2} />
      </g>
      <g style={{ animation: "logo-float 6s ease-in-out 2s infinite" }}>
        <Butterfly x={340} y={240} s={1.0} delay={0.4} />
      </g>
      <g style={{ animation: "logo-float 5.5s ease-in-out .3s infinite" }}>
        <Butterfly x={65} y={190} s={0.9} delay={0.1} />
      </g>
    </svg>
  </div>
);

// ════════════════════════════════════════════════════════
// ㅅ — SECTION 2
// ════════════════════════════════════════════════════════

// 09 · 산속 모닥불
const SCampfire: FC = () => (
  <div className="logo-stage">
    <svg viewBox="0 0 420 420">
      <Letter x={210} y={330} size={360}>ㅅ</Letter>
      <g transform="translate(210,300)">
        <rect x="-18" y="0" width="36" height="5" rx="1" {...fill} transform="rotate(15)" />
        <rect
          x="-18"
          y="0"
          width="36"
          height="5"
          rx="1"
          {...fill}
          transform="rotate(-15) translate(0 -2)"
        />
        <g
          style={{
            animation: "logo-flame 0.6s ease-in-out infinite",
            transformOrigin: "center bottom",
          }}
        >
          <path
            d="M 0 0 C -10 -6, -8 -18, -2 -22 C -4 -14, 0 -12, 2 -18 C 6 -12, 10 -10, 8 -4 C 6 0, -6 2, 0 0 Z"
            {...fill}
          />
        </g>
        <g
          style={{
            animation: "logo-flame 0.8s ease-in-out 0.3s infinite",
            transformOrigin: "center bottom",
          }}
        >
          <path
            d="M 0 -2 C -4 -6, -2 -12, 0 -14 C 2 -10, 4 -8, 2 -4 Z"
            fill="#fff"
          />
        </g>
      </g>
      {[0, 1, 2].map((i) => (
        <g
          key={i}
          style={{
            animation: `logo-smoke 3s ease-out ${i}s infinite`,
            transformOrigin: "center",
          }}
        >
          <circle cx="210" cy="150" r="6" {...fill} opacity="0.6" />
        </g>
      ))}
      <g
        transform="translate(210,148)"
        style={{
          animation: "logo-bob 2s ease-in-out infinite",
          transformOrigin: "center bottom",
        }}
      >
        <Bird x={0} y={0} s={0.7} flip />
      </g>
    </svg>
  </div>
);

// 10 · 개미 행렬
const SAnts: FC = () => (
  <div className="logo-stage">
    <svg viewBox="0 0 420 420">
      <Letter x={210} y={330} size={360}>ㅅ</Letter>
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={"l" + i}>
          <g
            style={
              {
                offsetPath: `path('M 165 320 L 210 150')`,
                offsetRotate: "auto",
                animation: `ant-walk-l 9s linear ${-i * 1.8}s infinite`,
              } as CSSProperties
            }
          >
            <Ant x={0} y={-6} s={0.7} />
          </g>
        </g>
      ))}
      {[0, 1, 2].map((i) => (
        <g key={"r" + i}>
          <g
            style={
              {
                offsetPath: `path('M 290 320 L 210 150')`,
                offsetRotate: "auto",
                animation: `ant-walk-r 11s linear ${-i * 3.6}s infinite`,
              } as CSSProperties
            }
          >
            <Ant x={0} y={-6} s={0.65} />
          </g>
        </g>
      ))}
      <style>{`
        @keyframes ant-walk-l { 0%{offset-distance:0%} 100%{offset-distance:100%} }
        @keyframes ant-walk-r { 0%{offset-distance:0%} 100%{offset-distance:100%} }
      `}</style>
      <circle cx="110" cy="334" r="4" {...fill} />
      <circle cx="108" cy="332" r="1.2" fill="#fff" />
    </svg>
  </div>
);

// 11 · 지붕 위 둥지
const STreehouse: FC = () => (
  <div className="logo-stage">
    <svg viewBox="0 0 420 420">
      <Letter x={210} y={330} size={360}>ㅅ</Letter>
      <g transform="translate(210,130)">
        <rect x="-22" y="-4" width="44" height="28" {...white} />
        <path d="M -26 -4 L 0 -22 L 26 -4 Z" {...fill} />
        <rect x="-6" y="8" width="12" height="16" {...fill} />
        <rect x="-15" y="0" width="6" height="6" {...fill} />
        <rect x="9" y="0" width="6" height="6" {...fill} />
        <rect x="10" y="-18" width="4" height="8" {...fill} />
        {[0, 1, 2].map((i) => (
          <circle
            key={i}
            cx="12"
            cy="-24"
            r="2.4"
            {...fill}
            style={{
              animation: `logo-smoke 2.6s ease-out ${i * 0.9}s infinite`,
              transformOrigin: "12px -24px",
              opacity: 0.6,
            }}
          />
        ))}
      </g>
      <g
        transform="translate(210,142)"
        style={{
          animation: "logo-bob 3s ease-in-out infinite",
          transformOrigin: "center",
        }}
      >
        <circle cx="0" cy="0" r="3" {...fill} />
        <circle cx="0" cy="-1" r="0.8" fill="#fff" />
      </g>
      <FlyBird x={100} y={100} s={0.9} dur={1.4} />
      <FlyBird x={320} y={140} s={0.7} delay={0.5} />
      <FlyBird x={70} y={180} s={0.5} delay={1} />
    </svg>
  </div>
);

// 12 · 언덕의 여우
const SFox: FC = () => (
  <div className="logo-stage">
    <svg viewBox="0 0 420 420">
      <Letter x={210} y={330} size={360}>ㅅ</Letter>
      <g transform="translate(185,228) rotate(-70)">
        <g
          style={{
            animation: "logo-bob 3s ease-in-out infinite",
            transformOrigin: "center",
          }}
        >
          <path
            d="M 20 -4 C 36 -6, 40 6, 30 10 C 26 6, 22 2, 20 -4 Z"
            {...fill}
          />
          <path
            d="M 36 2 C 37 0, 38 2, 37 4"
            stroke="#fff"
            strokeWidth="1"
            fill="none"
          />
          <ellipse cx="5" cy="0" rx="14" ry="8" {...fill} />
          <rect x="-6" y="5" width="3" height="7" {...fill} />
          <rect x="10" y="5" width="3" height="7" {...fill} />
          <g>
            <path
              d="M -14 -2 C -22 -2, -22 -12, -14 -10 l 4 -6 l 2 5 l 3 -4 l 1 5 C 0 -8, -2 2, -10 2 Z"
              {...fill}
            />
            <circle cx="-14" cy="-5" r="0.8" fill="#fff" />
            <circle cx="-18" cy="-4" r="0.6" fill="#fff" />
          </g>
        </g>
      </g>
      <g transform="translate(260,260) rotate(60)">
        <g
          style={{
            animation: "logo-hop 1.6s ease-in-out infinite",
            transformOrigin: "center bottom",
          }}
        >
          <ellipse cx="0" cy="0" rx="8" ry="5" {...fill} />
          <path
            d="M 8 -1 l 4 -8 l 2 0 l -2 7 z M 10 1 l 5 -9 l 2 2 l -4 8 z"
            {...fill}
          />
          <circle cx="-4" cy="-2" r="4" {...fill} />
          <circle cx="-5" cy="-2" r="0.6" fill="#fff" />
          <circle
            cx="6"
            cy="2"
            r="2.5"
            fill="#fff"
            stroke="#111"
            strokeWidth="0.8"
          />
        </g>
      </g>
    </svg>
  </div>
);

// 13 · 덩굴의 여정
const SVines: FC = () => (
  <div className="logo-stage">
    <svg viewBox="0 0 420 420">
      <Letter x={210} y={330} size={360}>ㅅ</Letter>
      <g
        style={{
          animation: "logo-sway-s 5s ease-in-out infinite",
          transformOrigin: "210px 300px",
        }}
      >
        <path
          d="M 150 330 C 160 310, 145 290, 160 275 C 175 260, 160 240, 175 220 C 190 200, 180 180, 195 165"
          {...stroke}
          strokeWidth="1.4"
        />
        <Leaf x={155} y={310} r={-60} s={0.5} />
        <Leaf x={162} y={272} r={130} s={0.55} />
        <Leaf x={172} y={222} r={-50} s={0.5} />
        <Leaf x={190} y={180} r={140} s={0.55} />
        <Flower x={198} y={162} s={0.8} />
      </g>
      <g
        style={{
          animation: "logo-sway-s 5.5s ease-in-out .6s infinite",
          transformOrigin: "210px 300px",
        }}
      >
        <path
          d="M 270 330 C 258 310, 272 290, 256 275 C 240 260, 252 238, 236 220 C 220 200, 228 180, 218 165"
          {...stroke}
          strokeWidth="1.4"
        />
        <Leaf x={264} y={308} r={60} s={0.5} />
        <Leaf x={258} y={272} r={-130} s={0.5} />
        <Leaf x={240} y={224} r={50} s={0.55} />
        <Leaf x={230} y={182} r={-140} s={0.5} />
      </g>
      <g style={{ animation: "logo-float 5s ease-in-out infinite" }}>
        <g transform="translate(120,170)">
          <ellipse cx="0" cy="0" rx="4" ry="3" {...fill} />
          <ellipse
            cx="0"
            cy="0"
            rx="4"
            ry="3"
            fill="none"
            stroke="#fff"
            strokeWidth="1"
          />
          <path
            d="M -4 -2 q -2 -4, -6 -1 M 4 -2 q 2 -4, 6 -1"
            {...stroke}
            strokeWidth="0.6"
          />
        </g>
      </g>
    </svg>
  </div>
);

// 14 · 비 오는 날
const SRain: FC = () => (
  <div className="logo-stage">
    <svg viewBox="0 0 420 420">
      <Letter x={210} y={330} size={360}>ㅅ</Letter>
      {[80, 120, 160, 180, 230, 270, 300, 340].map((x, i) => (
        <g
          key={i}
          style={{
            animation: `logo-drip 1.6s linear ${i * 0.2}s infinite`,
            transformOrigin: `${x}px 60px`,
          }}
        >
          <path d={`M ${x} 60 q 1 4, 0 8 q -1 -4, 0 -8 z`} {...fill} />
        </g>
      ))}
      <g
        transform="translate(210,310)"
        style={{
          animation: "logo-bob 2.4s ease-in-out infinite",
          transformOrigin: "center bottom",
        }}
      >
        <ellipse cx="0" cy="0" rx="22" ry="10" {...fill} />
        <circle cx="-9" cy="-10" r="6" {...fill} />
        <circle cx="9" cy="-10" r="6" {...fill} />
        <circle cx="-9" cy="-10" r="3" fill="#fff" />
        <circle cx="9" cy="-10" r="3" fill="#fff" />
        <circle
          cx="-9"
          cy="-10"
          r="1.4"
          {...fill}
          style={{
            animation: "logo-blink 3.4s ease-in-out infinite",
            transformOrigin: "-9px -10px",
          }}
        />
        <circle
          cx="9"
          cy="-10"
          r="1.4"
          {...fill}
          style={{
            animation: "logo-blink 3.4s ease-in-out infinite",
            transformOrigin: "9px -10px",
          }}
        />
        <path d="M -8 -1 q 8 4, 16 0" {...stroke} />
      </g>
      <ellipse cx="210" cy="360" rx="90" ry="3" {...stroke} opacity="0.5" />
      <ellipse cx="210" cy="360" rx="60" ry="2" {...stroke} opacity="0.35" />
    </svg>
  </div>
);

// ════════════════════════════════════════════════════════
// ㅣ — SECTION 3
// ════════════════════════════════════════════════════════

// 15 · 전깃줄의 새
const IWire: FC = () => (
  <div className="logo-stage">
    <svg viewBox="0 0 420 420">
      <Letter x={210} y={330} size={340}>ㅣ</Letter>
      <path
        d="M 40 180 C 140 184, 280 176, 380 182"
        {...stroke}
        strokeWidth="1.2"
      />
      <path
        d="M 40 200 C 140 204, 280 196, 380 202"
        {...stroke}
        strokeWidth="1.2"
      />
      <g
        transform="translate(90,180)"
        style={{
          animation: "logo-sway-s 3s ease-in-out infinite",
          transformOrigin: "center bottom",
        }}
      >
        <g transform="translate(0,-8) scale(1.4)">
          <ellipse cx="0" cy="0" rx="6" ry="4.5" {...fill} />
          <circle cx="5" cy="-2" r="3" {...fill} />
          <path d="M 8 -2 l 3 -1 l -3 2 z" {...fill} />
          <circle cx="5" cy="-2.5" r="0.6" fill="#fff" />
          <line x1="-1" y1="4" x2="-1" y2="8" {...stroke} strokeWidth="0.9" />
          <line x1="1" y1="4" x2="1" y2="8" {...stroke} strokeWidth="0.9" />
        </g>
      </g>
      <g
        transform="translate(150,180)"
        style={{
          animation: "logo-sway-s 3.4s ease-in-out .5s infinite",
          transformOrigin: "center bottom",
        }}
      >
        <g transform="translate(0,-8) scale(1.2)">
          <ellipse cx="0" cy="0" rx="6" ry="4.5" {...fill} />
          <circle cx="-5" cy="-2" r="3" {...fill} />
          <path d="M -8 -2 l -3 -1 l 3 2 z" {...fill} />
          <line x1="-1" y1="4" x2="-1" y2="8" {...stroke} strokeWidth="0.9" />
          <line x1="1" y1="4" x2="1" y2="8" {...stroke} strokeWidth="0.9" />
        </g>
      </g>
      <g
        transform="translate(270,200)"
        style={{
          animation: "logo-sway-s 2.8s ease-in-out .3s infinite",
          transformOrigin: "center bottom",
        }}
      >
        <g transform="translate(0,-7) scale(1.1)">
          <ellipse cx="0" cy="0" rx="5" ry="4" {...fill} />
          <circle cx="4" cy="-2" r="2.5" {...fill} />
          <path d="M 6 -2 l 3 -1 l -3 2 z" {...fill} />
          <line x1="-1" y1="3.5" x2="-1" y2="7" {...stroke} strokeWidth="0.9" />
          <line x1="1" y1="3.5" x2="1" y2="7" {...stroke} strokeWidth="0.9" />
        </g>
      </g>
      <g
        transform="translate(320,200)"
        style={{
          animation: "logo-sway-s 3.2s ease-in-out .8s infinite",
          transformOrigin: "center bottom",
        }}
      >
        <g transform="translate(0,-7) scale(1.3)">
          <ellipse cx="0" cy="0" rx="6" ry="4.5" {...fill} />
          <circle cx="5" cy="-2" r="3" {...fill} />
          <path d="M 8 -2 l 3 -1 l -3 2 z" {...fill} />
          <line x1="-1" y1="4" x2="-1" y2="8" {...stroke} strokeWidth="0.9" />
          <line x1="1" y1="4" x2="1" y2="8" {...stroke} strokeWidth="0.9" />
        </g>
      </g>
      <FlyBird x={60} y={80} s={0.8} dur={1.4} />
      <FlyBird x={340} y={100} s={0.6} delay={0.4} dur={1.5} />
    </svg>
  </div>
);

// 16 · 홀로 선 나무
const ITree: FC = () => (
  <div className="logo-stage">
    <svg viewBox="0 0 420 420">
      <Letter x={210} y={330} size={340}>ㅣ</Letter>
      <g
        transform="translate(210,135)"
        style={{
          animation: "logo-sway-s 5s ease-in-out infinite",
          transformOrigin: "center bottom",
        }}
      >
        <circle cx="-30" cy="0" r="22" {...fill} />
        <circle cx="30" cy="-4" r="24" {...fill} />
        <circle cx="0" cy="-18" r="26" {...fill} />
        <circle cx="-12" cy="10" r="16" {...fill} />
        <circle cx="14" cy="12" r="14" {...fill} />
        <circle cx="-20" cy="-5" r="1.5" fill="#fff" />
        <circle cx="10" cy="-14" r="1.8" fill="#fff" />
        <circle cx="-5" cy="2" r="1.2" fill="#fff" />
        <circle cx="22" cy="0" r="1.5" fill="#fff" />
      </g>
      <ellipse cx="210" cy="250" rx="11" ry="13" fill="#fff" />
      <ellipse cx="210" cy="250" rx="11" ry="13" {...stroke} />
      <g
        transform="translate(210,252)"
        style={{
          animation: "logo-bob 4s ease-in-out infinite",
          transformOrigin: "center",
        }}
      >
        <path d="M -7 4 C -7 -6, 7 -6, 7 4 Z" {...fill} />
        <circle cx="-3" cy="-1" r="2.5" fill="#fff" />
        <circle cx="3" cy="-1" r="2.5" fill="#fff" />
        <circle
          cx="-3"
          cy="-1"
          r="1.3"
          {...fill}
          style={{
            animation: "logo-blink 4s ease-in-out infinite",
            transformOrigin: "-3px -1px",
          }}
        />
        <circle
          cx="3"
          cy="-1"
          r="1.3"
          {...fill}
          style={{
            animation: "logo-blink 4s ease-in-out 0.1s infinite",
            transformOrigin: "3px -1px",
          }}
        />
        <path d="M 0 1 l -1.5 2 l 1.5 1 l 1.5 -1 z" fill="#fff" />
      </g>
      <g
        transform="translate(232,205)"
        style={{
          animation: "logo-bob 3s ease-in-out infinite",
          transformOrigin: "center",
        }}
      >
        <ellipse cx="0" cy="0" rx="7" ry="5" {...fill} />
        <circle cx="6" cy="-3" r="3.5" {...fill} />
        <path d="M 4 -6 l 1 -3 l 2 2 z M 8 -6 l 2 -3 l 1 3 z" {...fill} />
        <circle cx="7" cy="-4" r="0.6" fill="#fff" />
        <path
          d="M -5 0 C -16 -2, -16 -18, -6 -14 C -4 -10, -5 -4, -5 0 Z"
          {...fill}
          style={{
            animation: "logo-sway 2.4s ease-in-out infinite",
            transformOrigin: "-5px 0",
          }}
        />
      </g>
    </svg>
  </div>
);

// 17 · 등대와 갈매기
const ILighthouse: FC = () => (
  <div className="logo-stage">
    <svg viewBox="0 0 420 420">
      <Letter x={210} y={330} size={340}>ㅣ</Letter>
      <g transform="translate(210,135)">
        <rect x="-18" y="-6" width="36" height="4" {...fill} />
        <rect x="-14" y="-22" width="28" height="16" {...white} />
        <path d="M -14 -22 l 14 -10 l 14 10 z" {...fill} />
        <rect x="-10" y="-19" width="20" height="10" {...fill} />
        <g
          style={{
            animation: "logo-beam 2.5s ease-in-out infinite",
            transformOrigin: "210px -14px",
          }}
        >
          <path d="M 0 -14 L -120 -70 L -120 42 Z" fill="#111" opacity="0.08" />
          <path d="M 0 -14 L 120 -70 L 120 42 Z" fill="#111" opacity="0.08" />
        </g>
      </g>
      <g
        style={{
          animation: "logo-sway-s 4s ease-in-out infinite",
          transformOrigin: "center",
        }}
      >
        <path
          d="M 40 360 Q 80 354, 120 360 T 200 360 T 280 360 T 360 360 T 420 360"
          {...stroke}
          strokeWidth="1.4"
        />
        <path
          d="M 40 370 Q 70 366, 100 370 T 160 370 T 220 370 T 280 370 T 340 370 T 400 370"
          {...stroke}
          strokeWidth="1"
          opacity="0.6"
        />
      </g>
      <FlyBird x={120} y={110} s={1.1} dur={1.4} />
      <FlyBird x={310} y={90} s={0.9} delay={0.3} dur={1.6} />
      <FlyBird x={340} y={180} s={0.7} delay={0.6} />
      <FlyBird x={60} y={200} s={0.6} delay={0.9} dur={1.5} />
    </svg>
  </div>
);

// 18 · 딱따구리
const IWoodpecker: FC = () => (
  <div className="logo-stage">
    <svg viewBox="0 0 420 420">
      <Letter x={210} y={330} size={340}>ㅣ</Letter>
      <g transform="translate(195,210)">
        <g
          style={{
            animation: "logo-peck 0.7s ease-in-out infinite",
            transformOrigin: "right center",
            transformBox: "fill-box",
          }}
        >
          <ellipse cx="-8" cy="0" rx="10" ry="7" {...fill} />
          <circle cx="2" cy="-2" r="5" {...fill} />
          <path
            d="M 2 -7 l 3 -6 l 1 2 l 2 -4 l 1 4 l 2 -3 l -1 6 z"
            {...fill}
          />
          <circle cx="3" cy="-3" r="0.7" fill="#fff" />
          <path d="M 7 -1 l 12 -1 l -11 3 z" {...fill} />
          <path d="M -18 0 l -8 -3 l 0 6 z" {...fill} />
          <line x1="-4" y1="6" x2="-4" y2="12" {...stroke} strokeWidth="0.9" />
          <line x1="-10" y1="6" x2="-10" y2="12" {...stroke} strokeWidth="0.9" />
        </g>
      </g>
      {[0, 1, 2].map((i) => (
        <g
          key={i}
          style={
            {
              animation: `logo-fall 1.4s ease-in ${i * 0.4}s infinite`,
              "--fall-x": `${20 + i * 6}px`,
              "--fall-r": "180deg",
              transformOrigin: "center",
            } as CSSProperties
          }
        >
          <rect x="220" y="200" width="3" height="2" {...fill} />
        </g>
      ))}
      <g
        transform="translate(250,320)"
        style={{
          animation: "logo-wiggle 1.4s ease-in-out infinite",
          transformOrigin: "center",
        }}
      >
        <circle cx="0" cy="0" r="2.5" {...fill} />
        <circle cx="5" cy="0" r="2.5" {...fill} />
        <circle cx="10" cy="0" r="2.5" {...fill} />
        <circle cx="15" cy="0" r="2.5" {...fill} />
        <circle cx="20" cy="0" r="2.5" {...fill} />
        <line x1="21" y1="-2" x2="22" y2="-5" {...stroke} strokeWidth="0.8" />
        <line x1="19" y1="-2" x2="18" y2="-5" {...stroke} strokeWidth="0.8" />
      </g>
      <Grass x={140} y={330} s={0.9} />
      <Grass x={290} y={330} s={0.8} />
    </svg>
  </div>
);

// 19 · 대나무 숲
const IBamboo: FC = () => (
  <div className="logo-stage">
    <svg viewBox="0 0 420 420">
      <Letter x={210} y={330} size={340}>ㅣ</Letter>
      <line x1="185" y1="190" x2="235" y2="190" stroke="#fff" strokeWidth="2.5" />
      <line x1="185" y1="250" x2="235" y2="250" stroke="#fff" strokeWidth="2.5" />
      <line x1="185" y1="290" x2="235" y2="290" stroke="#fff" strokeWidth="2.5" />
      <g
        style={{
          animation: "logo-sway-s 4s ease-in-out infinite",
          transformOrigin: "210px 170px",
        }}
      >
        <path
          d="M 215 170 q 20 -10, 40 -30"
          {...stroke}
          strokeWidth="1.2"
        />
        <path
          d="M 215 170 q 20 -6, 36 -18"
          {...stroke}
          strokeWidth="1.2"
        />
        <ellipse
          cx="245"
          cy="145"
          rx="10"
          ry="2.5"
          {...fill}
          transform="rotate(-30 245 145)"
        />
        <ellipse
          cx="250"
          cy="156"
          rx="8"
          ry="2"
          {...fill}
          transform="rotate(-20 250 156)"
        />
      </g>
      <g
        style={{
          animation: "logo-sway-s 4.4s ease-in-out .5s infinite",
          transformOrigin: "210px 170px",
        }}
      >
        <path
          d="M 205 170 q -20 -10, -40 -30"
          {...stroke}
          strokeWidth="1.2"
        />
        <ellipse
          cx="175"
          cy="145"
          rx="10"
          ry="2.5"
          {...fill}
          transform="rotate(30 175 145)"
        />
        <ellipse
          cx="170"
          cy="156"
          rx="8"
          ry="2"
          {...fill}
          transform="rotate(20 170 156)"
        />
      </g>
      <g
        transform="translate(210,260)"
        style={{
          animation: "logo-bob 4s ease-in-out infinite",
          transformOrigin: "center",
        }}
      >
        <ellipse
          cx="0"
          cy="10"
          rx="22"
          ry="18"
          fill="#fff"
          stroke="#111"
          strokeWidth="1.4"
        />
        <ellipse cx="-18" cy="10" rx="7" ry="14" {...fill} />
        <ellipse cx="18" cy="10" rx="7" ry="14" {...fill} />
        <ellipse cx="-10" cy="26" rx="6" ry="8" {...fill} />
        <ellipse cx="10" cy="26" rx="6" ry="8" {...fill} />
        <circle
          cx="0"
          cy="-10"
          r="16"
          fill="#fff"
          stroke="#111"
          strokeWidth="1.4"
        />
        <circle cx="-12" cy="-22" r="5" {...fill} />
        <circle cx="12" cy="-22" r="5" {...fill} />
        <ellipse
          cx="-5"
          cy="-11"
          rx="3.5"
          ry="4"
          {...fill}
          transform="rotate(-20 -5 -11)"
        />
        <ellipse
          cx="5"
          cy="-11"
          rx="3.5"
          ry="4"
          {...fill}
          transform="rotate(20 5 -11)"
        />
        <circle cx="-5" cy="-11" r="1" fill="#fff" />
        <circle cx="5" cy="-11" r="1" fill="#fff" />
        <path d="M -2 -5 l 4 0 l -2 2 z" {...fill} />
        <path
          d="M 0 -2 q -2 2, -4 1 M 0 -2 q 2 2, 4 1"
          {...stroke}
          strokeWidth="1"
        />
      </g>
    </svg>
  </div>
);

// 20 · 낚시하는 고양이
const IFishing: FC = () => (
  <div className="logo-stage">
    <svg viewBox="0 0 420 420">
      <Letter x={210} y={330} size={340}>ㅣ</Letter>
      <g
        style={{
          animation: "logo-sway-s 4s ease-in-out infinite",
          transformOrigin: "center",
        }}
      >
        <path
          d="M 40 360 Q 100 354, 160 360 T 280 360 T 400 360"
          {...stroke}
          strokeWidth="1.4"
        />
        <path
          d="M 40 372 Q 100 368, 160 372 T 280 372 T 400 372"
          {...stroke}
          strokeWidth="1"
          opacity="0.6"
        />
      </g>
      <g transform="translate(210,138)">
        <g
          style={{
            animation: "logo-bob 4s ease-in-out infinite",
            transformOrigin: "center bottom",
          }}
        >
          <path d="M -14 0 C -14 -18, 14 -18, 14 0 Z" {...fill} />
          <circle cx="0" cy="-18" r="10" {...fill} />
          <path d="M -8 -25 l -3 -6 l 5 1 z" {...fill} />
          <path d="M 8 -25 l 3 -6 l -5 1 z" {...fill} />
          <circle cx="-3" cy="-19" r="1" fill="#fff" />
          <circle cx="3" cy="-19" r="1" fill="#fff" />
          <path d="M 12 -6 l 8 -4" {...stroke} strokeWidth="2.4" />
          <path
            d="M -14 -4 C -22 -6, -22 6, -14 4"
            {...stroke}
            strokeWidth="2.4"
            style={{
              animation: "logo-sway-s 2.8s ease-in-out infinite",
              transformOrigin: "-14px 0",
            }}
          />
        </g>
      </g>
      <line x1="220" y1="128" x2="300" y2="80" stroke="#111" strokeWidth="1.4" />
      <g
        style={{
          animation: "logo-sway-s 3s ease-in-out infinite",
          transformOrigin: "300px 80px",
        }}
      >
        <line x1="300" y1="80" x2="305" y2="348" stroke="#111" strokeWidth="0.7" />
        <circle cx="305" cy="350" r="2" {...fill} />
      </g>
      <g
        style={{
          animation: "logo-hop 2s ease-in-out infinite",
          transformOrigin: "center",
        }}
      >
        <g transform="translate(130,340)">
          <Fish x={0} y={0} s={1.2} />
          <path d="M -18 4 Q -14 2, -10 4" {...stroke} strokeWidth="0.8" />
          <path d="M 10 4 Q 14 2, 18 4" {...stroke} strokeWidth="0.8" />
        </g>
      </g>
      <g transform="translate(210,380) scale(0.4,-0.3)" opacity="0.2">
        <circle cx="0" cy="-18" r="10" {...fill} />
      </g>
    </svg>
  </div>
);

// ─── groups ─────────────────────────────────────────────
export type LogoItem = { name: string; Component: FC };

export const GROUP_S: LogoItem[] = [
  { name: "산속 모닥불", Component: SCampfire },
  { name: "개미 행렬", Component: SAnts },
  { name: "지붕 위 둥지", Component: STreehouse },
  { name: "언덕의 여우", Component: SFox },
  { name: "덩굴의 여정", Component: SVines },
  { name: "비 오는 날", Component: SRain },
];

export const GROUP_I: LogoItem[] = [
  { name: "전깃줄의 새", Component: IWire },
  { name: "홀로 선 나무", Component: ITree },
  { name: "등대와 갈매기", Component: ILighthouse },
  { name: "딱따구리", Component: IWoodpecker },
  { name: "대나무 숲", Component: IBamboo },
  { name: "낚시하는 고양이", Component: IFishing },
];

export const GROUP_SI: LogoItem[] = [
  { name: "새들의 쉼터", Component: SiBirds },
  { name: "지붕 위 정원", Component: SiGarden },
  { name: "물속의 시", Component: SiFish },
  { name: "고양이 낮잠", Component: SiCat },
  { name: "가지 뻗기", Component: SiTree },
  { name: "달과 여우", Component: SiMoon },
  { name: "달팽이의 산책", Component: SiSnail },
  { name: "나비의 하루", Component: SiButterfly },
];
