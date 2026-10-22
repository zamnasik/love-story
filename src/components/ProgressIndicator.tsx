import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { SCENES } from '../content/story';
import { scrollToId } from '../lib/scroll';

/** A thin progress line along the top, plus small dots on the side that jump between scenes. */
export function ProgressIndicator() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });
  const [active, setActive] = useState<string>(SCENES[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    SCENES.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const current = SCENES.find((s) => s.id === active);

  return (
    <>
      <motion.div
        className="fixed inset-x-0 top-0 z-40 h-[3px] origin-left bg-gradient-to-r from-rose via-gold to-rose"
        style={{ scaleX }}
        aria-hidden="true"
      />
      <nav aria-label="Story scenes" className="fixed right-1.5 top-1/2 z-40 -translate-y-1/2 sm:right-4">
        <ol className="flex flex-col items-center">
          {SCENES.map((s, i) => {
            const on = s.id === active;
            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => scrollToId(s.id)}
                  aria-label={`Scene ${i + 1} of ${SCENES.length}: ${s.label}`}
                  aria-current={on ? 'step' : undefined}
                  title={s.label}
                  className="group flex h-[22px] w-6 items-center justify-center"
                >
                  <span
                    className={`block rounded-full transition-all duration-500 ${
                      on ? 'h-2.5 w-2.5 bg-gold shadow-glow' : 'h-1.5 w-1.5 bg-ivory/35 group-hover:bg-ivory/80'
                    }`}
                  />
                </button>
              </li>
            );
          })}
        </ol>
      </nav>
      {current && (
        <p
          className="pointer-events-none fixed bottom-3 left-4 z-40 hidden max-w-[40vw] truncate text-[0.7rem] uppercase tracking-[0.3em] text-ivory/45 md:block"
          aria-hidden="true"
        >
          {current.label}
        </p>
      )}
    </>
  );
}
