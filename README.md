# Portfolio

A responsive personal portfolio website built with React, Vite, and deployed to Firebase Hosting with CI/CD.

## Features

- Responsive design that works on all devices
- Smooth scrolling navigation
- Hero section with call-to-action
- About section with stats
- Skills section with progress bars
- Projects showcase with cards
- Resume section with downloadable PDF and external profile links
- Contact form
- Mobile-friendly hamburger menu

## Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: CSS3 with CSS Variables
- **Hosting**: Firebase Hosting
- **CI/CD**: GitHub Actions

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Firebase CLI installed (`npm install -g firebase-tools`)
- A Firebase project created

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/zarda/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Customization

### Adding Images

Replace the placeholder elements with your actual images:

1. Add your images to the `public` folder
2. Update the component files to use `<img>` tags instead of placeholder divs

### Styling

Customize the look by editing CSS variables in `src/index.css`:

```css
:root {
  --color-primary: #3b82f6;      /* Main accent color */
  --color-primary-dark: #2563eb; /* Darker accent */
  --color-text: #1e293b;         /* Main text color */
  /* ... more variables */
}
```

## Firebase Hosting Setup

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable Firebase Hosting in the console

### 2. Configure Firebase

Update `.firebaserc` with your project ID:

```json
{
  "projects": {
    "default": "your-actual-project-id"
  }
}
```

### 3. Set Up GitHub Secrets

For CI/CD to work, add these secrets to your GitHub repository:

1. Go to your repo → Settings → Secrets and variables → Actions
2. Add the following secrets:

| Secret Name | Description |
|-------------|-------------|
| `FIREBASE_SERVICE_ACCOUNT` | Firebase service account JSON key |
| `FIREBASE_PROJECT_ID` | Your Firebase project ID |

#### Getting the Service Account Key

1. Go to Firebase Console → Project Settings → Service Accounts
2. Click "Generate new private key"
3. Copy the entire JSON content as the `FIREBASE_SERVICE_ACCOUNT` secret

### 4. Manual Deployment

To deploy manually without CI/CD:

```bash
npm run build
firebase login
firebase deploy
```

## CI/CD Pipeline

The project includes two GitHub Actions workflows:

### On Push to Main
- Runs linting
- Builds the project
- Deploys to Firebase Hosting (production)

### On Pull Request
- Runs linting
- Builds the project
- Deploys to a preview channel
- Comments the preview URL on the PR

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run test` | Run unit tests once with Vitest |
| `npm run test:watch` | Run unit tests in watch mode |
| `npm run test:coverage` | Run unit tests with coverage and generate a report in `coverage/` |

## Project Structure

```
portfolio/
├── .github/
│   └── workflows/
│       ├── firebase-hosting-merge.yml
│       └── firebase-hosting-pull-request.yml
├── public/
│   ├── favicon.svg
│   ├── CV_YYYYMMDD.pdf
├── src/
│   ├── components/
│   │   ├── About.jsx / About.css
│   │   ├── Contact.jsx / Contact.css
│   │   ├── Footer.jsx / Footer.css
│   │   ├── Header.jsx / Header.css
│   │   ├── Hero.jsx / Hero.css
│   │   ├── Projects.jsx / Projects.css
│   │   ├── Resume.jsx / Resume.css
│   │   ├── projectsData.js
│   │   ├── skillsData.js
│   │   └── Skills.jsx / Skills.css
│   ├── assets/
│   │   └── profile-photo.jpg
│   ├── preview/
│   │   ├── CartaVisHomePreview.png
│   │   └── TodoSharerPreview.png
│   ├── App.jsx
│   ├── utils.js
│   ├── index.css
│   └── main.jsx
├── .firebaserc
├── .gitignore
├── eslint.config.js
├── firebase.json
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

## License

This project is licensed under the GPL-3.0 License - see the [LICENSE](LICENSE) file for details
