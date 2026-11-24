/**
 * Identity and contact details. Every component reads from here;
 * nothing personal is hard-coded anywhere else.
 *
 * Public contact details are limited to email + city (spec §1, §9).
 */
export const site = {
  name: 'Ethan Matlack',
  headline: 'Robotics engineer & master electrician',
  subhead: 'Industrial controls, electrical systems, and the software that ties them together.',
  location: 'Chattanooga, TN', // TODO (Ethan): confirm city wording
  email: 'TODO@ethanmatlack.com', // TODO (Ethan): real address
  socials: {
    linkedin: 'https://www.linkedin.com/in/TODO', // TODO (Ethan)
    github: 'https://github.com/TODO', // TODO (Ethan)
  },
  url: 'https://ethanmatlack.com',
} as const;

export type Site = typeof site;
