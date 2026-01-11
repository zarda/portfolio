import { Profile } from '../../../models';
import profilePhoto from './assets/profile-photo.jpg';

export const profile = new Profile({
  name: 'Hengtai Jan',
  title: 'Software Engineer',
  greeting: "Hello, I'm",
  description:
    'I build exceptional web applications with Angular, React, and modern technologies. Focused on performance, accessibility, and clean architecture.',
  aboutParagraphs: [
    "Hi! I'm a Software Engineer with a PhD in Physics and 8+ years of professional development experience. I've worked at Google Nest, Academia Sinica, and various tech companies building impactful applications.",
    'I specialize in frontend development with Angular and React, with strong experience in TypeScript, testing, accessibility (A11y), and internationalization (I18n). I\'m passionate about creating performant, user-friendly applications.',
    'My background includes developing smart home tools for Google, astronomical visualization software, and industrial inspection systems. I bring a scientific approach to software engineering.',
  ],
  photoUrl: profilePhoto,
  stats: [
    { value: '8+', label: 'Years Experience' },
    { value: '750+', label: 'LeetCode Solved', link: 'https://leetcode.com/u/hengtai/' },
    { value: 'PhD', label: 'Physics, NSYSU' },
  ],
  heroPrimaryCta: { label: 'View My Work', href: '#projects' },
  heroSecondaryCta: { label: 'Get In Touch', href: '#contact' },
  resume: {
    summaryParagraphs: [
      'Download my full resume for a detailed view of my experience at Google Nest, Academia Sinica, and other roles, including work on smart home tools, astronomical visualization, and large-scale control systems.',
      'The PDF includes project highlights, tech stack details, and a concise overview of my academic background and publications.',
    ],
    pdfUrl: '/CV_20260111.pdf', // /public/CV_20260111.pdf
    docUrl:
      'https://docs.google.com/document/d/1Uv5L5WsZnbN6Yvo0dMRxeLxhBkDI-HlQw441QdN0Bgs/edit?usp=sharing',
    linkedinUrl: 'https://linkedin.com/in/hengtai-jan-188793b8/',
  },
});
