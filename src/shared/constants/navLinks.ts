export interface NavLink {
  href: string;
  label: string;
}

export const NAV_LINKS: NavLink[] = [
  { href: '#about',    label: 'About'    },
  { href: '#skills',   label: 'Skills'   },
  { href: '#projects', label: 'Projects' },
  { href: '#resume',   label: 'Resume'   },
  { href: '#contact',  label: 'Contact'  },
];
