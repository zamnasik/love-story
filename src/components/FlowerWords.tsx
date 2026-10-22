import { motion } from 'framer-motion';
import { BlossomShape } from './art/shapes';

const SPOTS = [
  { left: '50%', top: '2%' },
  { left: '93%', top: '34%' },
  { left: '80%', top: '90%' },
  { left: '20%', top: '90%' },
  { left: '7%', top: '34%' },
];

/** A softly glowing flower with the words I had heard about her appearing around it. */
export function FlowerWords({ words, caption }: { words: readonly string[]; caption: string }) {
  return (
    <figure className="mx-auto w-full max-w-sm">
      <div className="relative mx-auto aspect-square w-full" role="img" aria-label={`${words.join(', ')}. ${caption}`}>
        <div className="absolute inset-[18%] rounded-full bg-rose/30 blur-3xl" />
        <motion.svg
          viewBox="-100 -100 200 200"
          className="absolute inset-[22%] h-[56%] w-[56%] overflow-visible drop-shadow-[0_0_24px_rgba(244,185,200,0.8)]"
          initial={{ scale: 0.6, opacity: 0, rotate: -20 }}
          whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 2.2, ease: 'easeOut' }}
          aria-hidden="true"
        >
          <BlossomShape x={0} y={0} s={3.1} />
          <BlossomShape x={0} y={0} s={2} rot={36} tone="#FBE3E8" />
        </motion.svg>
        {words.slice(0, SPOTS.length).map((w, i) => (
          <motion.span
            key={w}
            aria-hidden="true"
            className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-serif text-lg italic text-blush text-soft-shadow sm:text-xl"
            style={SPOTS[i]}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 1.4, delay: 1.2 + i * 0.9 }}
          >
            {w}
          </motion.span>
        ))}
      </div>
      <figcaption className="mt-3 text-center text-sm text-ivory/75">{caption}</figcaption>
    </figure>
  );
}
