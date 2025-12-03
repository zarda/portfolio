import './About.css'
import profilePhoto from '../assets/profile-photo.jpg'

function About() {
  return (
    <section className="about section" id="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about__content">
          <div className="about__image">
            <div className="about__image-wrapper">
              <img
                src={profilePhoto}
                alt="Hengtai Jan"
                className="about__photo"
              />
            </div>
          </div>
          <div className="about__text">
            <p>
              Hi! I'm a Software Engineer with a PhD in Physics and 8+ years of professional
              development experience. I've worked at Google Nest, Academia Sinica, and various
              tech companies building impactful applications.
            </p>
            <p>
              I specialize in frontend development with Angular and React, with strong
              experience in TypeScript, testing, accessibility (A11y), and internationalization (I18n).
              I'm passionate about creating performant, user-friendly applications.
            </p>
            <p>
              My background includes developing smart home tools for Google, astronomical
              visualization software, and industrial inspection systems. I bring a scientific
              approach to software engineering.
            </p>
            <div className="about__stats">
              <div className="about__stat">
                <span className="about__stat-number">8+</span>
                <span className="about__stat-label">Years Experience</span>
              </div>
              <div className="about__stat">
                <a
                  href="https://leetcode.com/u/hengtai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about__stat-link"
                >
                  <span className="about__stat-number">716</span>
                  <span className="about__stat-label">LeetCode Solved</span>
                </a>
              </div>
              <div className="about__stat">
                <span className="about__stat-number">PhD</span>
                <span className="about__stat-label">Physics, NSYSU</span>
              </div>
            </div>
            <a href="#contact" className="btn btn-primary">
              Let's Talk
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
