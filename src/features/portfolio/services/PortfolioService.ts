import { PortfolioRegistry, PortfolioVersion } from '../data/PortfolioRegistry';
import { Profile, SkillCategory, Project, ContactInfo, Portfolio } from '../models';

export class PortfolioService {
  private static instance: PortfolioService | null = null;
  private currentVersion: PortfolioVersion;

  private constructor(version: PortfolioVersion) {
    this.currentVersion = version;
  }

  static initialize(version?: PortfolioVersion): void {
    const v = version ?? PortfolioRegistry.getVersionFromUrl() ?? PortfolioRegistry.getDefaultVersion();
    PortfolioService.instance = new PortfolioService(v);
  }

  static getInstance(): PortfolioService {
    if (!PortfolioService.instance) {
      throw new Error('PortfolioService not initialized. Call PortfolioService.initialize() first.');
    }
    return PortfolioService.instance;
  }

  static isInitialized(): boolean {
    return PortfolioService.instance !== null;
  }

  switchVersion(version: PortfolioVersion): void {
    this.currentVersion = version;
  }

  getCurrentVersion(): PortfolioVersion {
    return this.currentVersion;
  }

  getAvailableVersions(): PortfolioVersion[] {
    return PortfolioRegistry.getAvailableVersions();
  }

  private get portfolio(): Portfolio {
    return PortfolioRegistry.get(this.currentVersion);
  }

  getProfile(): Profile {
    return this.portfolio.profile;
  }

  getSkillCategories(): SkillCategory[] {
    return this.portfolio.skillCategories;
  }

  getProjects(): Project[] {
    return this.portfolio.projects;
  }

  getContactInfo(): ContactInfo {
    return this.portfolio.contactInfo;
  }

  getPortfolio(): Portfolio {
    return this.portfolio;
  }
}
