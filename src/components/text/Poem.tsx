import { motion } from 'framer-motion';

interface Props {
  lines: readonly string[];
  className?: string;
  align?: 'center' | 'left';
}

/** A short verse, shown with a tiny golden flower above it. */
export function Poem({ lines, className = '', align = 'center' }: Props) {
  return (
    <figure
      className={`${align === 'center' ? 'mx-auto text-center' : 'text-left'} max-w-xl ${className}`}
      aria-label="A few poetic words"
    >
      <motion.svg
        viewBox="0 0 120 24"
        className={`mb-5 h-5 w-28 ${align === 'center' ? 'mx-auto' : ''}`}
        aria-hidden="true"
        initial={{ opacity: 0, scaleX: 0.4 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 1.2 }}
      >
        <line x1="0" y1="12" x2="48" y2="12" stroke="#E9C77B" strokeOpacity="0.7" />
        <line x1="72" y1="12" x2="120" y2="12" stroke="#E9C77B" strokeOpacity="0.7" />
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={a} cx="60" cy="6" rx="3" ry="5" fill="#F4B9C8" transform={`rotate(${a} 60 12)`} />
        ))}
        <circle cx="60" cy="12" r="2" fill="#E9C77B" />
      </motion.svg>
      <blockquote className="space-y-1.5 font-serif text-xl italic leading-relaxed text-blush/95 sm:text-2xl">
        {lines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 1.3, delay: i * 0.5, ease: 'easeOut' }}
          >
            {line}
          </motion.p>
        ))}
      </blockquote>
    </figure>
  );
}
