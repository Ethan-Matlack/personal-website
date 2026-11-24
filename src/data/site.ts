/**
 * Identity and contact details. Every component reads from here;
 * nothing personal is hard-coded anywhere else.
 *
 * Public contact details are limited to email + city (spec §1, §9).
 */
export const site = {
  name: 'Ethan Matlack',
  headline: 'Robotics engineer & master electrician',
  location: 'Chattanooga, TN',
  email: 'ethan@matlackfamily.net',
  socials: {
    linkedin: 'https://www.linkedin.com/in/ethan-matlack',
    github: 'https://github.com/Ethan-Matlack',
  },
  url: 'https://ethanmatlack.com',
} as const;

export type Site = typeof site;
