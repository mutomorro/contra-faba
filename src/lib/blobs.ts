/**
 * Organic blob shapes for the Contra Faba brand.
 *
 * Hand-crafted cubic bezier paths producing natural, bean-like forms matching
 * the business card aesthetic. Lives in a .ts module rather than in the .astro
 * component so the `BlobName` type can be imported by other components.
 */
export const blobPaths = {
  orange1: {
    viewBox: '0 0 500 500',
    d: 'M425,250Q400,350,310,400Q220,450,140,390Q60,330,70,240Q80,150,160,90Q240,30,330,75Q420,120,435,185Z',
  },
  orange2: {
    viewBox: '0 0 500 500',
    d: 'M410,280Q380,370,290,420Q200,470,120,400Q40,330,60,230Q80,130,170,80Q260,30,350,90Q440,150,430,215Z',
  },
  teal: {
    viewBox: '0 0 500 500',
    d: 'M390,270Q350,370,250,410Q150,450,90,360Q30,270,80,180Q130,90,230,60Q330,30,380,130Q430,230,410,250Z',
  },
  mustard: {
    viewBox: '0 0 500 500',
    d: 'M420,260Q390,360,300,410Q210,460,130,390Q50,320,70,220Q90,120,180,70Q270,20,360,80Q450,140,440,200Z',
  },
  bean: {
    viewBox: '0 0 500 500',
    d: 'M380,290Q340,390,240,420Q140,450,80,350Q20,250,80,160Q140,70,250,50Q360,30,400,140Q440,250,400,270Z',
  },
  /** Matches the mark in the logo; also used for the favicon. */
  mark: {
    viewBox: '0 0 100 120',
    d: 'M50,5 C75,5 90,25 90,55 C90,85 75,115 50,115 C25,115 10,90 10,65 C10,35 25,5 50,5Z',
  },
} as const

export type BlobName = keyof typeof blobPaths
