import './Skills.css'

const skills = [
  {
    category: 'Frontend',
    items: [
      { name: 'Angular', level: 95 },
      { name: 'React', level: 80 },
      { name: 'TypeScript', level: 95 },
      { name: 'HTML/CSS', level: 85 },
      { name: 'Material UI', level: 90 },
    ],
  },
  {
    category: 'Backend & Infrastructure',
    items: [
      { name: 'Node.js', level: 75 },
      { name: 'Python', level: 95 },
      { name: 'C++', level: 90 },
      { name: 'RESTful APIs', level: 80 },
      { name: 'gRPC', level: 80 },
      { name: 'WebSocket', level: 75 },
      { name: 'GCP', level: 80 },
    ],
  },
  {
    category: 'Testing & Tools',
    items: [
      { name: 'E2E Testing', level: 90 },
      { name: 'CI/CD', level: 80 },
      { name: 'Git', level: 90 },
      { name: 'I18n/A11y', level: 90 },
    ],
  },
]

function Skills() {
  return (
    <section className="skills section" id="skills">
      <div className="container">
        <h2 className="section-title">Skills & Technologies</h2>
        <div className="skills__grid">
          {skills.map((skillGroup) => (
            <div key={skillGroup.category} className="skills__category">
              <h3 className="skills__category-title">{skillGroup.category}</h3>
              <div className="skills__list">
                {skillGroup.items.map((skill) => (
                  <div key={skill.name} className="skill">
                    <div className="skill__header">
                      <span className="skill__name">{skill.name}</span>
                      <span className="skill__percentage">{skill.level}%</span>
                    </div>
                    <div className="skill__bar">
                      <div
                        className="skill__progress"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
