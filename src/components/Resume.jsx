import './Resume.css'

const RESUME_URL = '/Hengtai-Jan-Resume.pdf'
const RESUME_DOC_URL =
  'https://docs.google.com/document/d/1Uv5L5WsZnbN6Yvo0dMRxeLxhBkDI-HlQw441QdN0Bgs/edit?usp=sharing'
const LINKEDIN_URL = 'https://linkedin.com/in/hengtai-jan-188793b8/'

function ResumeActions() {
  return (
    <div className="resume__actions">
      <a href={RESUME_URL} className="btn btn-primary" download>
        Download Resume (PDF)
      </a>
      <a href={LINKEDIN_URL} className="btn btn-outline" target="_blank" rel="noopener noreferrer">
        View LinkedIn Profile
      </a>
      <a
        href={RESUME_DOC_URL}
        className="btn btn-outline"
        target="_blank"
        rel="noopener noreferrer"
      >
        View Live Google Docs Version
      </a>
    </div>
  )
}

function Resume() {

  return (
    <section className="resume section" id="resume">
      <div className="container">
        <h2 className="section-title">Resume</h2>
        <div className="resume__content">
          <div className="resume__summary">
            <p>
              Download my full resume for a detailed view of my experience at Google Nest, Academia
              Sinica, and other roles, including work on smart home tools, astronomical
              visualization, and large-scale control systems.
            </p>
            <p>
              The PDF includes project highlights, tech stack details, and a concise overview of my
              academic background and publications.
            </p>
          </div>
          <ResumeActions />
        </div>
      </div>
    </section>
  )
}

export default Resume


