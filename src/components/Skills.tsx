import { motion } from 'framer-motion'
import {
  SiAngular,
  SiReact,
  SiTypescript,
  SiHtml5,
  SiMui,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiCplusplus,
  SiGooglecloud,
  SiGithubactions,
  SiGit,
  SiPytorch,
  SiOpencv,
} from 'react-icons/si'
import { TbApi, TbPlugConnected, TbWorld, TbCloud, TbLambda, TbTestPipe, TbCode } from 'react-icons/tb'
import type { IconType } from 'react-icons'
import { usePortfolio } from '@/features/portfolio/context/PortfolioContext'
import { AnimationPresets } from '@/shared/animations/presets'
import { Skill as SkillModel, SkillCategory as SkillCategoryModel } from '@/features/portfolio/models'

const skillIcons: Record<string, IconType> = {
  Angular: SiAngular,
  React: SiReact,
  TypeScript: SiTypescript,
  'HTML/CSS': SiHtml5,
  'Material UI': SiMui,
  'Next.js': SiNextdotjs,
  'Node.js': SiNodedotjs,
  Python: SiPython,
  'C++': SiCplusplus,
  'RESTful APIs': TbApi,
  gRPC: TbPlugConnected,
  WebSocket: TbPlugConnected,
  GCP: SiGooglecloud,
  AWS: TbCloud,
  Serverless: TbLambda,
  'E2E Testing': TbTestPipe,
  'CI/CD': SiGithubactions,
  Git: SiGit,
  'I18n/A11y': TbWorld,
  MCP: TbPlugConnected,
  Cursor: TbCode,
  'OpenCV (cv2)': SiOpencv,
  PyTorch: SiPytorch,
}

interface SkillProps {
  name: string
  level: number
}

function SkillItem({ name, level }: SkillProps) {
  const Icon = skillIcons[name]
  return (
    <div className="skill">
      <div className="skill__header flex items-center justify-between mb-2">
        <span className="skill__name font-medium">
          {Icon && <Icon className="skill__icon" aria-hidden />}
          {name}
        </span>
        <span className="skill__percentage text-sm text-text-light font-medium">{level}%</span>
      </div>
      <div className="skill__bar rounded-full">
        <div className="skill__progress rounded-full" style={{ width: `${level}%` }}></div>
      </div>
    </div>
  )
}

interface SkillCategoryProps {
  category: SkillCategoryModel
}

function SkillCategoryCard({ category }: SkillCategoryProps) {
  return (
    <div className="skills__category rounded-lg">
      <h3 className="skills__category-title text-gradient font-semibold text-xl mb-6">
        {category.category}
      </h3>
      <div className="skills__list flex flex-col gap-4">
        {category.skills.map((skill: SkillModel) => (
          <SkillItem key={skill.name} name={skill.name} level={skill.level} />
        ))}
      </div>
    </div>
  )
}

function Skills() {
  const { skillCategories } = usePortfolio()

  return (
    <section className="skills section" id="skills">
      <div className="container">
        <motion.h2 className="section-title" {...AnimationPresets.fadeInUp()}>Skills & Technologies</motion.h2>
        <motion.div
          className="skills__grid grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-sm:grid-cols-1"
          {...AnimationPresets.fadeInUp(0.2)}
        >
          {skillCategories.map((category) => (
            <SkillCategoryCard
              key={category.category}
              category={category}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
