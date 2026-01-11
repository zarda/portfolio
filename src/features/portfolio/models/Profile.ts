export interface ProfileStat {
  value: string;
  label: string;
  link?: string;
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
