import { useRef, useState, type ReactNode } from 'react';
import { useInView, useScroll, type MotionValue } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { assetUrl, customBackgrounds } from '../content/assets';
import type { SceneId } from '../content/story';
import { scrollToId } from '../lib/scroll';

interface Props {
  id: SceneId;
  /** Draws the illustrated background. Receives scroll progress (0 → 1) for parallax. */
  backdrop: (progress: MotionValue<number>) => ReactNode;
  /** Ambient effects (petals, stars, dust...). Only mounted while the scene is on screen. */
  effects?: ReactNode;
  /** Scene to scroll to when "continue" is pressed. */
  nextId?: SceneId;
  /** 0-1: how much the background is darkened for text contrast. */
  shade?: number;
  children: ReactNode;
  className?: string;
}

function CustomBackground({ src }: { src: string }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <img
      src={assetUrl(src)}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      onLoad={() => setLoaded(true)}
      onError={() => setFailed(true)}
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1600ms] ${loaded ? 'opacity-100' : 'opacity-0'}`}
    />
  );
}

/**
 * One scene of the story. The illustrated background stays pinned to the screen while the
 * text scrolls over it, and dissolves into deep midnight blue at the top and bottom so that
 * each scene begins and ends with a quiet pause.
 */
export function StoryScene({ id, backdrop, effects, nextId, shade = 0.22, children, className = '' }: Props) {
  const ref = useRef<HTMLElement>(null);
  const active = useInView(ref, { margin: '25% 0px 25% 0px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const custom = customBackgrounds[id];

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={`${id}-title`}
      className="relative isolate min-h-[100svh] w-full overflow-clip bg-midnight"
    >
      {/* pinned illustrated background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-clip" aria-hidden="true">
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
          <div className={`absolute inset-0 ${active ? 'kenburns' : ''}`}>
            {backdrop(scrollYProgress)}
            {custom && <CustomBackground src={custom} />}
          </div>
          {active && effects}
          <div className="absolute inset-0" style={{ background: `rgba(16, 21, 47, ${shade})` }} />
        </div>
      </div>

      {/* soft dissolve into midnight at both ends */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[18vh] bg-gradient-to-b from-midnight to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[18vh] bg-gradient-to-t from-midnight to-transparent" />

      <div className={`relative z-10 mx-auto flex w-full max-w-3xl flex-col px-8 py-[16vh] sm:px-8 ${className}`}>
        {children}
        {nextId && (
          <div className="mt-16 flex justify-center">
            <button
              type="button"
              onClick={() => scrollToId(nextId)}
              className="bob group flex flex-col items-center gap-1 rounded-full px-4 py-2 text-xs uppercase tracking-[0.28em] text-ivory/70 transition hover:text-gold"
            >
              <span>Continue</span>
              <ChevronDown className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/** A soft glass panel that keeps text readable over bright illustrations. */
export function Panel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-[2rem] border border-white/10 bg-midnight/70 p-6 shadow-soft sm:bg-midnight/55 sm:p-10 sm:backdrop-blur-md ${className}`}
    >
      {children}
    </div>
  );
}
