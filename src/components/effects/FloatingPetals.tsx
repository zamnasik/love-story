import { useMemo, type CSSProperties } from 'react';
import { isSmallScreen, mulberry32 } from '../../lib/random';

interface Props {
  /** Number of petals on a desktop screen (fewer are used on phones). */
  count?: number;
  /** 1 = normal speed, bigger = slower. */
  slow?: number;
  /** "fall" drifts down from the top, "cross" glides sideways across the screen. */
  direction?: 'fall' | 'cross';
  /** true = petals are already spread across the screen; false = they start from the top. */
  spread?: boolean;
  seed?: number;
}

export function FloatingPetals({ count = 14, slow = 1, direction = 'fall', spread = true, seed = 3 }: Props) {
  const petals = useMemo(() => {
    const n = isSmallScreen() ? Math.max(3, Math.ceil(count * 0.6)) : count;
    const rand = mulberry32(seed);
    return Array.from({ length: n }, (_, i) => {
      const d = (direction === 'fall' ? 16 + rand() * 12 : 26 + rand() * 12) * slow;
      return {
        i,
        x: rand() * 100,
        y: 8 + rand() * 70,
        s: 9 + rand() * 11,
        d,
        delay: spread ? -rand() * d : rand() * 8 * slow,
        sway: rand() * 100 - 50,
      };
    });
  }, [count, slow, direction, spread, seed]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {petals.map((p) => (
        <span
          key={p.i}
          className={`petal ${direction === 'cross' ? 'cross' : ''}`}
          style={
            {
              '--x': `${p.x}%`,
              '--y': `${p.y}%`,
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
