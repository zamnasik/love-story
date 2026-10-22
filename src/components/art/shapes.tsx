import { useId, type CSSProperties } from 'react';

/** One five-petal blossom, drawn as an SVG group so it can be placed inside any <svg>. */
export function BlossomShape({
  x,
  y,
  s = 1,
  rot = 0,
  tone = '#F4B9C8',
  center = '#E9C77B',
}: {
  x: number;
  y: number;
  s?: number;
  rot?: number;
  tone?: string;
  center?: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx="0" cy="-12" rx="8.5" ry="13.5" fill={tone} opacity="0.94" transform={`rotate(${a})`} />
      ))}
      <circle r="4.2" fill={center} />
    </g>
  );
}

/** A small leaf. */
export function LeafShape({
  x,
  y,
  s = 1,
  rot = 0,
  fill = '#7E9A76',
}: {
  x: number;
  y: number;
  s?: number;
  rot?: number;
  fill?: string;
}) {
  return (
    <path
      d="M0 0 C 8 -10, 22 -10, 34 0 C 22 10, 8 10, 0 0 Z"
      fill={fill}
      transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}
    />
  );
}

/** Glowing crescent moon. Size it with Tailwind width classes on `className`. */
export function Moon({ className = '', style }: { className?: string; style?: CSSProperties }) {
  const raw = useId();
  const id = raw.replace(/[^a-zA-Z0-9]/g, '');
  return (
    <svg
      viewBox="0 0 200 200"
      className={`moon-glow ${className}`}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id={`mg${id}`} cx="35%" cy="35%" r="80%">
          <stop offset="0" stopColor="#FFF4CC" />
          <stop offset="0.55" stopColor="#F2D68F" />
          <stop offset="1" stopColor="#E9C77B" />
        </radialGradient>
        <mask id={`mm${id}`}>
          <rect width="200" height="200" fill="#fff" />
          <circle cx="128" cy="86" r="62" fill="#000" />
        </mask>
      </defs>
      <circle cx="96" cy="104" r="72" fill={`url(#mg${id})`} mask={`url(#mm${id})`} />
    </svg>
  );
}

/** A blossoming branch used as framing in the corners of a scene. */
export function BlossomBranch({ className = '', flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M-10 20 C 80 30, 140 60, 190 110 S 300 190, 390 200"
        fill="none"
        stroke="#4a3a45"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path d="M120 52 C 150 20, 190 10, 230 14" fill="none" stroke="#4a3a45" strokeWidth="4" strokeLinecap="round" />
      <path d="M200 120 C 220 160, 240 200, 236 250" fill="none" stroke="#4a3a45" strokeWidth="4" strokeLinecap="round" />
      <LeafShape x={70} y={40} s={0.9} rot={-30} />
      <LeafShape x={160} y={85} s={0.9} rot={40} />
      <LeafShape x={250} y={150} s={0.8} rot={-20} />
      <LeafShape x={225} y={20} s={0.7} rot={-10} />
      <BlossomShape x={60} y={52} s={1.1} rot={10} />
      <BlossomShape x={120} y={70} s={1.3} rot={30} tone="#FBE3E8" />
      <BlossomShape x={190} y={20} s={1} rot={60} />
      <BlossomShape x={232} y={14} s={0.9} rot={5} tone="#FBE3E8" />
      <BlossomShape x={200} y={118} s={1.4} rot={20} />
      <BlossomShape x={246} y={176} s={1} rot={45} tone="#FBE3E8" />
      <BlossomShape x={238} y={252} s={1.1} rot={0} />
      <BlossomShape x={330} y={190} s={1.1} rot={15} />
      <circle cx="100" cy="30" r="3" fill="#F4B9C8" />
      <circle cx="150" cy="110" r="3" fill="#FBE3E8" />
      <circle cx="285" cy="205" r="3" fill="#F4B9C8" />
    </svg>
  );
}

/** A single flower on a stem, for foreground gardens. */
export function StemFlower({
  x,
  base,
  h,
  s = 1,
  tone = '#F4B9C8',
  sway = 0,
}: {
  x: number;
  base: number;
  h: number;
  s?: number;
  tone?: string;
  sway?: number;
}) {
  return (
    <g>
      <path
        d={`M${x} ${base} C ${x + sway} ${base - h * 0.4}, ${x - sway} ${base - h * 0.75}, ${x + sway * 0.4} ${base - h}`}
        stroke="#5f7d57"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <LeafShape x={x} y={base - h * 0.3} s={0.9} rot={-35} fill="#6f8f66" />
      <LeafShape x={x} y={base - h * 0.5} s={0.8} rot={-145} fill="#6f8f66" />
      <BlossomShape x={x + sway * 0.4} y={base - h} s={s} tone={tone} rot={x % 70} />
    </g>
  );
}

/** A round-canopy tree silhouette. */
export function RoundTree({
  x,
  base,
  h,
  canopy,
  trunk = '#3b2d33',
}: {
  x: number;
  base: number;
  h: number;
  canopy: string;
  trunk?: string;
}) {
  const r = h * 0.38;
  return (
    <g>
      <rect x={x - h * 0.03} y={base - h * 0.45} width={h * 0.06} height={h * 0.45} fill={trunk} />
      <circle cx={x} cy={base - h * 0.62} r={r} fill={canopy} />
      <circle cx={x - r * 0.65} cy={base - h * 0.48} r={r * 0.65} fill={canopy} />
      <circle cx={x + r * 0.65} cy={base - h * 0.5} r={r * 0.62} fill={canopy} />
    </g>
  );
}

/** A palm-like tree, common in Sri Lankan village scenery. */
export function PalmTree({ x, base, h, color = '#2f4a3d' }: { x: number; base: number; h: number; color?: string }) {
  const top = base - h;
  return (
    <g>
      <path
        d={`M${x} ${base} C ${x + h * 0.08} ${base - h * 0.4}, ${x - h * 0.05} ${base - h * 0.7}, ${x + h * 0.03} ${top}`}
        stroke="#4a3a35"
        strokeWidth={Math.max(3, h * 0.035)}
        fill="none"
        strokeLinecap="round"
      />
      {[-70, -40, -12, 14, 42, 72].map((a) => (
        <path
          key={a}
          d={`M${x + h * 0.03} ${top} q ${Math.sin((a * Math.PI) / 180) * h * 0.32} ${-h * 0.12} ${Math.sin((a * Math.PI) / 180) * h * 0.42} ${h * 0.14}`}
          stroke={color}
          strokeWidth={Math.max(3, h * 0.03)}
          fill="none"
          strokeLinecap="round"
        />
      ))}
    </g>
  );
}

/** A little house with a glowing window. */
export function House({
  x,
  base,
  w,
  wall,
  roof,
  lit = true,
}: {
  x: number;
  base: number;
  w: number;
  wall: string;
  roof: string;
  lit?: boolean;
}) {
  const h = w * 0.55;
  return (
    <g>
      <rect x={x} y={base - h} width={w} height={h} fill={wall} />
      <polygon points={`${x - w * 0.08},${base - h} ${x + w * 0.5},${base - h - w * 0.3} ${x + w * 1.08},${base - h}`} fill={roof} />
      <rect x={x + w * 0.2} y={base - h * 0.72} width={w * 0.18} height={h * 0.34} fill={lit ? '#FFD98A' : '#2a2a3a'} className={lit ? 'window-flicker' : undefined} />
      <rect x={x + w * 0.62} y={base - h * 0.55} width={w * 0.18} height={h * 0.55} fill="#3a2a2a" />
    </g>
  );
}
