import './Projects.css'
import { projects } from './projectsData'
import { getScreenshotUrl } from '../utils'

function ProjectCard({ project }) {
  const hasGithub = Boolean(project.githubUrl)
  const imageSrc = project.image ?? getScreenshotUrl(project.liveUrl)

  return (
    <article className="project-card">
      <div className="project-card__image">
        <img src={imageSrc} alt={`${project.title} preview`} loading="lazy" />
      </div>
      <div className="project-card__content">
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__description">{project.description}</p>
        <div className="project-card__tags">
          {project.tags.map((tag) => (
            <span key={tag} className="project-card__tag">
              {tag}
            </span>
          ))}
        </div>
        <div className="project-card__links">
          <a
            href={project.liveUrl}
            className="project-card__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            Live Demo
          </a>
          {hasGithub && (
            <a
              href={project.githubUrl}
              className="project-card__link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View source code for ${project.title} on GitHub`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
              Code
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

function Projects() {
  return (
    <section className="projects section" id="projects">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        <div className="projects__grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <div className="projects__cta">
          <a
            href="https://github.com/zarda?tab=repositories"
            className="btn btn-outline"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View all of my projects on GitHub"
          >
            View All Projects
          </a>
        </div>
      </div>
    </section>
  )
}

export default Projects
