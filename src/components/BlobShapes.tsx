/**
 * Organic SVG blob shapes for Contra Faba brand.
 *
 * Each blob uses hand-crafted cubic bezier paths to create natural,
 * bean-like organic forms that match the business card aesthetic.
 * Wrap in a container with overflow-hidden and use mix-blend-mode: multiply
 * on the peach background for the overlapping colour effect.
 */

export function BlobOrange1({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 500 500"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M425,250Q400,350,310,400Q220,450,140,390Q60,330,70,240Q80,150,160,90Q240,30,330,75Q420,120,435,185Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function BlobOrange2({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 500 500"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M410,280Q380,370,290,420Q200,470,120,400Q40,330,60,230Q80,130,170,80Q260,30,350,90Q440,150,430,215Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function BlobTeal({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 500 500"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M390,270Q350,370,250,410Q150,450,90,360Q30,270,80,180Q130,90,230,60Q330,30,380,130Q430,230,410,250Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function BlobMustard({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 500 500"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M420,260Q390,360,300,410Q210,460,130,390Q50,320,70,220Q90,120,180,70Q270,20,360,80Q450,140,440,200Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function BlobBean({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 500 500"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M380,290Q340,390,240,420Q140,450,80,350Q20,250,80,160Q140,70,250,50Q360,30,400,140Q440,250,400,270Z"
        fill="currentColor"
      />
    </svg>
  )
}

/**
 * Small decorative bean matching the logo mark shape.
 * Good for section accents and empty states.
 */
export function BlobLogoMark({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 120"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M50,5 C75,5 90,25 90,55 C90,85 75,115 50,115 C25,115 10,90 10,65 C10,35 25,5 50,5Z"
        fill="currentColor"
      />
    </svg>
  )
}
