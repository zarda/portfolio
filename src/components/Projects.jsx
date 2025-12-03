import './Projects.css'
import todoPreview from '../preview/TodoSharerPreview.png'
import cartaPreview from '../preview/CartaVisHomePreview.png'

// Generate live screenshot URL from a website
const getScreenshotUrl = (url) => {
  // Using image.thum.io - free screenshot service
  return `https://image.thum.io/get/width/600/crop/400/${url}`
}

const projects = [
  {
    id: 1,
    title: 'ToDo List - Angular SSR',
    description:
      'A modern task management application built with Angular Server-Side Rendering. Features responsive design, persistent storage, and optimized performance deployed on Google Cloud Run.',
    tags: ['Angular', 'SSR', 'TypeScript', 'Cloud Run'],
    image: todoPreview,
    liveUrl: 'https://todo-list-478384585653.asia-east1.run.app/',
    githubUrl: 'https://github.com/zarda/ToDo-List-on-Angular-SSR',
  },
  {
    id: 2,
    title: 'Google Home Playground',
    description:
      'Web application to enhance developer experience for smart home connectivity. Owned 85% of project deliverables, increased test coverage from 55% to 93%+, and reduced initial load time by 20%.',
    tags: ['Angular', 'TypeScript', 'GCP', 'Material UI'],
    image: null,
    liveUrl: 'https://developers.google.com/assistant/smarthome/tools/home-playground',
  },
  {
    id: 3,
    title: 'Matter Device Simulator',
    description:
      'Built a Matter device simulator enabling 3rd-party engineers to test integrations with their services. Owned 75% of task deliverables for this developer tool.',
    tags: ['Angular', 'TypeScript', 'Node.js', 'Electron'],
    image: null,
    liveUrl: 'https://developers.home.google.com/codelabs/matter-device-virtual#2',
  },
  {
    id: 4,
    title: 'CARTA - Astronomical Visualization',
    description:
      'Full-stack web application for astronomical scientists to view and analyze high-resolution imagery. Optimized rendering with WebGL and C++ bindings, achieved 90% API test coverage.',
    tags: ['React', 'TypeScript', 'WebGL', 'C++', 'WebSocket'],
    image: cartaPreview,
    liveUrl: 'https://cartavis.org/',
    githubUrl: 'https://github.com/CARTAvis',
  },
  {
    id: 5,
    title: 'Beamline Control System',
    description:
      'Developed and maintained control systems for distributed devices at Taiwan\'s synchrotron radiation research facility. Led data center project providing services to all facility users.',
    tags: ['C++', 'Python', 'JavaScript', 'MySQL'],
    image: null,
    liveUrl: 'https://www.nsrrc.org.tw/english/index.aspx',
  },
]

function Projects() {
  return (
    <section className="projects section" id="projects">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        <div className="projects__grid">
          {projects.map((project) => (
            <article key={project.id} className="project-card">
              <div className="project-card__image">
                <img
                  src={getScreenshotUrl(project.liveUrl) || project.image}
                  alt={`${project.title} preview`}
                  loading="lazy"
                />
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
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Live Demo
                  </a>
                  <a
                    href={project.githubUrl}
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
                    >
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                    Code
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="projects__cta">
          <a href="#" className="btn btn-outline">
            View All Projects
          </a>
        </div>
      </div>
    </section>
  )
}

export default Projects
