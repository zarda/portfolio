# Portfolio

A responsive personal portfolio website built with React, Vite, and deployed to Firebase Hosting with CI/CD.

## Features

- Responsive design that works on all devices
- Smooth scrolling navigation
- Hero section with call-to-action
- About section with stats
- Skills section with progress bars and technology icons
- Projects showcase with cards
- Resume section with downloadable PDF and external profile links
- Contact form
- Mobile-friendly hamburger menu
- **Multi-version portfolio support** (switch via URL parameter)

## Tech Stack

- **Frontend**: React 19, Vite, TypeScript
- **Icons**: react-icons (Simple Icons, Tabler)
- **Architecture**: Feature-Based + Clean Architecture with OOP models
- **Styling**: CSS3 with CSS Variables
- **Animations**: Framer Motion
- **Hosting**: Firebase Hosting
- **CI/CD**: GitHub Actions
- **Testing**: Vitest + React Testing Library

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

## Portfolio Versions

The portfolio supports multiple data versions, allowing you to maintain different portfolio presentations.

### Available Versions

| Version | Description | URL |
|---------|-------------|-----|
| `hengtai25` | Production portfolio (default) | `http://localhost:5173/` |
| `demo` | Demo version with explanatory test data | `http://localhost:5173/?version=demo` |

### Switching Versions

Access different versions via URL parameter:
```
http://localhost:5173/?version=demo
http://localhost:5173/?version=hengtai25
```

### Creating a New Version

1. Create a new folder under `src/features/portfolio/data/versions/`:
   ```
   src/features/portfolio/data/versions/your-version/
   ├── assets/       # Version-specific images (project previews, etc.)
   ├── index.ts      # Portfolio assembly
   ├── profile.ts    # Personal info
   ├── skills.ts     # Skills data
   ├── projects.ts   # Projects data
   └── contact.ts    # Contact info
   ```

2. Register the version in `src/features/portfolio/data/index.ts`:
   ```typescript
   import { yourPortfolio } from './versions/your-version';
   PortfolioRegistry.register('your-version', yourPortfolio);
   ```

3. Access via `?version=your-version`

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
│   └── CV_YYYYMMDD.pdf
├── src/
│   ├── core/
│   │   └── models/
│   │       └── Entity.ts              # Base entity class
│   ├── features/
│   │   └── portfolio/
│   │       ├── context/
│   │       │   └── PortfolioContext.tsx # React Context + Provider + usePortfolio hook
│   │       ├── models/                # Domain models (OOP)
│   │       │   ├── Profile.ts
│   │       │   ├── Skill.ts
│   │       │   ├── SkillCategory.ts
│   │       │   ├── Project.ts
│   │       │   ├── SocialLink.ts
│   │       │   ├── ContactInfo.ts
│   │       │   ├── Portfolio.ts
│   │       │   └── index.ts
│   │       ├── services/
│   │       │   ├── PortfolioService.ts  # Facade service (singleton)
│   │       │   ├── ThemeManager.ts      # Theme/season management
│   │       │   └── VersionManager.ts    # Version/data management
│   │       ├── hooks/
│   │       │   └── useTheme.ts          # React hook for theme
│   │       ├── data/
│   │       │   ├── PortfolioRegistry.ts # Version management
│   │       │   ├── index.ts
│   │       │   └── versions/
│   │       │       ├── hengtai25/       # Production data
│   │       │       │   ├── assets/      # Project preview images
│   │       │       │   └── *.ts         # Data files
│   │       │       └── demo/            # Demo/test data
│   │       └── __tests__/
│   │           ├── PortfolioContext.test.tsx
│   │           ├── PortfolioService.test.ts
│   │           └── testUtils.tsx
│   ├── shared/
│   │   ├── animations/
│   │   │   └── presets.ts             # Framer Motion presets
│   │   └── constants/
│   │       └── navLinks.ts            # Navigation link definitions
│   ├── components/
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Projects.tsx
│   │   ├── Resume.tsx
│   │   └── Skills.tsx        # Skills + icon mapping (react-icons)
│   ├── App.tsx
│   ├── utils.ts
│   ├── index.css
│   └── main.tsx
├── .firebaserc
├── .gitignore
├── eslint.config.js
├── firebase.json
├── index.html
├── package.json
├── tsconfig.json
├── README.md
└── vite.config.js
```

## Architecture

This project uses a **Feature-Based + Clean Architecture** pattern:

- **Core**: Shared infrastructure (base classes, types)
- **Features**: Bounded contexts (portfolio, auth, admin)
- **Shared**: Reusable utilities and animations
- **Components**: UI components that consume data from services

### Data Flow

```
PortfolioRegistry (registers versions)
       ↓
PortfolioService (facade singleton)
├── VersionManager (data access)
└── ThemeManager (theme/season state)
       ↓
PortfolioContext / usePortfolio hook
       ↓
Components (Hero, About, Skills, Projects, Contact)
```

## License

This project is licensed under the GPL-3.0 License - see the [LICENSE](LICENSE) file for details
