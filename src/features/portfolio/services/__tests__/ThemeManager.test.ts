import { describe, it, expect, beforeEach } from 'vitest';
import { ThemeManager } from '../ThemeManager';

describe('ThemeManager', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.className = '';
  });

  it('resolves season from URL param', () => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: new URL('http://localhost/?season=winter'),
    });
    const tm = new ThemeManager();
    expect(tm.getSeason()).toBe('winter');
  });

  it('ignores invalid URL season param', () => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: new URL('http://localhost/?season=invalid'),
    });
    const tm = new ThemeManager();
    // Should fall through to date-based season
    expect(['spring', 'summer', 'autumn', 'winter']).toContain(tm.getSeason());
  });

  it('resolves season from localStorage when no URL param', () => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: new URL('http://localhost/'),
    });
    localStorage.setItem('theme-season', 'autumn');
    const tm = new ThemeManager();
    expect(tm.getSeason()).toBe('autumn');
  });

  it('falls back to date-based season', () => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: new URL('http://localhost/'),
    });
    const tm = new ThemeManager();
    const month = new Date().getMonth() + 1;
    let expected: string;
    if (month >= 3 && month <= 5) expected = 'spring';
    else if (month >= 6 && month <= 8) expected = 'summer';
    else if (month >= 9 && month <= 11) expected = 'autumn';
    else expected = 'winter';
    expect(tm.getSeason()).toBe(expected);
  });

  it('resolves mode from localStorage', () => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: new URL('http://localhost/'),
    });
    localStorage.setItem('theme-mode', 'dark');
    const tm = new ThemeManager();
    expect(tm.getMode()).toBe('dark');
  });

  it('applies theme classes to DOM', () => {
    const tm = new ThemeManager('spring', 'dark');
    expect(document.body.classList.contains('theme-spring')).toBe(true);
    expect(document.body.classList.contains('dark-mode')).toBe(true);

    tm.setSeason('summer');
    expect(document.body.classList.contains('theme-summer')).toBe(true);
    expect(document.body.classList.contains('theme-spring')).toBe(false);
  });
});
