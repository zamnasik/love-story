import { useMemo, type CSSProperties } from 'react';
import { isSmallScreen, mulberry32 } from '../../lib/random';

interface Props {
  count?: number;
  /** "gold" glowing dust floats upward; "snow" drifts gently down like sparkling snow. */
  variant?: 'gold' | 'snow';
  /** 1 = normal, bigger = slower. */
  slow?: number;
  seed?: number;
}

export function GlowParticles({ count = 16, variant = 'gold', slow = 1, seed = 19 }: Props) {
  const items = useMemo(() => {
    const n = isSmallScreen() ? Math.max(4, Math.ceil(count * 0.6)) : count;
    const rand = mulberry32(seed);
    return Array.from({ length: n }, (_, i) => {
      const d = (14 + rand() * 14) * slow;
      return {
        i,
        x: rand() * 100,
        s: 3 + rand() * 6,
        d,
        delay: -rand() * d,
        sway: rand() * 80 - 40,
      };
    });
  }, [count, slow, seed]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {items.map((p) => (
        <span
          key={p.i}
          className={`particle ${variant === 'snow' ? 'snow' : ''}`}
          style={
            {
              '--x': `${p.x}%`,
              '--s': `${p.s}px`,
              '--d': `${p.d}s`,
              '--delay': `${p.delay}s`,
              '--sway': `${p.sway}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
