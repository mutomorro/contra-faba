/**
 * Single source of truth for site-wide data.
 *
 * The previous build duplicated the address and phone numbers across Header,
 * Footer and the contact page, so they could drift apart. Everything lives here.
 *
 * NOTE: no email address is published. The previous Next.js build showed
 * `hello@contrafaba.com`, which does not appear anywhere on the live WordPress
 * site and could not be verified — publishing a dead contact route is worse than
 * publishing none. Enquiries go through the contact form and the phone numbers.
 */

export const site = {
  name: 'Contra Faba',
  legalName: 'Contra Faba Ltd',
  url: 'https://contrafaba.com',
  tagline: 'Cost consultants for the construction industry',
  description:
    'Cost consultants for the construction industry. Working across London, the South East and Scotland for architects, contractors and home owners.',
  companyNumber: '12848166',
  companyJurisdiction: 'England & Wales',
} as const

export const address = {
  street: '27 Old Gloucester Street',
  locality: 'London',
  postalCode: 'WC1N 3AX',
  country: 'GB',
} as const

export const offices = [
  {
    city: 'London',
    /** Display form, as shown on the WordPress site. */
    phone: '020 4614 1084',
    /** E.164 for the tel: link, so it dials correctly from mobile. */
    phoneHref: '+442046141084',
    note: '27 Old Gloucester Street, London WC1N 3AX',
  },
  {
    city: 'Glasgow',
    phone: '0141 461 9997',
    phoneHref: '+441414619997',
    note: 'Serving Scotland including the Highlands',
  },
] as const

export const nav = [
  { href: '/about/', label: 'About' },
  { href: '/services/', label: 'Services' },
  { href: '/our-work/', label: 'Our Work' },
  { href: '/contact/', label: 'Contact' },
] as const

/** Human labels for the project status values used in the projects collection. */
export const statusLabels = {
  'pre-construction': 'Pre-construction',
  'in-progress': 'In Progress',
  completed: 'Completed',
} as const

/**
 * Section headings on /our-work/, matching the WordPress groupings and their
 * intro copy. Order here is the order they render.
 */
export const projectGroups = [
  {
    status: 'pre-construction',
    heading: 'Pre-Construction Projects',
    intro:
      'A selection of projects we are working on that are currently in the pre-construction stage.',
  },
  {
    status: 'in-progress',
    heading: 'In Progress Projects',
    intro: 'A selection of projects we are working on that are currently in progress.',
  },
  {
    status: 'completed',
    heading: 'Recently Completed Projects',
    intro: 'A selection of projects we have recently completed.',
  },
] as const
