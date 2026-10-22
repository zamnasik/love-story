import { motion } from 'framer-motion';

/** Five pillars rise one after another: Faith, Trust, Respect, Patience, Love. */
export function Pillars({ labels }: { labels: readonly string[] }) {
  const heights = [58, 68, 78, 88, 100];
  return (
    <div className="mx-auto max-w-xl" role="img" aria-label={`The five pillars: ${labels.join(', ')}`}>
      <div className="flex h-56 items-end justify-center gap-3 sm:h-72 sm:gap-5">
        {labels.map((label, i) => (
          <div key={label} className="flex h-full flex-1 flex-col items-center justify-end" aria-hidden="true">
            <motion.div
              className="relative w-full max-w-[3.4rem] origin-bottom rounded-t-lg bg-gradient-to-b from-ivory via-blush to-gold/80 shadow-glow"
              style={{ height: `${heights[i % heights.length]}%` }}
              initial={{ scaleY: 0, opacity: 0.4 }}
              whileInView={{ scaleY: 1, opacity: 1 }}
              viewport={{ once: true, margin: '0px 0px -12% 0px' }}
              transition={{ duration: 1.5, delay: i * 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="absolute -top-1.5 left-1/2 h-2.5 w-[120%] -translate-x-1/2 rounded-sm bg-ivory" />
              <span className="absolute inset-x-2 bottom-0 top-3 flex justify-between opacity-30">
                <i className="w-px bg-midnight" />
                <i className="w-px bg-midnight" />
                <i className="w-px bg-midnight" />
              </span>
            </motion.div>
            <motion.span
              className="mt-3 font-serif text-sm text-ivory sm:text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '0px 0px -12% 0px' }}
              transition={{ duration: 1, delay: 0.8 + i * 0.35 }}
            >
              {label}
            </motion.span>
          </div>
        ))}
      </div>
      <div className="h-2 w-full rounded-full bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
    </div>
  );
}
