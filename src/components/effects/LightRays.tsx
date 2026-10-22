import type { CSSProperties } from 'react';

interface Props {
  /** Where the rays start, in percent of the screen. */
  originX?: number;
  originY?: number;
  /** Any CSS colour with some transparency works best, e.g. "rgba(255, 224, 160, 0.35)". */
  color?: string;
  count?: number;
  /** Total angle the rays fan out across, in degrees. */
  spread?: number;
}

export function LightRays({
  originX = 50,
  originY = 0,
  color = 'rgba(255, 226, 168, 0.28)',
  count = 6,
  spread = 70,
}: Props) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute" style={{ left: `${originX}%`, top: `${originY}%`, width: 0, height: 0 }}>
        {Array.from({ length: count }, (_, i) => {
          const base = count === 1 ? 0 : -spread / 2 + (spread / (count - 1)) * i;
          const w = 70 + ((i * 37) % 90);
          return (
            <div
              key={i}
              className="ray absolute left-0 top-0"
              style={
                {
                  width: w,
                  height: '130vh',
                  marginLeft: -w / 2,
                  background: `linear-gradient(to bottom, ${color}, transparent 78%)`,
                  filter: 'blur(10px)',
                  '--ox': '50%',
                  '--oy': '0%',
                  '--r0': `${base - 3}deg`,
                  '--r1': `${base + 3}deg`,
                  '--delay': `${-i * 1.7}s`,
                } as CSSProperties
              }
            />
          );
        })}
      </div>
    </div>
  );
}
