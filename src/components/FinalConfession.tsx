import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { MoonlitLandscape } from './art/Backdrops';
import { Moon } from './art/shapes';
import { FloatingPetals } from './effects/FloatingPetals';
import { GlowParticles } from './effects/GlowParticles';
import { StarField } from './effects/StarField';
import { Poem } from './text/Poem';
import { StoryScene } from './StoryScene';
import { useMusic } from '../context/MusicContext';
import { confession } from '../content/story';

const LINES = confession.sequence;
const GAP = 1100; // quiet pause between lines (ms)
const LINE_STEPS = LINES.length * 2; // line, gap, line, gap ...
const STEP_LOVE = LINE_STEPS; // "Musliha, I love you."
const STEP_AFTER = STEP_LOVE + 1; // paragraph
const STEP_GENTLE = STEP_LOVE + 2; // "I don't expect you..."
const STEP_END = STEP_LOVE + 3; // poem + replay

/** How long each step stays before the next one (ms). */
function delayFor(step: number): number {
  if (step < LINE_STEPS) {
    if (step % 2 === 1) return GAP;
    return 2400 + LINES[step / 2].length * 46;
  }
  if (step === STEP_LOVE) return 4800;
  if (step === STEP_AFTER) return 7500;
  if (step === STEP_GENTLE) return 6000;
  return Number.POSITIVE_INFINITY;
}

/**
 * The final confession. Lines appear one at a time with quiet pauses, then
 * "Musliha, I love you." becomes the focus. Nothing is asked of her.
 */
export function FinalConfession() {
  const reduce = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const started = useInView(stageRef, { once: true, amount: 0.55 });
  const visible = useInView(stageRef, { amount: 0.25 });
  const { setSoft } = useMusic();
  const [step, setStep] = useState(0);

  // the music gets softer while this scene is on screen
  useEffect(() => {
    setSoft(visible);
    return () => setSoft(false);
  }, [visible, setSoft]);

  // advance through the sequence
  useEffect(() => {
    if (!started) return;
    if (reduce) {
      setStep(STEP_END);
      return;
    }
    const wait = delayFor(step);
    if (!Number.isFinite(wait)) return;
    const id = window.setTimeout(() => setStep((s) => s + 1), wait);
    return () => window.clearTimeout(id);
  }, [started, step, reduce]);

  const isLine = step < LINE_STEPS && step % 2 === 0 && started;
  const inLove = step >= STEP_LOVE;
  const slow = step >= 1 ? 1.7 : 1;

  return (
    <StoryScene
      id="confession"
      nextId="closing"
      shade={0.18}
      backdrop={(p) => <MoonlitLandscape progress={p} bloom />}
      effects={
        <>
          <Moon className="absolute left-1/2 top-[13%] w-16 -translate-x-1/2 sm:top-[6%] sm:w-24" />
          <StarField count={80} seed={63} maxY={62} slow={slow} />
          <FloatingPetals count={9} slow={slow * 1.2} seed={14} />
          <GlowParticles count={12} slow={slow} seed={44} />
        </>
      }
    >
      {/* the whole text is always available to screen readers */}
      <div className="sr-only">
        <h2 id="confession-title">{confession.eyebrow}</h2>
        {LINES.map((l) => (
          <p key={l}>{l}</p>
        ))}
        <p>{confession.love}</p>
        <p>{confession.after}</p>
        <p>{confession.gentle}</p>
        <p>{confession.poem.join(' ')}</p>
      </div>

      <div ref={stageRef} className="relative flex min-h-[100svh] flex-col items-center justify-center pb-16 pt-[20vh] text-center">
        {/* moonlight that gently expands behind "I love you" */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[38%] h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,233,168,0.5) 0%, rgba(233,199,123,0.18) 40%, transparent 70%)' }}
          initial={false}
          animate={{ scale: inLove ? 1.7 : 0.7, opacity: inLove ? 1 : 0.25 }}
          transition={{ duration: reduce ? 0 : 6, ease: 'easeOut' }}
        />
        <p className="mb-6 text-[0.7rem] font-medium uppercase tracking-[0.32em] text-gold sm:text-xs" aria-hidden="true">
          {confession.eyebrow}
        </p>

        {/* single lines, one at a time */}
        {!inLove && (
          <div className="relative flex min-h-[14rem] w-full max-w-xl items-center justify-center px-2 sm:min-h-[16rem]" aria-hidden="true">
            <AnimatePresence mode="wait">
              {isLine && (
                <motion.p
                  key={step}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 1.6, ease: 'easeInOut' }}
                  className={
                    step === 0
                      ? 'font-script text-6xl text-ivory script-glow sm:text-8xl'
                      : 'font-serif text-2xl leading-relaxed text-ivory text-soft-shadow sm:text-4xl'
                  }
                >
                  {LINES[step / 2]}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* the main sentence and what follows. Space is reserved so nothing jumps. */}
        {inLove && (
          <div className="relative flex w-full max-w-3xl flex-col items-center px-2" aria-hidden="true">
            <motion.p
              initial={{ opacity: 0, scale: 0.94, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: reduce ? 0 : 3.2, ease: 'easeOut' }}
              className="text-balance font-script text-[3.2rem] leading-[1.15] text-gold script-glow sm:text-7xl md:text-[5.5rem]"
            >
              {confession.love}
            </motion.p>

            <motion.p
              initial={false}
              animate={{ opacity: step >= STEP_AFTER ? 1 : 0, y: step >= STEP_AFTER ? 0 : 12 }}
              transition={{ duration: reduce ? 0 : 2.2 }}
              className="mt-10 max-w-xl font-serif text-lg leading-relaxed text-ivory text-soft-shadow sm:text-2xl"
            >
              {confession.after}
            </motion.p>

            <motion.p
              initial={false}
              animate={{ opacity: step >= STEP_GENTLE ? 1 : 0, y: step >= STEP_GENTLE ? 0 : 12 }}
              transition={{ duration: reduce ? 0 : 2.2 }}
              className="mt-8 max-w-xl font-serif text-lg italic leading-relaxed text-blush text-soft-shadow sm:text-2xl"
            >
              {confession.gentle}
            </motion.p>

            <motion.div
              initial={false}
              animate={{ opacity: step >= STEP_END ? 1 : 0 }}
              transition={{ duration: reduce ? 0 : 2.4 }}
              className="mt-12"
            >
              <Poem lines={confession.poem} />
            </motion.div>
          </div>
        )}

        {/* the visitor is never made to wait */}
        {started && step < STEP_END && (
          <button
            type="button"
            onClick={() => setStep(STEP_END)}
            className="mt-10 rounded-full px-4 py-2 text-xs uppercase tracking-[0.26em] text-ivory/50 transition hover:text-gold"
          >
            {confession.skip}
          </button>
        )}
        {step >= STEP_END && (
          <button
            type="button"
            onClick={() => setStep(0)}
            className="mt-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-[0.26em] text-ivory/50 transition hover:text-gold"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            {confession.replay}
          </button>
        )}
      </div>
    </StoryScene>
  );
}
