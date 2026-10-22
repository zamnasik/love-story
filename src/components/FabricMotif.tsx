import { useId } from 'react';
import { motion } from 'framer-motion';

/**
 * Two illustrated pieces of fabric: a green salwar and a brown shawl.
 * They are decorative motifs only. They are NOT a portrait and do not depict her.
 */
export function FabricMotif() {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  return (
    <motion.figure
      className="mx-auto w-full max-w-xs rounded-[2rem] border border-white/10 bg-midnight/60 p-6 shadow-soft sm:backdrop-blur-md"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1.4 }}
      role="img"
      aria-label="An illustration of green fabric and a brown shawl"
    >
      <svg viewBox="0 0 320 250" className="bob w-full" aria-hidden="true">
        <defs>
          <linearGradient id={`${uid}g`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#8DBB86" />
            <stop offset="1" stopColor="#3B7650" />
          </linearGradient>
          <linearGradient id={`${uid}b`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#B08462" />
            <stop offset="1" stopColor="#5E3F2E" />
          </linearGradient>
        </defs>
        {/* green fabric, softly draped with a wavy hem */}
        <path
          d="M52 34 C 110 18, 200 18, 262 34 L 276 196 C 240 214, 206 190, 164 210 C 124 230, 84 204, 40 216 Z"
          fill={`url(#${uid}g)`}
        />
        <g fill="none" stroke="#CFEAC6" strokeOpacity="0.4" strokeWidth="2.2" strokeLinecap="round">
          <path d="M96 40 C 90 100, 104 150, 92 208" />
          <path d="M148 34 C 156 96, 140 150, 152 214" />
          <path d="M204 34 C 196 96, 212 150, 200 202" />
          <path d="M248 38 C 252 96, 240 150, 252 200" />
        </g>
        {/* brown shawl, laid diagonally across with a fringe */}
        <path
          d="M14 84 C 96 74, 190 112, 304 146 L 292 192 C 190 164, 92 130, 8 128 Z"
          fill={`url(#${uid}b)`}
          opacity="0.97"
        />
        <g fill="none" stroke="#F0D2B2" strokeOpacity="0.38" strokeWidth="2" strokeLinecap="round">
          <path d="M40 98 C 120 96, 200 124, 286 156" />
          <path d="M30 114 C 110 112, 190 138, 278 172" />
        </g>
        <g stroke="#7a553f" strokeWidth="2.4" strokeLinecap="round">
          {Array.from({ length: 9 }, (_, i) => (
            <line key={i} x1={303 - i * 1.4} y1={148 + i * 5.2} x2={314 - i * 1.4} y2={150 + i * 5.2} />
          ))}
        </g>
      </svg>
    </motion.figure>
  );
}
