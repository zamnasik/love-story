import { useCallback, useRef, useState } from 'react';
import { MotionConfig, motion, useReducedMotion } from 'framer-motion';
import { CinematicIntro } from './components/CinematicIntro';
import { ProgressIndicator } from './components/ProgressIndicator';
import { Toolbar } from './components/Toolbar';
import { FxProvider } from './context/FxContext';
import { MusicProvider, useMusic } from './context/MusicContext';
import { scrollToId } from './lib/scroll';
import { Story } from './Story';

function Experience() {
  const reduce = useReducedMotion();
  const { resumeIfWanted } = useMusic();
  const [runKey, setRunKey] = useState(0);
  const [veil, setVeil] = useState(false);
  const busy = useRef(false);

  /** Fades to midnight, jumps back to the opening, and fades back in. */
  const restart = useCallback(() => {
    if (busy.current) return;
    busy.current = true;
    const jump = () => {
      window.scrollTo({ top: 0, behavior: 'instant' });
      setRunKey((k) => k + 1);
    };
    if (reduce) {
      jump();
      busy.current = false;
      return;
    }
    setVeil(true);
    window.setTimeout(jump, 800);
    window.setTimeout(() => {
      setVeil(false);
      busy.current = false;
    }, 1100);
  }, [reduce]);

  const begin = useCallback(() => {
    resumeIfWanted();
    scrollToId('boy');
  }, [resumeIfWanted]);

  return (
    <>
      <a
        href="#boy"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[70] focus:rounded-full focus:bg-ivory focus:px-4 focus:py-2 focus:text-midnight"
      >
        Skip to the story
      </a>
      <Toolbar onRestart={restart} />
      <ProgressIndicator />
      <main key={runKey}>
        <CinematicIntro onBegin={begin} />
        <Story onRestart={restart} />
      </main>
      <motion.div
        className="pointer-events-none fixed inset-0 z-[60] bg-midnight"
        initial={false}
        animate={{ opacity: veil ? 1 : 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        aria-hidden="true"
      />
    </>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <FxProvider>
        <MusicProvider>
          <Experience />
        </MusicProvider>
      </FxProvider>
    </MotionConfig>
  );
}
