# Portfolio Feature

Core feature module providing portfolio data, theming, and version management.

## Structure

| Directory | Purpose |
|-----------|---------|
| `context/` | React Context provider and `usePortfolio` hook |
| `models/` | Domain model classes (Profile, Project, Skill, etc.) |
| `services/` | Business logic — PortfolioService facade, ThemeManager, VersionManager |
| `hooks/` | Standalone React hooks (useTheme) |
| `data/` | PortfolioRegistry and version-specific data (hengtai25, demo) |

## Usage

Wrap your app with `PortfolioProvider`, then consume data via `usePortfolio()`:

```tsx
import { PortfolioProvider, usePortfolio } from '@/features/portfolio/context/PortfolioContext'

function App() {
  return (
    <PortfolioProvider>
      <MyComponent />
    </PortfolioProvider>
  )
}

function MyComponent() {
  const { profile, projects, mode, toggleMode } = usePortfolio()
  // ...
}
```

## Adding a new version

1. Create `data/versions/<name>/` with `index.ts`, `profile.ts`, `skills.ts`, `projects.ts`, `contact.ts`
2. Register in `data/index.ts`: `PortfolioRegistry.register('<name>', portfolio)`
3. Add `'<name>'` to the `PortfolioVersion` union in `data/PortfolioRegistry.ts`
