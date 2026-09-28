// The five Ps of sustainability, rendered by components/Principles.jsx.
export const principles = [
  {
    title: 'People',
    note: ['Community-centered', 'solutions'],
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="18" cy="18" r="7" /><circle cx="31" cy="17" r="6" />
        <path d="M7 38c1-9 7-13 14-13s13 4 14 13z" />
        <path d="M28 38c1-7 5-10 11-10 2 0 4 .4 6 1.4V38z" />
      </svg>
    ),
  },
  {
    title: 'Planet',
    note: ['Environmental', 'stewardship'],
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M39 9C22 11 12 19 10 34c9 1 18-2 24-10 4-5 5-10 5-15z" />
        <path className="stroke" d="M13 34c7-9 13-14 23-20" />
      </svg>
    ),
  },
  {
    title: 'Prosperity',
    note: ['Inclusive', 'development'],
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <rect x="8" y="26" width="7" height="12" /><rect x="20" y="19" width="7" height="19" /><rect x="32" y="11" width="7" height="27" />
        <path className="stroke" d="M8 19l10-7 8 3 13-9" />
      </svg>
    ),
  },
  {
    title: 'Partnerships',
    note: ['Collaboration', 'across sectors'],
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M5 20l9-8 8 5 4-3 7 4 10 2-6 13-9 4-8-7-5 1z" />
        <path className="stroke" d="M15 19l7 6 6-5 7 5" />
      </svg>
    ),
  },
  {
    title: 'Peace',
    note: ['More just and peaceful', 'societies'],
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M8 28c8-1 10-8 12-16 4 7 9 11 20 12-5 9-12 13-23 13-3 0-6-.3-9-1 5-2 8-4 10-7-4 1-7 1-10-1z" />
      </svg>
    ),
  },
];
