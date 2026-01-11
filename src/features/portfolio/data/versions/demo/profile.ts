import { Profile } from '../../../models';

/**
 * Demo Profile Data
 *
 * This is a demonstration profile with placeholder data.
 * Use this version to understand the portfolio structure
 * or for testing purposes.
 *
 * Access via URL: /?version=demo
 */
export const profile = new Profile({
  name: 'Demo User',
  title: 'Full Stack Developer',
  greeting: 'Welcome! This is a',
  description:
    'This is a demo portfolio showcasing the multi-version portfolio system. ' +
    'Each section demonstrates how data flows from the PortfolioService to components. ' +
    'Switch versions using the URL parameter: ?version=hengtai25',
  aboutParagraphs: [
    'This is the first paragraph of the About section. It typically contains a brief introduction about the person, their background, and career highlights.',
    'The second paragraph usually covers technical expertise, specializations, and the types of projects or industries the person has worked in.',
    'The third paragraph often includes personal interests, work philosophy, or what drives the person professionally. Each paragraph is stored as an array element in the Profile model.',
  ],
  photoUrl: 'https://via.placeholder.com/400x400?text=Demo+Photo',
  stats: [
    { value: '5+', label: 'Years Experience' },
    { value: '50+', label: 'Projects Completed', link: 'https://example.com/projects' },
    { value: 'MSc', label: 'Computer Science' },
  ],
  heroPrimaryCta: { label: 'Explore Projects', href: '#projects' },
  heroSecondaryCta: { label: 'Contact Me', href: '#contact' },
  resume: {
    summaryParagraphs: [
      'This is a demo resume section. In a real portfolio, this would contain a summary of your professional experience and qualifications.',
      'The resume section provides quick access to downloadable resume files and links to your professional profiles.',
    ],
    pdfUrl: '/demo-resume.pdf', // /public/demo-resume.pdf
    docUrl: 'https://example.com/resume-doc',
    linkedinUrl: 'https://linkedin.com/in/demo-user',
  },
});
