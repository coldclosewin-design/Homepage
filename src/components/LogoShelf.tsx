"use client";

import { GROUP_S, GROUP_I, GROUP_SI, useLogoCss } from "./Logos";
import LogoCarousel from "./LogoCarousel";

export default function LogoShelf() {
  useLogoCss();
  return (
    <div className="space-y-16">
      <LogoCarousel title="ㅅ" items={GROUP_S} />
      <LogoCarousel title="ㅣ" items={GROUP_I} />
      <LogoCarousel title="시" items={GROUP_SI} />
    </div>
  );
}
