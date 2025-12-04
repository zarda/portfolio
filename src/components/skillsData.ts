export interface SkillItem {
  name: string
  level: number
}

export interface SkillCategory {
  category: string
  items: SkillItem[]
}

export const skills: SkillCategory[] = [
  {
    category: 'Frontend',
    items: [
      { name: 'Angular', level: 90 },
      { name: 'React', level: 80 },
      { name: 'TypeScript', level: 90 },
      { name: 'HTML/CSS', level: 80 },
      { name: 'Material UI', level: 75 },
    ],
  },
  {
    category: 'Backend & Infrastructure',
    items: [
      { name: 'Node.js', level: 70 },
      { name: 'Python', level: 95 },
      { name: 'C++', level: 90 },
      { name: 'RESTful APIs', level: 75 },
      { name: 'gRPC', level: 70 },
      { name: 'WebSocket', level: 70 },
      { name: 'GCP', level: 70 },
    ],
  },
  {
    category: 'Testing & Tools',
    items: [
      { name: 'E2E Testing', level: 80 },
      { name: 'CI/CD', level: 70 },
      { name: 'Git', level: 80 },
      { name: 'I18n/A11y', level: 85 },
    ],
  },
]


