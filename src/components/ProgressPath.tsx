import { motion } from 'framer-motion';

/** Learning → Working → Growing → Building → Becoming, drawn as a glowing path. */
export function ProgressPath({ labels }: { labels: readonly string[] }) {
  return (
    <div className="mx-auto w-full max-w-2xl" role="img" aria-label={labels.join(', then ')}>
      <div className="relative px-[10%] pt-3">
        <div className="absolute left-[10%] right-[10%] top-[1.05rem] h-px bg-white/15" />
        <motion.div
          className="absolute left-[10%] right-[10%] top-[1.05rem] h-px origin-left shimmer-line"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '0px 0px -15% 0px' }}
          transition={{ duration: 3.2, ease: 'easeInOut' }}
        />
        <ol className="relative grid" style={{ gridTemplateColumns: `repeat(${labels.length}, minmax(0, 1fr))` }}>
          {labels.map((label, i) => (
            <li key={label} className="flex flex-col items-center">
              <motion.span
                className="relative z-10 h-4 w-4 rounded-full border-2 border-gold bg-midnight shadow-glow"
                initial={{ scale: 0.4, opacity: 0.2 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: '0px 0px -15% 0px' }}
                transition={{ duration: 0.8, delay: (i / (labels.length - 1)) * 2.6 }}
              />
              <motion.span
                className="mt-3 text-center font-serif text-sm text-ivory sm:text-lg"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -15% 0px' }}
                transition={{ duration: 0.9, delay: 0.2 + (i / (labels.length - 1)) * 2.6 }}
              >
                {label}
              </motion.span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
