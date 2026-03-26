export interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
}

export const projects: Project[] = [
  {
    title: "Portfolio Homepage",
    description: "지금 보고 계신 이 홈페이지입니다.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    github: "https://github.com",
  },
];
