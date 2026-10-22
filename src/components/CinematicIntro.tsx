import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll } from 'framer-motion';
import { IntroLandscape } from './art/Backdrops';
import { Moon } from './art/shapes';
import { FloatingPetals } from './effects/FloatingPetals';
import { StarField } from './effects/StarField';
import { intro, SUBTITLE, TITLE } from '../content/story';

/** Times (ms) at which each step appears: greeting, name, "It's me", sentence, button. */
const TIMES = [1100, 3000, 5200, 7000, 9000];
const FINAL_STEP = TIMES.length;

export function CinematicIntro({ onBegin }: { onBegin: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [step, setStep] = useState(reduce ? FINAL_STEP : 0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  useEffect(() => {
    if (reduce) {
      setStep(FINAL_STEP);
      return;
    }
    const ids = TIMES.map((t, i) => window.setTimeout(() => setStep((s) => Math.max(s, i + 1)), t));
    return () => ids.forEach((id) => window.clearTimeout(id));
  }, [reduce]);

  const show = (n: number) => step >= n;
  const fade = (n: number) => ({
    initial: false as const,
    animate: { opacity: show(n) ? 1 : 0, y: show(n) ? 0 : 16 },
    transition: { duration: 1.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  });

  return (
    <section
      ref={ref}
      id="intro"
      aria-labelledby="intro-title"
      className="relative isolate flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-midnight"
    >
      <h1 id="intro-title" className="sr-only">
        {TITLE}. {SUBTITLE}
      </h1>

      {/* night sky */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <IntroLandscape progress={scrollYProgress} />
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.4 }}
        >
          <StarField count={60} maxY={62} />
        </motion.div>

        {/* crescent moon slowly lights up, with golden sparkles around it */}
        <motion.div
          className="absolute left-1/2 top-[7%] w-24 -translate-x-1/2 sm:left-auto sm:right-[16%] sm:w-36 sm:translate-x-0"
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 3.4, delay: 0.5, ease: 'easeOut' }}
        >
          <Moon className="w-full" />
          <StarField count={12} seed={31} gold className="absolute -inset-10" maxY={100} />
        </motion.div>

        {step >= 1 && <FloatingPetals count={14} slow={1.15} spread={false} seed={9} />}
      </div>

      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center px-9 pb-32 pt-28 text-center">
        <motion.p
          {...fade(1)}
          className="font-serif text-2xl font-medium italic tracking-wide text-blush text-soft-shadow sm:text-4xl"
        >
          {intro.greeting}
        </motion.p>

        <motion.p
          {...fade(2)}
          className="mt-3 font-script text-[5.2rem] leading-[1.05] text-ivory script-glow sm:text-[9rem]"
        >
          {intro.name}
        </motion.p>

        <motion.p {...fade(3)} className="mt-2 font-serif text-2xl text-ivory text-soft-shadow sm:text-3xl">
          {intro.me}
        </motion.p>

        <motion.p
          {...fade(4)}
          className="mt-5 max-w-md text-base font-light leading-relaxed text-ivory/85 text-soft-shadow sm:text-xl"
        >
          {intro.keeping}
        </motion.p>

        <motion.div
          initial={false}
          animate={{ opacity: show(5) ? 1 : 0, y: show(5) ? 0 : 14 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          className="mt-10"
          aria-hidden={!show(5)}
        >
          <button
            type="button"
            onClick={onBegin}
            tabIndex={show(5) ? 0 : -1}
            className="rounded-full bg-gradient-to-r from-rose to-gold px-8 py-4 font-medium text-midnight shadow-glow transition duration-500 hover:scale-[1.04] hover:shadow-[0_0_56px_rgba(244,185,200,0.6)] focus-visible:scale-[1.04] sm:px-10 sm:text-lg"
          >
            {intro.button}
          </button>
        </motion.div>
      </div>

      {/* skip: the visitor never has to wait */}
      {!show(5) && (
        <button
          type="button"
          onClick={() => setStep(FINAL_STEP)}
          className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 rounded-full px-4 py-2 text-xs uppercase tracking-[0.28em] text-ivory/55 transition hover:text-gold"
        >
          {intro.skip}
        </button>
      )}

      <motion.p
        initial={false}
        animate={{ opacity: show(5) ? 0.55 : 0 }}
        transition={{ duration: 2 }}
        className="pointer-events-none absolute bottom-6 left-1/2 z-10 w-[88%] max-w-md -translate-x-1/2 text-center text-[0.65rem] uppercase leading-relaxed tracking-[0.26em] text-ivory sm:text-xs"
        aria-hidden="true"
      >
        {TITLE}
      </motion.p>
    </section>
  );
}
