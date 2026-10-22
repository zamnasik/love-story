import { motion } from 'framer-motion';

interface Props {
  lines: readonly string[];
  className?: string;
  lineClassName?: string;
  /** Slower, softer reveal for the most emotional scenes. */
  slow?: boolean;
}

/** Shows a letter one line at a time, each line fading in as it is scrolled into view. */
export function LetterReveal({
  lines,
  className = 'space-y-5',
  lineClassName = 'text-base leading-relaxed text-ivory/90 sm:text-lg',
  slow = false,
}: Props) {
  return (
    <div className={className}>
      {lines.map((line, i) => (
        <motion.p
          key={i}
          className={lineClassName}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -14% 0px' }}
          transition={{ duration: slow ? 1.6 : 0.95, ease: [0.22, 1, 0.36, 1] }}
        >
          {line}
        </motion.p>
      ))}
    </div>
  );
}
