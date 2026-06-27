export interface LiveStatSource {
  /** Data source to fetch a live value from. */
  source: 'leetcode';
  /** Username on that platform. */
  username: string;
}

export interface ProfileStat {
  /** Static value, also used as the fallback while a live value loads or if it fails. */
  value: string;
  label: string;
  link?: string;
  /** When set, the value is refreshed live in the browser from the given source. */
  live?: LiveStatSource;
}

export interface HeroCta {
  label: string;
  href: string;
}

export interface ResumeInfo {
  summaryParagraphs: string[];
  pdfUrl: string;
  docUrl: string;
  linkedinUrl: string;
}

export interface ProfileProps {
  name: string;
  title: string;
  greeting: string;
  description: string;
  aboutParagraphs: string[];
  photoUrl: string;
  stats: ProfileStat[];
  heroPrimaryCta: HeroCta;
  heroSecondaryCta: HeroCta;
  resume: ResumeInfo;
}

export class Profile {
  constructor(private readonly props: ProfileProps) {}

  get name(): string {
    return this.props.name;
  }

  get title(): string {
    return this.props.title;
  }

  get greeting(): string {
    return this.props.greeting;
  }

  get description(): string {
    return this.props.description;
  }

  get aboutParagraphs(): string[] {
    return [...this.props.aboutParagraphs];
  }

  get photoUrl(): string {
    return this.props.photoUrl;
  }

  get stats(): ProfileStat[] {
    return [...this.props.stats];
  }

  get heroPrimaryCta(): HeroCta {
    return this.props.heroPrimaryCta;
  }

  get heroSecondaryCta(): HeroCta {
    return this.props.heroSecondaryCta;
  }

  get resume(): ResumeInfo {
    return this.props.resume;
  }
}
