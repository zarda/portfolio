import { Portfolio } from '../models';

export type PortfolioVersion = 'hengtai25' | 'demo';

export class PortfolioRegistry {
  private static portfolios: Map<PortfolioVersion, Portfolio> = new Map();
  private static defaultVersion: PortfolioVersion = 'hengtai25';

  static register(version: PortfolioVersion, portfolio: Portfolio): void {
    this.portfolios.set(version, portfolio);
  }

  static get(version?: PortfolioVersion): Portfolio {
    const v = version ?? this.defaultVersion;
    const portfolio = this.portfolios.get(v);
    if (!portfolio) {
      throw new Error(`Portfolio version "${v}" not found`);
    }
    return portfolio;
  }

  static setDefault(version: PortfolioVersion): void {
    if (!this.portfolios.has(version)) {
      throw new Error(`Cannot set default: version "${version}" not registered`);
    }
    this.defaultVersion = version;
  }

  static getAvailableVersions(): PortfolioVersion[] {
    return Array.from(this.portfolios.keys());
  }

  static getVersionFromUrl(): PortfolioVersion | null {
    if (typeof window === 'undefined') return null;
    const params = new URLSearchParams(window.location.search);
    const raw = params.get('version');
    if (!raw) return null;
    const available = PortfolioRegistry.getAvailableVersions();
    return (available as string[]).includes(raw) ? (raw as PortfolioVersion) : null;
  }

  static getDefaultVersion(): PortfolioVersion {
    return this.defaultVersion;
  }
}
