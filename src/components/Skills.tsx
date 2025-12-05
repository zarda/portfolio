import { motion } from 'framer-motion'

import { skills } from './skillsData'

import { SkillItem as SkillItemType } from './skillsData'

interface SkillProps {
  name: string
  level: number
}

function Skill({ name, level }: SkillProps) {
  return (
    <div className="skill">
      <div className="skill__header flex-between">
        <span className="skill__name fw-medium">{name}</span>
        <span className="skill__percentage text-sm text-muted fw-medium">{level}%</span>
      </div>
      <div className="skill__bar rounded-full">
        <div className="skill__progress rounded-full" style={{ width: `${level}%` }}></div>
      </div>
    </div>
  )
}

interface SkillCategoryProps {
  category: string
  items: SkillItemType[]
}

function SkillCategory({ category, items }: SkillCategoryProps) {
  return (
    <div className="skills__category hover-lift card rounded-lg">
      <h3 className="skills__category-title text-gradient fw-semibold">{category}</h3>
      <div className="skills__list flex-col gap-md">
        {items.map((skill) => (
          <Skill key={skill.name} name={skill.name} level={skill.level} />
        ))}
      </div>
    </div>
  )
}

function Skills() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6 }
  }

  return (
    <section className="skills section" id="skills">
      <div className="container">
        <motion.h2 className="section-title" {...fadeInUp}>Skills & Technologies</motion.h2>
        <motion.div
          className="skills__grid grid-3 gap-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {skills.map((skillGroup) => (
            <SkillCategory
              key={skillGroup.category}
              category={skillGroup.category}
              items={skillGroup.items}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
