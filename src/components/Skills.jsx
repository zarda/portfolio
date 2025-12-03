import './Skills.css'
import { skills } from './skillsData'

function Skill({ name, level }) {
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

function SkillCategory({ category, items }) {
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
  return (
    <section className="skills section" id="skills">
      <div className="container">
        <h2 className="section-title">Skills & Technologies</h2>
        <div className="skills__grid">
          {skills.map((skillGroup) => (
            <SkillCategory
              key={skillGroup.category}
              category={skillGroup.category}
              items={skillGroup.items}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
