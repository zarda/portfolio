import { describe, it, expect } from 'vitest';
import { Skill } from '../Skill';
import { Portfolio } from '../Portfolio';
import { Profile } from '../Profile';
import { SkillCategory } from '../SkillCategory';
import { Project } from '../Project';
import { ContactInfo } from '../ContactInfo';
import { SocialLink } from '../SocialLink';

describe('Skill', () => {
  it('throws when level is below 0', () => {
    expect(() => new Skill({ name: 'TS', level: -1 })).toThrow(
      'Skill level must be between 0 and 100'
    );
  });

  it('throws when level is above 100', () => {
    expect(() => new Skill({ name: 'TS', level: 101 })).toThrow(
      'Skill level must be between 0 and 100'
    );
  });
});

describe('Portfolio', () => {
  const now = new Date();
  const profile = new Profile({
    name: 'Test',
    title: 'Dev',
    greeting: 'Hi',
    description: 'A developer',
    aboutParagraphs: ['Hello'],
    photoUrl: '',
    stats: [],
    heroPrimaryCta: { label: 'CTA', href: '#' },
    heroSecondaryCta: { label: 'CTA2', href: '#' },
    resume: { summaryParagraphs: [], pdfUrl: '', linkedinUrl: '', docUrl: '' },
  });
  const skills = [new SkillCategory('Lang', [new Skill({ name: 'TS', level: 90 })])];
  const projects = [
    new Project(
      { title: 'Proj', description: 'Desc', tags: ['ts'], imageUrl: null, liveUrl: 'https://example.com' },
      'p1'
    ),
  ];
  const contact = new ContactInfo(
    'a@b.com',
    'NYC',
    '',
    [new SocialLink('github', 'https://github.com', 'GH')]
  );

  const portfolio = new Portfolio(
    { version: 'test', createdAt: now, updatedAt: now },
    'test-id',
    profile,
    skills,
    projects,
    contact
  );

  it('exposes version, createdAt, updatedAt', () => {
    expect(portfolio.version).toBe('test');
    expect(portfolio.createdAt).toBe(now);
    expect(portfolio.updatedAt).toBe(now);
  });

  it('returns defensive copies of arrays', () => {
    const s1 = portfolio.skillCategories;
    const s2 = portfolio.skillCategories;
    expect(s1).toEqual(s2);
    expect(s1).not.toBe(s2);

    const p1 = portfolio.projects;
    const p2 = portfolio.projects;
    expect(p1).toEqual(p2);
    expect(p1).not.toBe(p2);
  });
});
