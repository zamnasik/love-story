import { motion } from 'framer-motion';

interface Props {
  text: string;
  className?: string;
  /** Seconds between words. */
  stagger?: number;
}

/** Handwritten-style text that appears word by word with a soft golden glow. */
export function HandwrittenReveal({
  text,
  className = 'font-script text-3xl leading-snug text-gold script-glow sm:text-5xl',
  stagger = 0.28,
}: Props) {
  const words = text.split(' ');
  return (
    <p className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <motion.span
            key={`${w}-${i}`}
            className="inline-block whitespace-pre"
            initial={{ opacity: 0, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '0px 0px -12% 0px' }}
            transition={{ duration: 1.1, delay: i * stagger, ease: 'easeOut' }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        ))}
      </span>
    </p>
  );
}
