import { motion } from 'framer-motion'
import { MdOpenInNew } from 'react-icons/md'
import { SiGithub } from 'react-icons/si'
import { usePortfolio } from '@/features/portfolio/context/PortfolioContext'
import { AnimationPresets } from '@/shared/animations/presets'
import type { Project as ProjectModel } from '@/features/portfolio/models'
import { getScreenshotUrl } from '@/utils'

interface ProjectCardProps {
  project: ProjectModel
}

function ProjectCard({ project }: ProjectCardProps) {
  const imageSrc = project.imageUrl ?? getScreenshotUrl(project.liveUrl)

  return (
    <article className="project-card hover-lift rounded-lg">
      <div className="project-card__image">
        <img src={imageSrc} alt={`${project.title} preview`} loading="lazy" />
      </div>
      <div className="project-card__content">
        <h3 className="project-card__title fw-semibold text-xl mb-md">{project.title}</h3>
        <p className="project-card__description text-light text-sm mb-md">{project.description}</p>
        <div className="project-card__tags flex flex-wrap gap-sm mb-lg">
          {project.tags.map((tag) => (
            <span key={tag} className="project-card__tag badge rounded-full text-sm fw-medium">
              {tag}
            </span>
          ))}
        </div>
        <div className="project-card__links flex gap-md">
          <a
            href={project.liveUrl}
            className="project-card__link flex items-center gap-xs text-muted fw-medium text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MdOpenInNew size={20} aria-hidden="true" />
            Live Demo
          </a>
          {project.hasGithub && (
            <a
              href={project.githubUrl}
              className="project-card__link flex items-center gap-xs text-muted fw-medium text-sm"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View source code for ${project.title} on GitHub`}
            >
              <SiGithub size={20} aria-hidden="true" />
              Code
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

function Projects() {
  const { projects, contactInfo } = usePortfolio()
  const githubLink = contactInfo.socialLinks.find((link) => link.platform === 'github')

  return (
    <section className="projects section" id="projects">
      <div className="container">
        <motion.h2 className="section-title" {...AnimationPresets.fadeInUp()}>Featured Projects</motion.h2>
        <div className="projects__grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        {githubLink && (
          <div className="projects__cta text-center mt-2xl">
            <a
              href={`${githubLink.url}?tab=repositories`}
              className="btn btn-outline"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View all of my projects on GitHub"
            >
              View All Projects
            </a>
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects
