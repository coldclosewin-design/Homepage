export interface SkillCategory {
  category: string;
  description: string;
  items: string[];
}

export const skills: SkillCategory[] = [
  {
    category: "끄적임",
    description: "시 / 생각 / 망상 / 스케치",
    items: ["시", "생각", "망상", "스케치"],
  },
  {
    category: "개발새발",
    description: "C, Matlab · Simulink (Embedded SW)",
    items: ["C", "Matlab", "Simulink"],
  },
  {
    category: "빠른두발",
    description: "머리 안 쓰고 몸 고생 스타일, 부딪쳐보기",
    items: ["부딪쳐보기"],
  },
  {
    category: "낙관주의",
    description: "합리화 귀재",
    items: ["합리화"],
  },
];
