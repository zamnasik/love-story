import { useMemo, type CSSProperties } from 'react';
import { isSmallScreen, mulberry32 } from '../../lib/random';

interface Props {
  count?: number;
  seed?: number;
  className?: string;
  /** Limit how far down the sky the stars go (percent of height). */
  maxY?: number;
  /** Warm gold twinkles (used as sparkles around the moon). */
  gold?: boolean;
  /** 1 = normal, bigger = slower twinkle. */
  slow?: number;
}

export function StarField({ count = 70, seed = 7, className = 'absolute inset-0', maxY = 75, gold = false, slow = 1 }: Props) {
  const stars = useMemo(() => {
    const n = isSmallScreen() ? Math.ceil(count * 0.65) : count;
    const rand = mulberry32(seed);
    return Array.from({ length: n }, (_, i) => ({
      i,
      x: rand() * 100,
      y: rand() * maxY,
      s: gold ? 2 + rand() * 3 : 1 + rand() * 1.9,
      d: (3 + rand() * 5) * slow,
      delay: -rand() * 8,
    }));
  }, [count, seed, maxY, gold, slow]);

  return (
    <div className={`pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
      {stars.map((s) => (
        <span
          key={s.i}
          className="star"
          style={
            {
              '--x': `${s.x}%`,
              '--y': `${s.y}%`,
              '--s': `${s.s}px`,
              '--d': `${s.d}s`,
              '--delay': `${s.delay}s`,
              ...(gold ? { background: '#FFE9A8', boxShadow: '0 0 8px rgba(233,199,123,0.95)' } : {}),
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
