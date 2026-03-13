import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  ReactNode,
} from 'react';
import { PortfolioService } from '../services/PortfolioService';
import type { PortfolioServiceConfig } from '../services/PortfolioService';
import type { ThemeState, Season, ThemeMode } from '../services/ThemeManager';
import type { PortfolioVersion } from '../data/PortfolioRegistry';
import type { Profile, SkillCategory, Project, ContactInfo } from '../models';

// ── Context value shape ───────────────────────────────────────────────────────

export interface PortfolioContextValue {
  // Version
  currentVersion: PortfolioVersion;
  availableVersions: PortfolioVersion[];
  switchVersion: (v: PortfolioVersion) => void;
  // Data
  profile: Profile;
  skillCategories: SkillCategory[];
  projects: Project[];
  contactInfo: ContactInfo;
  // Theme
  theme: ThemeState;
  season: Season;
  mode: ThemeMode;
  toggleMode: () => void;
  setMode: (mode: ThemeMode) => void;
  setSeason: (season: Season) => void;
}

// ── Context ───────────────────────────────────────────────────────────────────

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

// ── Provider ──────────────────────────────────────────────────────────────────

export interface PortfolioProviderProps {
  children: ReactNode;
  /** Optional config for test injection (e.g. mock themeManager / versionManager) */
  config?: PortfolioServiceConfig;
}

export function PortfolioProvider({ children, config = {} }: PortfolioProviderProps) {
  // Guard: initialize exactly once even under React 19 StrictMode double-invoke.
  // Runs in render phase (not useEffect) so data is ready on the first render.
  const initialized = useRef(false);
  if (!initialized.current) {
    if (!PortfolioService.isInitialized()) {
      PortfolioService.initialize(config);
    }
    initialized.current = true;
  }

  const service = PortfolioService.getInstance();

  const [currentVersion, setCurrentVersion] = useState<PortfolioVersion>(
    () => service.getCurrentVersion()
  );
  const [profile, setProfile] = useState(() => service.getProfile());
  const [skillCategories, setSkillCategories] = useState(() => service.getSkillCategories());
  const [projects, setProjects] = useState(() => service.getProjects());
  const [contactInfo, setContactInfo] = useState(() => service.getContactInfo());
  const [theme, setTheme] = useState<ThemeState>(() => service.getTheme());

  // Subscribe to theme changes from ThemeManager
  useEffect(() => {
    const unsubscribe = service.subscribeToThemeChanges(setTheme);
    return unsubscribe;
  }, [service]);

  const switchVersion = useCallback(
    (v: PortfolioVersion) => {
      service.switchVersion(v);
      setCurrentVersion(service.getCurrentVersion());
      setProfile(service.getProfile());
      setSkillCategories(service.getSkillCategories());
      setProjects(service.getProjects());
      setContactInfo(service.getContactInfo());
    },
    [service]
  );

  const toggleMode = useCallback(() => service.toggleMode(), [service]);
  const setMode = useCallback((m: ThemeMode) => service.setMode(m), [service]);
  const setSeason = useCallback((s: Season) => service.setSeason(s), [service]);

  const value: PortfolioContextValue = {
    currentVersion,
    availableVersions: service.getAvailableVersions(),
    switchVersion,
    profile,
    skillCategories,
    projects,
    contactInfo,
    theme,
    season: theme.season,
    mode: theme.mode,
    toggleMode,
    setMode,
    setSeason,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function usePortfolio(): PortfolioContextValue {
  const ctx = useContext(PortfolioContext);
  if (!ctx) {
    throw new Error('usePortfolio must be used inside <PortfolioProvider>');
  }
  return ctx;
}
