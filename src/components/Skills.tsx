import { motion } from 'framer-motion'
import './Skills.css'
import { skills } from './skillsData'

import { SkillItem as SkillItemType } from './skillsData'

interface SkillProps {
  name: string
  level: number
}

function Skill({ name, level }: SkillProps) {
  return (
    <div className="skill">
      <div className="skill__header">
        <span className="skill__name">{name}</span>
        <span className="skill__percentage">{level}%</span>
      </div>
      <div className="skill__bar">
        <div className="skill__progress" style={{ width: `${level}%` }}></div>
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
    <div className="skills__category">
      <h3 className="skills__category-title">{category}</h3>
      <div className="skills__list">
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
          className="skills__grid"
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
