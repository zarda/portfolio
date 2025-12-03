import todoPreview from '../preview/TodoSharerPreview.png'
import cartaPreview from '../preview/CartaVisHomePreview.png'

export const projects = [
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
    liveUrl:
      'https://developers.google.com/assistant/smarthome/tools/home-playground',
  },
  {
    id: 3,
    title: 'Matter Device Simulator',
    description:
      'Built a Matter device simulator enabling 3rd-party engineers to test integrations with their services. Owned 75% of task deliverables for this developer tool.',
    tags: ['Angular', 'TypeScript', 'Node.js', 'Electron'],
    image: null,
    liveUrl:
      'https://developers.home.google.com/codelabs/matter-device-virtual#2',
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
]


