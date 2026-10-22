import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Props {
  /** The scene id; the section points to this heading with aria-labelledby. */
  sceneId: string;
  eyebrow: string;
  children: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export function SceneHeading({ sceneId, eyebrow, children, align = 'left', className = '' }: Props) {
  return (
    <header className={`${align === 'center' ? 'text-center' : ''} ${className}`}>
      <motion.p
        className="text-[0.7rem] font-medium uppercase tracking-[0.32em] text-gold sm:text-xs"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        id={`${sceneId}-title`}
        className="mt-4 font-serif text-[1.9rem] font-medium leading-[1.15] text-ivory text-soft-shadow sm:text-5xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.h2>
    </header>
  );
}
